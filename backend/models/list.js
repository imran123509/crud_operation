const mongoose=require('mongoose');
const cityList=new mongoose.Schema({
      name:{
        type:String,
        required: true,
      },
      state:{
        type: String,
        required: true
      },
      national:{
          type: String
      }
}, {timestamps: true})

const City=mongoose.model('City', cityList);

module.exports=City