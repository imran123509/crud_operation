const Payment=require('../models/payment');

const stripe=require('stripe')('sk_test_51OwdzoSCGUwdjzZOVNL7g1hDBdJMy3Nxi9xW2Ts3rhFd33QwHkJpmU9e5dmTHWIeqpWclCKjfN9KUxsU1Mh2xMSs00WFPIuXNC');

const payment=async(req,res)=>{
       const {amount, currency}=req.body;
       const paymentIntent=await Payment.create({
           amount,
           currency
       });

       res.json({clientSecret: paymentIntent.client_secret});

}

const webhooks=async(req, res)=>{
      const payload=req.body;
      const sig=req.headers['stripe-signature'];
      let event;

      try {
         event=stripe.webhooks.constructEvent(payload, sig, 'sk_test_51OwdzoSCGUwdjzZOVNL7g1hDBdJMy3Nxi9xW2Ts3rhFd33QwHkJpmU9e5dmTHWIeqpWclCKjfN9KUxsU1Mh2xMSs00WFPIuXNC')
      } catch (error) {
         console.error('webhooks_error:', error.message);
      }

      if(event.type==='payment_intent.succeeded'){
           const paymentIntent=event.data.object;
           await Payment.findOneAndUpdate({_id: paymentIntent.metadata.paymentId}, {status: 'succeeded'});

      }

      res.status(200).json({
          receved: true
      })

}



module.exports={
     payment,
     webhooks
}