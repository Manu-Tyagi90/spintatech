import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Cloud, Database, RefreshCw, Shield, Building2 } from 'lucide-react'

const services = [
  {
    key: 'cloud_devops',
    icon: <Cloud className="h-10 w-10 text-primary mb-4" />
  },
  {
    key: 'data_ai',
    icon: <Database className="h-10 w-10 text-primary mb-4" />
  },
  {
    key: 'digital_transformation',
    icon: <RefreshCw className="h-10 w-10 text-primary mb-4" />
  },
  {
    key: 'cybersecurity',
    icon: <Shield className="h-10 w-10 text-primary mb-4" />
  },
  {
    key: 'enterprise_solutions',
    icon: <Building2 className="h-10 w-10 text-primary mb-4" />
  }
]

export default function ServicesPage() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('services.title')} | Spintatech Services</title>
        <meta name="description" content={t('services.subtitle')} />
      </Helmet>
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div
                key={service.key}
                className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
              >
                {service.icon}
                <h2 className="text-xl font-semibold mb-2">
                  {t(`services.${service.key}.title`)}
                </h2>
                <p className="text-gray-600 mb-4">
                  {t(`services.${service.key}.description`)}
                </p>
                <div className="text-sm text-gray-500">
                  {t(`services.${service.key}.keywords`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}