import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'

const app = express()

// Middlewares globaux
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: env.NODE_ENV === 'development' ? 'http://localhost:5173' : [],
    credentials: true, // Nécessaire pour les cookies httpOnly cross-origin
  })
)

// Endpoint de santé — vérifie que l'API répond
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
