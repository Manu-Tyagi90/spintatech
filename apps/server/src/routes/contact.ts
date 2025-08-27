import express from 'express'
import { createContact, getContacts } from '../controllers/contactController.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

// Rate limiting for contact form (stricter)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per 15 minutes
  message: {
    success: false,
    message: 'Too many contact form submissions. Please try again later.'
  }
})

// Routes
router.post('/', contactLimiter, createContact)
router.get('/', getContacts) // This would be protected in production

export default router
