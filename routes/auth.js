const express = require('express');
const router = express();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser')

const JWT_SECRET ='prakhar@15';


// route 1 creating a user using post api

router.post('/createuser',[
    check('email').isEmail(),
    check('name').isLength({min:1}),
    check('password').isLength({min:1})
],(req,res)=>{
    let success = false;
    const result = validationResult(req);
    try{

    if(!result.isEmpty()){
        return res.status(400).json({result:result.array()})
    }

    const salt = bcrypt.genSaltSync(10);
    let securepassword = bcrypt.hashSync(req.body.password,salt) ;

    User.create({
        name:req.body.name,
        password:securepassword,
        email:req.body.email
    }).then(user => {
        const data = {
            user:{
                id : user.id
            }
        }
        success = true;

        const authToken = jwt.sign(data,JWT_SECRET);
        res.json({success, authToken})}).catch(
    err=>{console.log(err)
    res.send("plz enter unique value")})

    }

    catch(error){
        console.error(error);
        res.status(500).send("some error occured")
    }
})

// route 2 authenticating a user no login required "api/auth/login" 

router.post('/login',[
    check('email','Enter a valid email').isEmail(),
    check('password','password should not be empty').exists(),
],async (req,res)=>{

    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
           return res.status(400).json({error:'enter valid credentials'});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success,error:'enter valid credentials'});
        }

        const data = {user:{
            id : user.id
        }}
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success, authToken})
    }
    catch(error){
        console.error(error);
        res.status(500).send("internal server error");
    }

})

// route 3 get user details login required
router.post('/getuser',fetchuser,async (req,res) => {
try {
    userid = req.user.id;
    const user = await User.findById(userid).select('-password')
    res.send(user);
    
    
} catch (error) {
    console.error(error);
    res.status(500).send("internal server error");
}
})

module.exports = router