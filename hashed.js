const bcrypt = require('bcrypt')
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECERT = "JOKER";
const z = require('zod')
mongoose.connect("")
app.use(express.json());

app.post('/signup', async function(req,res){
    const requireBody = z.object({
        email:z.string().min(3).max(13).email(),
        password:z.string().min(3).max(10),
        name:z.string().min(3).max(10)
    })

const parsedData = requireBody.safeParse(req.body)

if(!parsedData.success){
 res.json({
    message:"Incorrect Format",
    error:parsedData.error
 })
    return
}


    const {email,password,name} = req.body
    const HashedPassword = await bcrypt.hash(password,5);
    console.log(HashedPassword);
    await UserModel.create({
        email:email,
        password:HashedPassword,
        name:name
    })
    res.json({
        message:"User signup Succesfull"
    })


})


app.post('/signin',async function(req,res){
    const {email,password} = req.body;

    const response = await UserModel.findOne({
        email:email
    })
    const passwordHashed = await bcrypt.compare(password,response.password)
    if(!email){
        res.status(403).json({msg:"Email Not Found"})
    }
    if(passwordHashed){
        const token = jwt.sign({
            id:response._id.toString()
        },JWT_SECERT)
        res.json({
            token:token
        })

    }else{
        res.json({
            message:"Token not Found"
        })

    }
})
app.listen(3000);
