import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

// This should match your main posts array
const posts = [
  {
    slug: 'cloud-migration-best-practices',
    title: {
      en: 'Cloud Migration Best Practices',
      hi: 'क्लाउड माइग्रेशन के सर्वोत्तम तरीके'
    },
    summary: {
      en: 'Learn how to migrate your enterprise workloads to the cloud efficiently and securely.',
      hi: 'जानें कि अपने एंटरप्राइज वर्कलोड्स को क्लाउड पर सुरक्षित और कुशलता से कैसे माइग्रेट करें।'
    },
    date: '2024-08-01',
    content: {
      en: 'This is the full content for Cloud Migration Best Practices.',
      hi: 'यह क्लाउड माइग्रेशन के सर्वोत्तम तरीकों के लिए पूरी सामग्री है।'
    }
  },
  {
    slug: 'ai-in-enterprise',
    title: {
      en: 'AI in Enterprise: Real-World Use Cases',
      hi: 'एंटरप्राइज में एआई: वास्तविक उपयोग के मामले'
    },
    summary: {
      en: 'Explore how AI and machine learning are transforming business operations.',
      hi: 'जानें कि एआई और मशीन लर्निंग कैसे बिजनेस ऑपरेशंस को बदल रहे हैं।'
    },
    date: '2024-07-15',
    content: {
      en: 'This is the full content for AI in Enterprise.',
      hi: 'यह एंटरप्राइज में एआई के लिए पूरी सामग्री है।'
    }
  }
  // ...add more as needed
]

export default function InsightPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const lang = window.location.pathname.startsWith('/hi') ? 'hi' : 'en'
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
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
        <title>{post.title[lang]} | Spintatech Insights</title>
        <meta name="description" content={post.summary[lang]} />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4">
          <Link to={`/${lang}/insights`} className="text-primary underline mb-4 inline-block">
            ← {lang === 'hi' ? 'अंतर्दृष्टि' : 'Back to Insights'}
          </Link>
          <h1 className="text-4xl font-bold mb-2">{post.title[lang]}</h1>
          <div className="text-gray-400 mb-4">{post.date}</div>
          <p className="text-lg text-gray-700 mb-6">{post.summary[lang]}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{lang === 'hi' ? 'विवरण' : 'Details'}</h2>
            <p className="text-gray-700">{post.content[lang]}</p>
          </div>
        </div>
      </div>
    </>
  )
}