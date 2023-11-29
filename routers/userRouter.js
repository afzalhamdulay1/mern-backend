const express = require('express');
const User = require('../models/userModel')
const { saveUser, getUser, updateUser } = require('../controllers/userController');
const router = express.Router();

router.post("/login",(req,resp) => {
    resp.send("My api login")
})

