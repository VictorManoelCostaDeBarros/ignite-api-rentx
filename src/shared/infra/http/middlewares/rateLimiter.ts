import { createClient } from "redis"
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { NextFunction, Request, Response } from "express"

import { AppError } from './../../../errors/AppError';

const redisClient = createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 10,
  duration: 1
})

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (error) {
    throw new AppError("Too many requests", 429)
  }
}