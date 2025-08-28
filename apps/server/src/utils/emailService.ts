import nodemailer from 'nodemailer'
import { IContact } from '../models/Contact'

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Email templates
const getAdminEmailTemplate = (contact: IContact) => {
  return {
    subject: `New Contact Form Submission - ${contact.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A2540;">New Contact Form Submission</h2>
        
        <div style="background: #F6F9FC; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0A2540;">Contact Details</h3>
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
          <p><strong>Language:</strong> ${contact.locale === 'hi' ? 'Hindi' : 'English'}</p>
          <p><strong>Submitted:</strong> ${contact.createdAt.toLocaleString()}</p>
        </div>
        
        <div style="background: #fff; border: 1px solid #e1e5e9; padding: 20px; border-radius: 8px;">
          <h3 style="margin-top: 0; color: #0A2540;">Message</h3>
          <p style="white-space: pre-wrap;">${contact.message}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #00C49A; color: white; border-radius: 8px;">
          <p style="margin: 0;"><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
        </div>
      </div>
    `
  }
}

const getUserEmailTemplate = (contact: IContact, locale: 'en' | 'hi') => {
  if (locale === 'hi') {
    return {
      subject: 'स्पिंटाटेक सर्विसेज - आपका संदेश प्राप्त हुआ',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A2540;">नमस्ते ${contact.name},</h2>
          
          <p>स्पिंटाटेक सर्विसेज में आपका स्वागत है!</p>
          
          <p>हमें आपका संदेश प्राप्त हो गया है और हम इसकी समीक्षा कर रहे हैं। हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।</p>
          
          <div style="background: #F6F9FC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #0A2540;">आपका संदेश:</h3>
            <p style="white-space: pre-wrap;">${contact.message}</p>
          </div>
          
          <p>इस बीच, आप हमारी सेवाओं के बारे में अधिक जानकारी के लिए हमारी वेबसाइट पर जा सकते हैं।</p>
          
          <p>धन्यवाद,<br>स्पिंटाटेक सर्विसेज टीम</p>
          
          <div style="margin-top: 30px; padding: 20px; background: #0A2540; color: white; border-radius: 8px; text-align: center;">
            <p style="margin: 0;"><strong>Engineering Digital Excellence</strong></p>
          </div>
        </div>
      `
    }
  }
  
  return {
    subject: 'Spintatech Services - Message Received',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0A2540;">Hello ${contact.name},</h2>
        
        <p>Welcome to Spintatech Services!</p>
        
        <p>We have received your message and are reviewing it. Our team will contact you within 24 hours.</p>
        
        <div style="background: #F6F9FC; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0A2540;">Your Message:</h3>
          <p style="white-space: pre-wrap;">${contact.message}</p>
        </div>
        
        <p>In the meantime, feel free to explore our website to learn more about our services.</p>
        
        <p>Thank you,<br>Spintatech Services Team</p>
        
        <div style="margin-top: 30px; padding: 20px; background: #0A2540; color: white; border-radius: 8px; text-align: center;">
          <p style="margin: 0;"><strong>Engineering Digital Excellence</strong></p>
        </div>
      </div>
    `
  }
}

export const sendContactEmail = async (contact: IContact, locale: 'en' | 'hi') => {
  const transporter = createTransporter()
  
  // Send email to admin
  const adminTemplate = getAdminEmailTemplate(contact)
  await transporter.sendMail({
    from: `"Spintatech Services" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: adminTemplate.subject,
        html: adminTemplate.html,
  })
  
  // Send confirmation email to user
  const userTemplate = getUserEmailTemplate(contact, locale)
  await transporter.sendMail({
    from: `"Spintatech Services" <${process.env.SMTP_USER}>`,
    to: contact.email,
    subject: userTemplate.subject,
    html: userTemplate.html,
  })
}