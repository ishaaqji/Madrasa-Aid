export const CONFIG = {
  JWT_SECRET: process.env.JWT_SECRET || "change-me",
  AGENT_COMMISSION: Number(process.env.AGENT_COMMISSION_PERCENT || "0.05"),
};
