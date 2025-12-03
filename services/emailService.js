import nodemailer from "nodemailer";
import { CONFIG } from "../lib/config.js";

const transporter = nodemailer.createTransport({
  host: CONFIG.SMTP_HOST,
  port: CONFIG.SMTP_PORT || 587,
  secure: false,
  auth: CONFIG.SMTP_USER ? { user: CONFIG.SMTP_USER, pass: CONFIG.SMTP_PASS } : undefined
});

export async function sendEmail({ to, subject, text, attachments=[] }){
  if(!CONFIG.SMTP_HOST) throw new Error('SMTP not configured');
  await transporter.sendMail({ from: CONFIG.SMTP_USER, to, subject, text, attachments });
}
