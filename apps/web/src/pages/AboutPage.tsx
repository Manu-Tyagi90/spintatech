import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

export default function AboutPage() {
  const { t } = useTranslation()

  // FIX: Always get an array or fallback to []
  const rawContent = t('about.content', { returnObjects: true })
  const content = Array.isArray(rawContent) ? rawContent : []

  return (
    <>
      <Helmet>
        <title>{t('about.title')} | Spintatech Services</title>
        <meta name="description" content={t('about.subtitle')} />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('about.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('about.subtitle')}</p>
          </div>
          <div className="space-y-6 text-lg text-gray-700 mb-10">
            {content.map((para, idx) => (
              <p key={`about-para-${idx}`}>{para}</p>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">{t('about.mission')}</h2>
              <p className="text-gray-700">{t('about.mission_text')}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-semibold mb-2">{t('about.vision')}</h2>
              <p className="text-gray-700">{t('about.vision_text')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}