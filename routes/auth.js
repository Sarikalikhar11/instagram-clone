const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin');
const bcrypt = require('bcryptjs');

//JuFDogoPrLPnZUxAHdr1
// router.get('/', (req, res) => {
//     res.send("hello")
// })

router.post('/signup',(req,res)=>{
    const {name,email,password,pic} = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error:"Please add all the required fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"User already exists with that email"})
    }
    bcrypt.hash(password,12)
    .then((hashedPassword)=>{
        const user = new User({
        name,
        email,
        password:hashedPassword,
        pic:pic
    })
        user.save()
        .then(user => {res.json({message:"Registered successfully"})})
        .catch(err => {console.error(err)})
        })
    })
});

router.post('/login',(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(422).json({error:"Please provide email and password"});
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email"})
        }
        bcrypt.compare(password,savedUser.password)
        .then((doMatch)=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,pic,follower,following} = savedUser;
                return res.status(200).json({token,user:{_id,name,email,pic,follower,following}});
            }else{
                return res.status(422).json({error:"Invalid password"});
            }
        })
        .catch(err=>{console.log(err)})
    })
});

module.exports = router;