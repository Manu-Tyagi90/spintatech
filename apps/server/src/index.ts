import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import contactRoutes from './routes/contact'
import jobRoutes from './routes/jobs'
import adminRoutes from './routes/admin'
import { errorHandler } from './middleware/errorHandler'
import clientRoutes from './routes/client'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/spintatech')
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://spintatech.com', 'https://www.spintatech.com']
    : ['http://localhost:3000', 'http://localhost:5173'], // include Vite default dev origin
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api', limiter)

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Spintatech Server is running',
    timestamp: new Date().toISOString()
  })
})

app.use('/api/contact', contactRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/admin', adminRoutes) 
app.use('/api/client', clientRoutes)
// Error handling middleware
app.use(errorHandler)

// 404 handler (should be last)
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Start server
const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`🚀 Spintatech Server running on port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
  })
}

startServer()

// Ensure unhandled promise rejections are logged and exit to avoid silent failures in production
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // in production you may want to perform graceful shutdown here
  process.exit(1)
})