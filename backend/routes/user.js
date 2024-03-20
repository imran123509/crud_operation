const express=require('express');
const { createNewAccount, lonin } = require('../controllers/user');

const router=express.Router();

router.post('/signup', createNewAccount);
router.post('/login', lonin)

module.exports=router;