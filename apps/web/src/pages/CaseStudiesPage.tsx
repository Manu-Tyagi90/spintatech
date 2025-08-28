import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const caseStudies = [
  {
    slug: 'banking-digital-transformation',
    client: 'Global Bank',
    title: {
      en: 'Digital Transformation for Global Bank',
      hi: 'ग्लोबल बैंक के लिए डिजिटल परिवर्तन'
    },
    summary: {
      en: 'Migrated legacy systems to the cloud, improved security, and enabled real-time analytics.',
      hi: 'क्लाउड पर माइग्रेशन, सुरक्षा में सुधार, और रियल-टाइम एनालिटिक्स सक्षम किया।'
    },
    result: {
      en: 'Reduced IT costs by 30%, improved customer experience.',
      hi: 'आईटी लागत में 30% की कमी, ग्राहक अनुभव में सुधार।'
    },
    date: '2024-06-10'
  },
  {
    slug: 'retail-ai-automation',
    client: 'Retail Giant',
    title: {
      en: 'AI Automation for Retail Giant',
      hi: 'रिटेल जायंट के लिए एआई ऑटोमेशन'
    },
    summary: {
      en: 'Implemented AI-driven inventory management and personalized marketing.',
      hi: 'एआई आधारित इन्वेंटरी प्रबंधन और पर्सनलाइज्ड मार्केटिंग लागू किया।'
    },
    result: {
      en: 'Increased sales by 18%, reduced stockouts by 40%.',
      hi: 'बिक्री में 18% की वृद्धि, स्टॉकआउट्स में 40% की कमी।'
    },
    date: '2024-05-20'
  }
  // Add more case studies as needed
]

export default function CaseStudiesPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'en' | 'hi'

  return (
    <>
      <Helmet>
        <title>{t('navigation.caseStudies')} | Spintatech Services</title>
        <meta name="description" content={lang === 'hi'
          ? 'बैंकिंग, रिटेल, हेल्थकेयर आदि में हमारे क्लाइंट्स के लिए स्पिंटाटेक द्वारा प्राप्त परिणाम देखें।'
          : 'See how Spintatech delivers results for clients in banking, retail, healthcare, and more.'} />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('navigation.caseStudies')}
            </h1>
            <p className="text-xl text-gray-600">
              {lang === 'hi'
                ? 'बैंकिंग, रिटेल, हेल्थकेयर आदि में हमारे क्लाइंट्स के लिए स्पिंटाटेक द्वारा प्राप्त परिणाम देखें।'
                : 'See how Spintatech delivers results for clients in banking, retail, healthcare, and more.'}
            </p>
          </div>
          <div className="space-y-8 max-w-3xl mx-auto">
            {caseStudies.map(cs => (
              <div key={cs.slug} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link to={`/${lang}/case-studies/${cs.slug}`} className="hover:underline">
                    {cs.title[lang]}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-2">{cs.summary[lang]}</p>
                <div className="text-sm text-gray-500 mb-1">{lang === 'hi' ? 'क्लाइंट' : 'Client'}: {cs.client}</div>
                <div className="text-sm text-gray-500 mb-1">{lang === 'hi' ? 'परिणाम' : 'Result'}: {cs.result[lang]}</div>
                <span className="text-xs text-gray-400">{cs.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}