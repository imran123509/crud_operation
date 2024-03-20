const User=require('../models/user');
const sendToken=require("../token")
const bcrypt=require('bcrypt');
const createNewAccount=async(req, res)=>{
      const {name, username, password}=req.body;
   const user=await User.create({
        name,
        username,
        password
   });

   if(!user){
       return res.status(401).json({
          message: "something went wrong"
   })
}
   res.status(200).json({
      message: "user created successfully"
   })

}

const lonin=async(req, res)=>{
      const {username, password}=req.body;
      const user=await User.findOne({
           username,
           password
      })

      if(!user){
          return res.status(401).json({
            message: "username or password not valid"
          })
      }
      res.status(201).json({
         message: "user login successfully"
      })
}


module.exports={
     createNewAccount,
     lonin
}