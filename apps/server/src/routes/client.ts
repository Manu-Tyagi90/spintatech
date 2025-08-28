import express, { Request, Response } from 'express'
import { clientAuth } from '../middleware/clientAuth'
import { asyncHandler } from '../utils/asyncHandler' // added

const router = express.Router()

router.get(
  '/dashboard',
  clientAuth,
  asyncHandler(async (req: Request, res: Response) => {
    // Example: return some client-specific data
    res.json({
      success: true,
      data: {
        projects: [
          { name: 'Website Redesign', status: 'In Progress' },
          { name: 'Cloud Migration', status: 'Completed' }
        ],
        files: [
          { name: 'Proposal.pdf', url: '/files/proposal.pdf' }
        ]
      }
    })
  })
)

export default router