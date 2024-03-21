const mongoose=require('mongoose');

const paymentSchema=new mongoose.Schema({
      amount:{
        type: Number,
        required: true
      },
      currency:{
          type: String,
          required: true
      },
      status:{
          type:String
      }
});

const Payment=mongoose.model('Payment', paymentSchema);

module.exports= Payment;