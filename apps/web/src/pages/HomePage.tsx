import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight, 
  Cloud, 
  Brain, 
  Rocket, 
  Shield, 
  Building2,
  Landmark,
  HeartPulse,
  ShoppingCart,
  Factory
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language || 'en'

  const services = [
    { key: 'cloud_devops', icon: Cloud },
    { key: 'data_ai', icon: Brain },
    { key: 'digital_transformation', icon: Rocket },
    { key: 'cybersecurity', icon: Shield },
    { key: 'enterprise_solutions', icon: Building2 }
  ]

  const industries = [
    { key: 'bfsi', icon: Landmark },
    { key: 'healthcare', icon: HeartPulse },
    { key: 'retail', icon: ShoppingCart },
    { key: 'manufacturing', icon: Factory }
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
        <meta name="description" content="Spintatech Services delivers transformative digital solutions for enterprises." />
        <link rel="canonical" href="https://spintatech.com/" />
        <link rel="alternate" href="https://spintatech.com/en" hrefLang="en" />
        <link rel="alternate" href="https://spintatech.com/hi" hrefLang="hi" />
      </Helmet>
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 sm:py-24 lg:py-32 overflow-hidden" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
                {t('hero.title')}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 animate-fade-in-up animation-delay-200">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  asChild 
                  aria-label={t('aria.getStarted')}
                  className="group hover:scale-105 transition-all duration-300 shadow-lg bg-primary text-white hover:bg-primary/90"
                >
                  <Link to={`/${currentLang}/contact`}>
                    {t('hero.cta_primary')}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white/50 hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300 backdrop-blur-sm" 
                  asChild 
                  aria-label={t('aria.learnMore')}
                >
                  <Link to={`/${currentLang}/services`}>
                    {t('hero.cta_secondary')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center group hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('services.title')}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {t('services.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <div 
                    key={service.key} 
                    className="group bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mb-4 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                      {t(`services.${service.key}.description`)}
                    </p>
                    <div className="text-xs sm:text-sm text-gray-500 italic">
                      {t(`services.${service.key}.keywords`)}
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center mt-10 sm:mt-12">
              <Button 
                size="lg" 
                asChild
                className="group hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Link to={`/${currentLang}/services`}>
                  View All Services
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Industries Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t('industries.title')}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {t('industries.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {industries.map((industry, index) => {
                const Icon = industry.icon
                return (
                  <div 
                    key={industry.key} 
                    className="group bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 text-center hover:-translate-y-2 border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">
                      {t(`industries.${industry.key}.title`)}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {t(`industries.${industry.key}.description`)}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-16 sm:py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
              {t('contact.title')}
            </h2>
            <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto text-gray-300 animate-fade-in-up animation-delay-200">
              {t('contact.subtitle')}
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              aria-label={t('aria.getStarted')}
              className="group hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in-up animation-delay-400 bg-primary text-white hover:bg-primary/90"
            >
              <Link to={`/${currentLang}/contact`}>
                {t('hero.cta_primary')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}