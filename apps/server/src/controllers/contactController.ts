import { Request, Response } from 'express'
import Contact from '../models/Contact.js'
import { sendContactEmail } from '../utils/emailService'
import { contactFormSchema } from '@spintatech/shared'

export const createContact = async (req: Request, res: Response) => {
  // Honeypot check: if the hidden field is filled, it's a bot
  if (req.body.website) {
    return res.status(200).json({ success: true }) // Silently ignore spam
  }

  try {
    // Validate request body
    const validatedData = contactFormSchema.parse(req.body)
    
    // Create new contact
    const contact = new Contact({
      ...validatedData,
      source: 'website'
    })
    
    await contact.save()
    
    // Send notification emails
    try {
      await sendContactEmail(contact, validatedData.locale ?? "en")
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }
    
    res.status(201).json({
      success: true,
      message: validatedData.locale === 'hi' 
        ? 'आपका संदेश सफलतापूर्वक भेजा गया है। हम जल्द ही आपसे संपर्क करेंगे।'
        : 'Your message has been sent successfully. We will contact you soon.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email
      }
    })
    
  } catch (error: any) {
    console.error('Contact creation error:', error)
    
    if (error.name === 'ZodError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      })
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data provided',
        errors: Object.values(error.errors).map((err: any) => err.message)
      })
    }
    
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
}

export const getContacts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const status = req.query.status as string
    
    const query = status ? { status } : {}
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v')
    
    const total = await Contact.countDocuments(query)
    
    res.json({
      success: true,
      data: contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error: any) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    })
  }
}