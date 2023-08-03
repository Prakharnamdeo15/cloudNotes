const jwt =require('jsonwebtoken');
const JWT_SECRET ='prakhar@15';
const User = require('../models/User')


fetchuser = async(req,res,next) => {
    const token = req.header('auth-token');
    if(!token){
       return res.status(401).send({error:"please authenticate a valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        // console.log(data.user) 
        // let user = await User.find({_id:objectId(data.user)});
        // console.log(User._id)
        // if (!user){
        //     return res.status(404).send({error:"something wrong happened"})
        // }
        next();
    } catch (error) {
    res.status(401).send({error:"please authenticate a valid token"})
    }
   
}

module.exports = fetchuser;