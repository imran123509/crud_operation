const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const JWT_SECRET="GJKDGFKDEFKS"
const userSignUpSchema=new mongoose.Schema({
      name:{
         type: String,
         required:true
      },
      username:{
          type:String, 
          required: true,
          unique: true
      },
      password:{
          type:String,
          required:true
      }
});

userSignUpSchema.pre('save', async function(next){
     // const user=this;
     // const SALT=bcrypt.genSalt(10)
      this.password=await bcrypt.hash(this.password, 10);
      //user.password=encryptedPassword;
      
    next();
})
userSignUpSchema.method.comparePassword=function compare(password){
      return bcrypt.compareSync(password, this.password);
}
userSignUpSchema.method.genJWT=function generate(){
      return jwt.sign({id:this._id, email: this.email}, JWT_SECRET,{
         expiresIn:'1h'
      })
}

const User=mongoose.model('User', userSignUpSchema);

module.exports=User;