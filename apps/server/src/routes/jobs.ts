import express from 'express'
import { createJobApplication } from '../controllers/jobController.js'
import { asyncHandler } from '../utils/asyncHandler.js' // changed

const router = express.Router()
router.post('/', asyncHandler(createJobApplication))
export default router