import express from 'express';
import {getComments,addComents } from '../controllers/comment.js';
const router=express.Router();

router.get("/",getComments);
router.post("/",addComents);


export default router;