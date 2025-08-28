import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message is required'),
  website: z.string().optional(), // <-- ADD THIS LINE
  locale: z.enum(['en', 'hi']).optional(),
  consent: z.boolean()
})

export type ContactFormData = z.infer<typeof contactFormSchema>