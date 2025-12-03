
import express from "express";
import dayjs from "dayjs";
import { db } from "../lib/firestore.js";
import { CONFIG } from "../lib/config.js";

const router = express.Router();
const DON="donations";
const AG="agents";

router.post("/create", async (req,res,next)=>{
  try{
    const { amount, madrasaId, agentId, donorName, donorPhone,
            type="online", isZakat=false } = req.body;

    const donation={
      amount:Number(amount),
      madrasaId,
      agentId:agentId||null,
      donorName:donorName||null,
      donorPhone:donorPhone||null,
      type,
      isZakat,
      status:"paid",
      createdAt:dayjs().toISOString()
    };

    const ref = await db().collection(DON).add(donation);

    if(agentId){
      const commission = donation.amount * CONFIG.AGENT_COMMISSION;
      await db().collection(AG).doc(agentId)
      .collection("commissions").add({
        donationId:ref.id,
        amount:commission,
        percent:CONFIG.AGENT_COMMISSION,
        timestamp:dayjs().toISOString()
      });
    }

    res.json({ok:true,id:ref.id,donation});
  }catch(e){ next(e); }
});

router.post("/credit", async (req,res,next)=>{
  try{
    const { donorName, donorPhone, amount, madrasaId }=req.body;
    const doc=await db().collection(DON).add({
      donorName,donorPhone,amount:Number(amount),
      madrasaId,status:"pending",
      createdAt:dayjs().toISOString()
    });
    res.json({ok:true,id:doc.id});
  }catch(e){ next(e); }
});

export default router;
