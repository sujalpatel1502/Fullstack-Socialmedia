import express from 'express';
const app = express();
import authroutes from "./routes/auth.js";
import userroutes from "./routes/users.js";
import postroutes from "./routes/posts.js";
import commentroutes from "./routes/comments.js";
import likeroutes from "./routes/likes.js";
import cors from "cors"
import cookieParser from 'cookie-parser';


app.use((req,res,next)=>{
    // to allow using of cookies
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(cookieParser());



app.use("/api/auth",authroutes);
app.use("/api/users",userroutes);
app.use("/api/posts",postroutes);
app.use("/api/comments",commentroutes);
app.use("/api/likes",likeroutes);




app.listen(8800,()=>{
    console.log("api working for social media");
})