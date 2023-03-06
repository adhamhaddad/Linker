import { rateLimit } from 'express-rate-limit';

export const limit = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 10, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:
    'Too many requests. try again with different email or password after 30 seconds'
});
