const express = require("express");
const router = express.Router();
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {authMiddleware} = require("../middleware");

const {User, Account} = require("../db");


const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
});

router.post('/signup', async (req, res) => {
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg: "Invalid Input"});
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.status(411).json({msg: "User already exists!!"});
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    })

    const userId = user._id;
    const account = await Account.create({
        userId: userId,
        balance: 10000,
    })

    const token = jwt.sign({userId}, JWT_SECRET);
    res.json({msg: "User created successfully!!", token: token});
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})

router.post('/signin', async (req, res) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg: "Invalid Input"});
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })

    if(user){
        const token = jwt.sign({userId: user._id}, JWT_SECRET);
        res.json({token: token});
        return;
    }

    res.status(411).json({msg: "Signin Unsuccessfull!! Check Credentials.."});
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

const updateBody = zod.object({
    email: zod.string().optional(),
    password: zod.string().optional(),

})

router.put("/updateuser", authMiddleware, async (req, res) => {
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg: "Password is too small!!"});
    }
    const {id, password} = req.body;
    try{
        const user = await User.findById({ _id: req.userId });
        if(!user)
            return res.status(404).json({msg: "User not found!!"});

        if(id){
            user.username = id;
        }
        if(password){
            user.password = password;
        }

        await user.save();
        res.json({msg : "Updated Successfully"});        
    } catch(e){
        console.error(e);
        res.status(500).json({msg: "Server Error"});
    }
    
});

module.exports = router;






