import { db } from "../connect.js";

 export const getUSer=(req,res)=>{
        const userId=req.params.userId;
        const q="SELECT * FROM users WHERE id = ?"

        db.query(q,[userId],(err,data)=>{
            if(err) return res.status(500).json(err);
            const {password,...info}=data[0];
            return res.json(info)
        })
}