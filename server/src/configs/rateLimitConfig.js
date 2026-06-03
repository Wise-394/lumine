import { rateLimit } from "express-rate-limit";

// 50 request per 15mins max
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});
