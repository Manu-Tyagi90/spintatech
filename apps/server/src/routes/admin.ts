import express, { Request, Response } from 'express'
import Contact from '../models/Contact'
import JobApplication from '../models/JobApplication'
import { adminAuth } from '../middleware/adminAuth'
import { asyncHandler } from '../utils/asyncHandler'

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