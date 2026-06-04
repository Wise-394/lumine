import { rateLimit } from "express-rate-limit";

// 20 request per 5mins max per IP address
export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
});
