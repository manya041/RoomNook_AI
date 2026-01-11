const dotenv = require('dotenv')
dotenv.config()

const toInt = (v, d) => {
  const n = parseInt(v, 10)
  return Number.isNaN(n) ? d : n
}

const requireEnv = (key) => {
  const val = process.env[key]
  if (!val || val.trim() === '') {
    throw new Error(`Missing required env: ${key}`)
  }
  return val
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: toInt(process.env.PORT, 5000),
  db: {
    host: requireEnv('DB_HOST'),
    port: toInt(process.env.DB_PORT, 3306),
    name: requireEnv('DB_NAME'),
    user: requireEnv('DB_USER'),
    pass: process.env.DB_PASS || ''
  },
  jwt: {
    secret: requireEnv('JWT_SECRET'),
    expire: process.env.JWT_EXPIRE || '7d'
  },
  cors: {
    allowedOrigins: (process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : ['http://localhost:3000', 'http://localhost:3001'])
  },
  ai: {
    hfToken: process.env.HF_TOKEN || '',
    model: process.env.HF_MODEL || 'microsoft/DialoGPT-medium'
  }
}

module.exports = {
  env
}