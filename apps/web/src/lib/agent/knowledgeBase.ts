export interface KnowledgeItem {
  id: string
  question: string
  answer: string
  keywords: string[]
  category: string
  locale: 'en' | 'hi'
}

export const knowledgeBase: KnowledgeItem[] = [
  // English Knowledge Base
  {
    id: 'services-overview-en',
    question: 'What services do you offer?',
    answer: 'We offer 5 core services: Cloud & DevOps, Data & AI, Digital Transformation, Cybersecurity, and Enterprise Solutions. Each service is designed to help businesses modernize and scale their operations.',
    keywords: ['services', 'what do you do', 'offerings', 'solutions'],
    category: 'services',
    locale: 'en'
  },
  {
    id: 'cloud-devops-en',
    question: 'Tell me about your Cloud & DevOps services',
    answer: 'Our Cloud & DevOps services include cloud migration to AWS, Azure, and GCP, infrastructure management, CI/CD automation, and Kubernetes orchestration. We help businesses accelerate their digital transformation.',
    keywords: ['cloud', 'devops', 'aws', 'azure', 'gcp', 'kubernetes', 'ci/cd'],
    category: 'services',
    locale: 'en'
  },
  {
    id: 'data-ai-en',
    question: 'What Data & AI solutions do you provide?',
    answer: 'We provide data analytics, business intelligence, machine learning solutions, and big data processing. Our team helps unlock the power of your data for better business decisions.',
    keywords: ['data', 'ai', 'analytics', 'machine learning', 'business intelligence'],
    category: 'services',
    locale: 'en'
  },
  {
    id: 'pricing-en',
    question: 'What are your pricing models?',
    answer: 'Our pricing is project-based and depends on scope, complexity, and timeline. We offer flexible engagement models including fixed-price projects, time & material, and dedicated teams. Contact us for a detailed quote.',
    keywords: ['pricing', 'cost', 'price', 'budget', 'quote'],
    category: 'pricing',
    locale: 'en'
  },
  {
    id: 'contact-en',
    question: 'How can I contact you?',
    answer: 'You can reach us at contact@spintatech.com or call +91 20 1234 5678. You can also fill out our contact form and we will get back to you within 24 hours.',
    keywords: ['contact', 'email', 'phone', 'reach', 'get in touch'],
    category: 'contact',
    locale: 'en'
  },
  {
    id: 'company-info-en',
    question: 'Tell me about Spintatech',
    answer: 'Spintatech Services was founded in 2024 with the mission to deliver transformative digital solutions. We are headquartered in Pune, India, and specialize in serving large enterprises with cutting-edge technology solutions.',
    keywords: ['about', 'company', 'spintatech', 'who are you', 'founded'],
    category: 'company',
    locale: 'en'
  },
  
  // Hindi Knowledge Base
  {
    id: 'services-overview-hi',
    question: 'आप कौन सी सेवाएं प्रदान करते हैं?',
    answer: 'हम 5 मुख्य सेवाएं प्रदान करते हैं: क्लाउड और DevOps, डेटा और AI, डिजिटल परिवर्तन, साइबर सुरक्षा, और एंटरप्राइज़ समाधान। प्रत्येक सेवा व्यवसायों को आधुनिक बनाने और उनके संचालन को बढ़ाने में मदद करने के लिए डिज़ाइन की गई है।',
    keywords: ['सेवाएं', 'क्या करते हैं', 'समाधान', 'सर्विस'],
    category: 'services',
    locale: 'hi'
  },
  {
    id: 'contact-hi',
    question: 'मैं आपसे कैसे संपर्क कर सकता हूं?',
    answer: 'आप हमसे contact@spintatech.com पर ईमेल कर सकते हैं या +91 20 1234 5678 पर कॉल कर सकते हैं। आप हमारा संपर्क फॉर्म भी भर सकते हैं और हम 24 घंटे के भीतर आपसे संपर्क करेंगे।',
    keywords: ['संपर्क', 'ईमेल', 'फोन', 'कॉल', 'संपर्क करें'],
    category: 'contact',
    locale: 'hi'
  },
  {
    id: 'company-info-hi',
    question: 'स्पिंटाटेक के बारे में बताएं',
    answer: 'स्पिंटाटेक सर्विसेज की स्थापना 2024 में परिवर्तनकारी डिजिटल समाधान प्रदान करने के मिशन के साथ की गई थी। हमारा मुख्यालय पुणे, भारत में है, और हम अत्याधुनिक प्रौद्योगिकी समाधानों के साथ बड़े उद्यमों की सेवा करने में विशेषज्ञ हैं।',
    keywords: ['बारे में', 'कंपनी', 'स्पिंटाटेक', 'कौन हैं आप'],
    category: 'company',
    locale: 'hi'
  }
]