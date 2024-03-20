const express=require('express');
const {createNewCity, UpdateCity, getallInfo, getOneInfo, DeleteDataById, deleteAll }= require('../controllers/city');
const { findOne } = require('../models/user');


const router=express.Router();

router.post('/createCity', createNewCity);
router.put('/updatecity', UpdateCity);
router.get("/getall", getallInfo);
router.get("/getone", getOneInfo);
router.delete("/delete", DeleteDataById);
router.delete("/deleteall", deleteAll)

module.exports=router