import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Building, HeartPulse, ShoppingCart, Factory, ArrowRight } from 'lucide-react'

const industries = [
  {
    key: 'bfsi',
    icon: <Building className="h-10 w-10 text-primary mb-4" />
  },
  {
    key: 'healthcare',
    icon: <HeartPulse className="h-10 w-10 text-primary mb-4" />
  },
  {
    key: 'retail',
    icon: <ShoppingCart className="h-10 w-10 text-primary mb-4" />
  },
  {
    key: 'manufacturing',
    icon: <Factory className="h-10 w-10 text-primary mb-4" />
  }
]

export default function IndustriesPage() {
  const { t, i18n } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('industries.title')} | Spintatech Services</title>
        <meta name="description" content={t('industries.subtitle')} />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('industries.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('industries.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map(ind => {
              // --- FIX: Always get an array or fallback to []
              const rawSolutions = t(`industries.${ind.key}.solutions`, { returnObjects: true })
              const solutions = Array.isArray(rawSolutions) ? rawSolutions : []
              return (
                <div
                  key={ind.key}
                  className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
                >
                  {ind.icon}
                  <h2 className="text-xl font-semibold mb-2">
                    {t(`industries.${ind.key}.title`)}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {t(`industries.${ind.key}.description`)}
                  </p>
                  <ul className="text-left text-gray-700 mb-4 list-disc list-inside">
                    {solutions.map((sol, idx) => (
                      <li key={idx}>{sol}</li>
                    ))}
                  </ul>
                  <Link
                    to={`/${i18n.language}/industries/${ind.key}`}
                    className="inline-flex items-center text-primary font-medium hover:underline mt-auto"
                  >
                    {t('aria.learnMore')}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}