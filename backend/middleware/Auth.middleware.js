const { error } = require("console")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.secret,(err,res)=>{
                if(err){
                    return false
                }else{
                   
                    return res
                }
            })
            if(decoded){
               
                req.body.userId =  decoded.userId ;
              
                next()
            }else{
                res.status(404).json({msg:"Not Authorized",login:false})
            }
        }catch(err){
            res.status(404).json({msg:"Something wrong Please Login Again",login:false})
        }
    }else{
        res.status(404).json({msg:"Please Login First!",login:false})
    }
}

module.exports={auth}