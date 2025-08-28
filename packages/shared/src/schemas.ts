import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  locale: z.enum(['en', 'hi']),
  consent: z.boolean().refine(val => val === true, 'Consent is required')
})

export type ContactFormData = z.infer<typeof contactFormSchema>