import express from 'express'
import { createJobApplication } from '../controllers/jobController'
import { asyncHandler } from '../utils/asyncHandler' // added

const router = express.Router()
router.post('/', asyncHandler(createJobApplication))
export default router