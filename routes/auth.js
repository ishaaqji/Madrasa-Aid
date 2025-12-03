
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import { db } from "../lib/firestore.js";
import { CONFIG } from "../lib/config.js";

const router = express.Router();
const USERS="users";

router.post("/signup", async (req,res,next)=>{
  try{
    const {name,phone,password,isAdmin=false}=req.body;
    const hash = await bcrypt.hash(password,10);
    await db().collection(USERS).add({
      name, phone, password:hash, isAdmin, createdAt:dayjs().toISOString()
    });
    res.json({ok:true,msg:"User created"});
  }catch(e){ next(e); }
});

router.post("/login", async (req,res,next)=>{
  try{
    const {phone,password}=req.body;
    const snap = await db().collection(USERS).where("phone","==",phone).get();
    if(snap.empty) return res.status(400).json({error:"Invalid"});
    const user = snap.docs[0].data();
    const ok = await bcrypt.compare(password,user.password);
    if(!ok) return res.status(400).json({error:"Invalid"});
    const token = jwt.sign(
      { uid:snap.docs[0].id, phone, isAdmin:user.isAdmin||false },
      CONFIG.JWT_SECRET
    );
    res.json({ok:true,token});
  }catch(e){ next(e); }
});

export default router;
