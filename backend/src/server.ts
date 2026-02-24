import app from './app.js'
import { sequelize } from './config/database.js'
import { env } from './config/env.js'

try {
  await sequelize.authenticate()
  console.log('Database connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
  process.exit(1)
}

app.listen(env.PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${env.PORT}`)
  console.log(`   Environment: ${env.NODE_ENV}`)
})
