import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().min(1).max(65535).default(3001),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
})

// Crash immédiat si invalide — pas de var undefined en prod
export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>
