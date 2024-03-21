const express=require('express');
const DB=require('./db');
const userRouter=require('./routes/user')
const cityRouter=require('./routes/city');
const paymentRouter=require('./routes/index')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app=express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json());
app.use('/api/city', cityRouter);
app.use('/api/payment', paymentRouter)
app.use('/api', userRouter)
//DB();
app.listen(8080, ()=>{
  console.log(`sever is connected ${8080}`)
})