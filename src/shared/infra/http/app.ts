import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import "dotenv/config"
import "express-async-errors"
import { AppError } from '@shared/errors/AppError';

import createConnection from '@shared/infra/typeorm'

import '@shared/container'

import { router } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'
import upload from '@config/upload';
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter"

createConnection()
const app = express()

app.use(rateLimiter)

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(cors())
app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  } else {
    return response.status(500).json({
      status: "error",
      message: `Internal server error ${err.message}`
    })
  }
})

export { app }