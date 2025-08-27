import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  company?: string
  message: string
  locale: 'en' | 'hi'
  consent: boolean
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  source: string
  createdAt: Date
  updatedAt: Date
}

const ContactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  company: {
    type: String,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 2000
  },
  locale: {
    type: String,
    enum: ['en', 'hi'],
    default: 'en'
  },
  consent: {
    type: Boolean,
    required: true,
    validate: {
      validator: function(v: boolean) {
        return v === true
      },
      message: 'Consent must be given'
    }
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'closed'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'website'
  }
}, {
  timestamps: true
})

// Index for faster queries
ContactSchema.index({ email: 1 })
ContactSchema.index({ createdAt: -1 })
ContactSchema.index({ status: 1 })

export default mongoose.model<IContact>('Contact', ContactSchema)
