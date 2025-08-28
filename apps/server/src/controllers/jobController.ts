import { Request, Response } from 'express'
import JobApplication from '../models/JobApplication.js' // changed

export const createJobApplication = async (req: Request, res: Response) => {
  try {
    const jobApp = new JobApplication(req.body)
    await jobApp.save()
    res.status(201).json({ success: true, message: 'Application received!' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Job application error:', error.message)
    } else {
      console.error('Job application error:', error)
    }
    res.status(500).json({ success: false, message: 'Failed to submit application.' })
  }
}