import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

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
    date: '2024-08-01'
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
    date: '2024-07-15'
  }
]

export default function InsightsPage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language as 'en' | 'hi') || 'en'

  return (
    <>
      <Helmet>
        <title>Insights | Spintatech Services</title>
        <meta name="description" content="Latest articles, insights, and best practices from Spintatech's technology experts." />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('navigation.insights')}
            </h1>
            <p className="text-xl text-gray-600">
              Latest articles, insights, and best practices from Spintatech's technology experts.
            </p>
          </div>
          <div className="space-y-8 max-w-3xl mx-auto">
            {posts.map(post => (
              <div key={post.slug} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link to={`/${lang}/insights/${post.slug}`} className="hover:underline">
                    {post.title[lang]}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-2">{post.summary[lang]}</p>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}