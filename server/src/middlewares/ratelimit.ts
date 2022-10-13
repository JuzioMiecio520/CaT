import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";

// TODO: use redis or any other storage
const rateLimiter = new RateLimiterMemory({
  keyPrefix: "middleware",
  points: 10, // 10 requests
  duration: 1, // per 1 second by IP
});

const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      // res.status(429).send({"Too Many Requests"});
      next(
        createError(res, 429, {
          code: "too_many_requests",
          message: "Client sent to many request",
          type: "rate_limit",
        })
      );
    });
};

export default rateLimiterMiddleware;
