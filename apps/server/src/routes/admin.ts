import express from 'express'
import Contact from '../models/Contact.js'
import JobApplication from '../models/JobApplication.js'
import { adminAuth } from '../middleware/adminAuth.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import type { Request, Response } from 'express'

const router = express.Router()

router.get(
  '/leads',
  adminAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const leads = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, data: leads })
  })
)

router.get(
  '/applications',
  adminAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const apps = await JobApplication.find().sort({ createdAt: -1 })
    res.json({ success: true, data: apps })
  })
)

export default router