const { mongoose } = require("mongoose");
const { UserProfileModel } = require("../model/Profile.modle");
const { UserModel } = require("../model/user.model");
const { ObjectId } = mongoose.Types;
const profileControllers = {
  getUserProfile: async (req, res) => {
    try {
      const userId = req.body.userId;

      const userProfile = await UserProfileModel.aggregate([
        {
          $match: {userId:new ObjectId(userId) },
        },
        {
          $lookup: {
            from: 'tasks', 
            localField: 'userId',
            foreignField: 'userId',
            as: 'tasks',
          },
        },
        
      ]);;
      if (!userProfile.length) {
        return res.status(404).json({ error: "User profile not found." });
      }

      res.json(userProfile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  editUserProfile: async (req, res) => {
    try {
      const { email, profileUrl, phoneNumber, gender, address } = req.body;
      const userId = req.body.userId;

      // Validate input
      if (!email) {
        return res.status(400).json({ error: "Email is a required field." });
      }

      let existingUserProfile;
      try {
        existingUserProfile = await UserProfileModel.findOne({ userId });
      } catch (mongooseError) {
        console.error(mongooseError);
        return res.status(500).json({ error: "Error fetching user profile." });
      }

      if (!existingUserProfile) {
        return res.status(404).json({ error: "User profile not found." });
      }

      try {
        // Update UserProfile
        const updatedUserProfile = await UserProfileModel.findOneAndUpdate(
          { userId },
          { email, profileUrl, phoneNumber, gender, address },
          { new: true, runValidators: true }
        );

        // Update User model (for login)
        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          { email },
          { new: true, runValidators: true }
        );
        const userProfile = await UserProfileModel.aggregate([
          {
            $match: {userId:new ObjectId(userId) },
          },
          {
            $lookup: {
              from: 'tasks', 
              localField: 'userId',
              foreignField: 'userId',
              as: 'tasks',
            },
          },
          
        ]);;
        res.json({
          message: "User profile updated successfully",
          userProfile
        });
      } catch (updateError) {
        if (updateError.name === 'ValidationError') {
          // Handle validation error
          return res.status(400).json({ error: updateError.message });
        } else {
          console.error(updateError);
          return res.status(500).json({ error: "Error updating user profile." });
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
 
};

module.exports = { profileControllers };
