import mongoose from 'mongoose'

const JobApplicationSchema = new mongoose.Schema({
  jobId: String,
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('JobApplication', JobApplicationSchema)