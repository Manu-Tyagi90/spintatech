import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language || 'en'

  const services = [
    { key: 'cloud_devops', icon: '☁️' },
    { key: 'data_ai', icon: '🤖' },
    { key: 'digital_transformation', icon: '🚀' },
    { key: 'cybersecurity', icon: '🔒' },
    { key: 'enterprise_solutions', icon: '🏢' }
  ]

  const industries = [
    { key: 'bfsi', icon: '🏦' },
    { key: 'healthcare', icon: '🏥' },
    { key: 'retail', icon: '🛒' },
    { key: 'manufacturing', icon: '🏭' }
  ]

  const stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '25+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '99%', label: 'Client Satisfaction' }
  ]

  return (
    <>
      <Helmet>
        <title>Spintatech Services | Engineering Digital Excellence</title>
        <meta name="description" content="Spintatech Services delivers transformative digital solutions for enterprises. Cloud, Data & AI, Digital Transformation, Cybersecurity, and Enterprise Solutions." />
        <meta property="og:title" content="Spintatech Services | Engineering Digital Excellence" />
        <meta property="og:description" content="Transforming enterprises with Cloud, Data & AI, Digital Transformation, Cybersecurity, and Enterprise Solutions." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://spintatech.com/" />
        <meta name="twitter:title" content="Spintatech Services | Engineering Digital Excellence" />
        <meta name="twitter:description" content="Transforming enterprises with Cloud, Data & AI, Digital Transformation, Cybersecurity, and Enterprise Solutions." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://spintatech.com/" />
        <link rel="alternate" href="https://spintatech.com/en" hrefLang="en" />
        <link rel="alternate" href="https://spintatech.com/hi" hrefLang="hi" />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to={`/${currentLang}/contact`}>
                    {t('hero.cta_primary')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
                  <Link to={`/${currentLang}/services`}>
                    {t('hero.cta_secondary')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('services.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('services.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.key} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">
                    {t(`services.${service.key}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t(`services.${service.key}.description`)}
                  </p>
                  <div className="text-sm text-gray-500">
                    {t(`services.${service.key}.keywords`)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link to={`/${currentLang}/services`}>
                  View All Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Industries Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('industries.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t('industries.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {industries.map((industry) => (
                <div key={industry.key} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="text-5xl mb-4">{industry.icon}</div>
                  <h3 className="text-lg font-semibold mb-3">
                    {t(`industries.${industry.key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {t(`industries.${industry.key}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              {t('contact.subtitle')}
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to={`/${currentLang}/contact`}>
                {t('hero.cta_primary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}