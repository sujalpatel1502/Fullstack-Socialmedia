import { db } from "../connect.js"
import  jwt  from "jsonwebtoken"
import moment from "moment/moment.js";

export const getComments=(req,res)=>{
 
       
        const q=`SELECT c.*,u.id AS userid,name,profilepic FROM comments AS c JOIN users AS u ON (u.id=c.userid)
        WHERE c.postid = ? ORDER BY c.createdAt DESC
    `;
    
    db.query(q,[req.query.postId],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data)
    })

    
}

export const addComents=(req,res)=>{
    console.log("cameeeee in commmentttt",req.body.postId);
    const token=req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in");
    jwt.verify(token,"secretkey",(err,userinfo)=>{
        if(err) return res.status(403).json("TOken not valid")

        const q="INSERT INTO comments (`desc`,`createdAt`,`userid`,`postid`) VALUES (?)";
        const values=[
            req.body.desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userinfo.id,
            req.body.postId
        ]
    console.log(userinfo);
    db.query(q,[values],(err,data)=>{
        if(err){
            console.log("error in craeting comment",err);
        }
        
        if(err) return res.status(500).json(err);
        return res.status(200).json("comment has been created")
    })

    })
}