import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Building, HeartPulse, ShoppingCart, Factory } from 'lucide-react'
import React from 'react'

const industryIcons: Record<string, React.ReactElement> = {
  bfsi: <Building className="h-10 w-10 text-primary mb-4" />,
  healthcare: <HeartPulse className="h-10 w-10 text-primary mb-4" />,
  retail: <ShoppingCart className="h-10 w-10 text-primary mb-4" />,
  manufacturing: <Factory className="h-10 w-10 text-primary mb-4" />
}

export default function IndustryDetailsPage() {
  const { key } = useParams<{ key: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'en' | 'hi'
  const navigate = useNavigate()

  if (!key || !industryIcons[key]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">{lang === 'hi' ? 'उद्योग नहीं मिला' : 'Industry Not Found'}</h1>
        <button
          className="text-primary underline"
          onClick={() => navigate(-1)}
        >
          {lang === 'hi' ? 'वापस जाएं' : 'Go Back'}
        </button>
      </div>
    )
  }

  // FIX: Always get an array or fallback to []
  const rawSolutions = t(`industries.${key}.solutions`, { returnObjects: true })
  const solutions = Array.isArray(rawSolutions) ? rawSolutions : []

  return (
    <>
      <Helmet>
        <title>{t(`industries.${key}.title`)} | Spintatech Industries</title>
        <meta name="description" content={t(`industries.${key}.description`)} />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-3xl mx-auto px-4">
          <Link to={`/${lang}/industries`} className="text-primary underline mb-4 inline-block">
            ← {lang === 'hi' ? 'सभी उद्योग' : 'All Industries'}
          </Link>
          <div className="flex flex-col items-center mb-6">
            {industryIcons[key]}
            <h1 className="text-4xl font-bold mb-2">{t(`industries.${key}.title`)}</h1>
            <div className="text-gray-500 mb-4">{t(`industries.${key}.description`)}</div>
          </div>
          <div className="text-lg text-gray-700 mb-6">
            {t(`industries.${key}.details`)}
          </div>
          <ul className="list-disc list-inside text-gray-700">
            {solutions.map((sol) => (
              <li key={sol}>{sol}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}