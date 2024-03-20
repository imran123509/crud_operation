const jwt=require('jsonwebtoken');

const JWT_SECRET="DGBDGDUJH";
const cookieOption={
    maxAge:15*24*60*60*1000,
    sameSite:"none",
    httpOnly: true,
    secure:true
}
const sendToken=async (res, user, code, message)=>{
      const token=jwt.sign({
         id:user._id
      }, JWT_SECRET);

     return res.status(code).cookie("some token", token, cookieOption).json({
          success: true
     })
}

module.exports=sendToken