import express from 'express'
import { createJobApplication } from '../controllers/jobController'

const router = express.Router()
router.post('/', createJobApplication)
export default router