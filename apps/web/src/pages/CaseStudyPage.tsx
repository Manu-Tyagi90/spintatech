import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// This should match your main case studies array
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
    date: '2024-06-10',
    details: {
      en: 'We helped Global Bank migrate their legacy systems to AWS, implemented CI/CD pipelines, and enabled real-time analytics dashboards for their business teams.',
      hi: 'हमने ग्लोबल बैंक को उनके लेगेसी सिस्टम्स को AWS पर माइग्रेट करने, CI/CD पाइपलाइन्स लागू करने, और रियल-टाइम एनालिटिक्स डैशबोर्ड्स सक्षम करने में मदद की।'
    }
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
    date: '2024-05-20',
    details: {
      en: 'Our team built a custom AI solution for Retail Giant, automating inventory management and enabling personalized marketing campaigns across all channels.',
      hi: 'हमारी टीम ने रिटेल जायंट के लिए कस्टम एआई सॉल्यूशन बनाया, इन्वेंटरी प्रबंधन को ऑटोमेट किया और सभी चैनलों पर पर्सनलाइज्ड मार्केटिंग सक्षम की।'
    }
  }
  // ...add more as needed
]

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const lang = window.location.pathname.startsWith('/hi') ? 'hi' : 'en'
  const caseStudy = caseStudies.find(cs => cs.slug === slug)

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
        <button
          className="text-primary underline"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{caseStudy.title[lang]} | Spintatech Case Study</title>
        <meta name="description" content={caseStudy.summary[lang]} />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4">
          <Link to={`/${lang}/case-studies`} className="text-primary underline mb-4 inline-block">
            ← {lang === 'hi' ? 'केस स्टडीज़' : 'Back to Case Studies'}
          </Link>
          <h1 className="text-4xl font-bold mb-2">{caseStudy.title[lang]}</h1>
          <div className="text-gray-500 mb-2">{lang === 'hi' ? 'क्लाइंट' : 'Client'}: {caseStudy.client}</div>
          <div className="text-gray-400 mb-4">{caseStudy.date}</div>
          <p className="text-lg text-gray-700 mb-6">{caseStudy.summary[lang]}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{lang === 'hi' ? 'परियोजना विवरण' : 'Project Details'}</h2>
            <p className="text-gray-700">{caseStudy.details[lang]}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{lang === 'hi' ? 'परिणाम' : 'Result'}</h2>
            <p className="text-green-700">{caseStudy.result[lang]}</p>
          </div>
        </div>
      </div>
    </>
  )
}