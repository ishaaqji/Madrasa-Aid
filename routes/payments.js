import express from "express";
import Razorpay from "razorpay";
import { CONFIG } from "../lib/config.js";
const router = express.Router();

const razor = new Razorpay({
  key_id: CONFIG.RAZORPAY_KEY_ID,
  key_secret: CONFIG.RAZORPAY_KEY_SECRET
});

router.post('/order', async (req,res,next)=>{
  try{
    const { amount, currency='INR', receipt } = req.body;
    const order = await razor.orders.create({ amount: Math.round(Number(amount)*100), currency, receipt });
    res.json({ ok:true, order });
  }catch(e){ next(e); }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req,res,next)=>{
  try{
    const payload = req.body;
    console.log('razorpay webhook', payload);
    res.status(200).send('ok');
  }catch(e){ next(e); }
});

export default router;
