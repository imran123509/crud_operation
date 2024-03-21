const express=require('express');
const { payment, webhooks } = require('../controllers/payment');

const router=express.Router();

router.post('/create-payment-intent', payment);
router.post('/webhook', webhooks)

module.exports=router