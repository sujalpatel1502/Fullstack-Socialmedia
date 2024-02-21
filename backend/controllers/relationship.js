
import { db } from "../connect.js"
import  jwt  from "jsonwebtoken"
import moment from "moment/moment.js";
export const getRelationships=(req,res)=>{
    console.log("insideeeee relationshipssssssssssssssss",req.query.followedUserId  );

    const q=`SELECT followeruserid FROM relationships WHERE followeduserid = ?
    `;
    
    db.query(q,[req.query.followedUserId],(err,data)=>{
        console.log("likes",data);
        if(data) console.log("error in relationships",data)
        if(err) return res.status(500).json(err);
        const dataa= data.map((relationship)=>relationship.followeruserid)
        console.log("daaaaaa",dataa);
        return res.status(200).json(dataa)
       
    })
}

export const addRelationships=(req,res)=>{
    console.log("cameeeee in like",req.body.postId);
    const token=req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in");
    jwt.verify(token,"secretkey",(err,userinfo)=>{
        if(err) return res.status(403).json("TOken not valid")

        const q="INSERT INTO likes (`userid`,`postid`) VALUES (?)";
        const values=[
            userinfo.id,
            req.body.postId
        ]
    console.log(userinfo);
    db.query(q,[values],(err,data)=>{
        if(err){
            console.log("error in craeting comment",err);
        }
        
        if(err) return res.status(500).json(err);
        return res.status(200).json("like added sucessfully")
    })

    })
}

export const deleteRelationships=(req,res)=>{
    console.log("deleteeeeeeeeddddddddd cmaeeeee111");
    const token=req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in");
    jwt.verify(token,"secretkey",(err,userinfo)=>{
        if(err) return res.status(403).json("TOken not valid")

        const q="DELETE FROM likes WHERE `userid`= ? AND postid = ?";
     
    console.log(userinfo);
    db.query(q,[userinfo.id,req.query.postId],(err,data)=>{
        if(err){
            console.log("error in craeting comment",err);
        }
        
        if(err) return res.status(500).json(err);
        return res.status(200).json("post has been disliked")
    })

    })
}