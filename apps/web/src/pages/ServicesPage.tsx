import { useTranslation } from 'react-i18next'

export default function ServicesPage() {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600">
            Services page content coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}
