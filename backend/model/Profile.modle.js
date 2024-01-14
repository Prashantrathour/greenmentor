const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  profileUrl: { type: String },
  name: { type: String },
  phoneNumber: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  address: { type: String },
},{timestamps:true});

const UserProfileModel= mongoose.model('UserProfile', userProfileSchema);
module.exports={UserProfileModel}
