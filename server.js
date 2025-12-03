import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import { initializeFirestore } from "./lib/firestore.js";

import authRoutes from "./routes/auth.js";
import madrasaRoutes from "./routes/madrasa.js";
import donationRoutes from "./routes/donations.js";
import reportsRoutes from "./routes/reports.js";
import agentRoutes from "./routes/agent.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "3mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const limiter = rateLimit({ windowMs: 15*60*1000, max: 500 });
app.use(limiter);

await initializeFirestore();

app.get("/", (req,res)=>res.json({ok:true,msg:"Master Backend Running"}));

app.use("/api/auth", authRoutes);
app.use("/api/madrasa", madrasaRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/agent", agentRoutes);

app.use((err, req, res, next)=>{
  console.error(err);
  res.status(err.status || 500).json({error: err.message || "Internal Error"});
});

app.listen(PORT, ()=>console.log("Server listening on", PORT));
