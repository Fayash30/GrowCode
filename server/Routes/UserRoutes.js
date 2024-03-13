const User = require("../Models/UserModel");
const validator = require("validator");
const auth = require('../Middlewares/Auth');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
       
        const { name, user_name, email, password } = req.body;

        if (!name) {
            throw new Error("Enter your Name");
        }

        if (!user_name) {
            throw new Error("Enter your userName");
        }

        if (!email) {
            throw new Error("Mail is Required");
        }

        if (!password) {
            throw new Error("Enter the Password");
        }

        if (!validator.isEmail(email)) {
            throw new Error("Email is not valid");
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Your password is Weak");
        }

        const existingMail = await User.findOne({ email });
        const existingUser = await User.findOne({ user_name });

        if (existingMail) {
            throw new Error("Email already Exists!");
        }

        if (existingUser) {
            throw new Error("UserName already Exists!");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            user_name,
            email,
            password: hashedPassword
        });

        res.send({ status: 'ok', data: req.body, message:"Signup Succesful" });
    } catch (err) {
        res.json({ status: 'error', error: err.message });
    }
});


router.post('/login' , async (req , res)=>{
    const {email , password } = req.body;

    if(!validator.isEmail(email))
    {
        throw new Error("Enter a Valid Email");
    }
    const user = await User.findOne({email:email});
    
    if(!user)
    {
        return res.json({ status : 'error' ,user:false , message : 'Email does not exist'})
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
    
      const token = jwt.sign({
        userId: user._id
      }, 'privatesecret321',{ expiresIn: '1h' })

      return res.json({status : 'ok' , token: token});
    }
      else 
      {
        return res.json({ status:'error' , user:false , message:"Password is Wrong" })
      }  

})

router.put('/update', auth.verifyToken , async (req ,res) =>{
    try
    {
        const userId = req.userId;
        const updatedFields = req.body;
        
        const updatedUser = await User.findByIdAndUpdate(userId , updatedFields , {new : true});
        
        return res.status(200).json({message:"User Updated" , updatedUser});

    } catch(err)
    {
       return res.status(404).json({ error:err.message})
    }
})


router.delete('/delete', auth.verifyToken , async (req ,res) =>{
    try{
        const userId = req.userId;
        const deletedUser = await User.findByIdAndDelete(userId);

        return res.status(200).json({deletedUser,message:"User is Deleted"});
    } catch(err)
    {
        return res.status(404).json({error : err.message});
    }
})

module.exports = router;