export interface ContactForm {
  name: string
  email: string
  company?: string
  message: string
  locale: 'en' | 'hi'
  consent: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  keywords: string[]
  category: 'cloud' | 'data' | 'digital' | 'security' | 'enterprise'
}

export interface Industry {
  id: string
  name: string
  description: string
  solutions: string[]
}
