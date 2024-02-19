import express from 'express';
import { getUSer } from '../controllers/user.js';
const router=express.Router();

router.get("/find/:userId",getUSer)

export default router;