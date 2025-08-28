import express from 'express'
import Contact from '../models/Contact'
import JobApplication from '../models/JobApplication'
import { adminAuth } from '../middleware/adminAuth'

const router = express.Router()

router.get('/leads', adminAuth, async (req, res) => {
  const leads = await Contact.find().sort({ createdAt: -1 })
  res.json({ success: true, data: leads })
})

router.get('/applications', adminAuth, async (req, res) => {
  const apps = await JobApplication.find().sort({ createdAt: -1 })
  res.json({ success: true, data: apps })
})

export default router