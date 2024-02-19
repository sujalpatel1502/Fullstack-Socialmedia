import { db } from "../connect.js"
import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";

export const register=(req,res)=>{
    console.log("reqqqqq",req.body);
    const q= "SELECT * FROM users WHERE username = ?"
    // ? to make it secore rather than trying to write req.body write ? for more secure
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length) return res.status(409).json("User already exists");

        const salt=bcrypt.genSaltSync(10);
        const hashPassword=bcrypt.hashSync(req.body.password,salt);

        const q="INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)"
        const values=[req.body.username,req.body.email,hashPassword,req.body.name]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("user has been created") 
        })
    })

   
}


export const login=(req,res)=>{
    const q="SELECT * FROM users WHERE username = ?";
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("user not found");
        const checkpassword=bcrypt.compareSync(req.body.password,data[0].password);
        if(!checkpassword) return res.status(400).json("Wrong password or username");
        const token = Jwt.sign({id:data[0].id},"secretkey");
        console.log(token);
        const {password, ...others}=data[0]
        res.cookie("accessToken",token,{
            httpOnly:true,
        }).status(200).json(others)

    })
}

export const logout=(req,res)=>{
        res.clearCookie("accessToken",{
            secure:true,
            sameiSite:"none"
        }).status(200).json("user has been logged out")
}
