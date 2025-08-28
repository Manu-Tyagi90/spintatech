import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const currentLang = i18n.language || 'en'
  
  const quickLinks = [
    { name: t('navigation.home'), href: `/${currentLang}` },
    { name: t('navigation.about'), href: `/${currentLang}/about` },
    { name: t('navigation.careers'), href: `/${currentLang}/careers` },
    { name: t('navigation.contact'), href: `/${currentLang}/contact` },
  ]
  
  const serviceLinks = [
    { name: t('services.cloud_devops.title'), href: `/${currentLang}/services#cloud-devops` },
    { name: t('services.data_ai.title'), href: `/${currentLang}/services#data-ai` },
    { name: t('services.digital_transformation.title'), href: `/${currentLang}/services#digital-transformation` },
    { name: t('services.cybersecurity.title'), href: `/${currentLang}/services#cybersecurity` },
  ]
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 text-center md:text-left">
            <div className="inline-block">
              <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Spintatech
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto md:mx-0 text-sm sm:text-base leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="text-accent font-semibold text-lg animate-pulse">
              {t('footer.tagline')}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-100 border-b border-gray-800 pb-2 inline-block">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-gray-100 border-b border-gray-800 pb-2 inline-block">
              {t('footer.services_links')}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <a 
              href={`mailto:${t('footer.email')}`}
              className="flex items-center justify-center sm:justify-start space-x-3 group hover:text-accent transition-colors duration-300"
            >
              <div className="p-2 bg-gray-800 rounded-full group-hover:bg-accent/20 transition-colors duration-300">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <span className="text-gray-300 text-sm sm:text-base">{t('footer.email')}</span>
            </a>
            <a 
              href={`tel:${t('footer.phone')}`}
              className="flex items-center justify-center sm:justify-start space-x-3 group hover:text-accent transition-colors duration-300"
            >
              <div className="p-2 bg-gray-800 rounded-full group-hover:bg-accent/20 transition-colors duration-300">
                <Phone className="h-5 w-5 text-accent" />
              </div>
              <span className="text-gray-300 text-sm sm:text-base">{t('footer.phone')}</span>
            </a>
            <div className="flex items-center justify-center sm:justify-start space-x-3 group">
              <div className="p-2 bg-gray-800 rounded-full">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <span className="text-gray-300 text-sm sm:text-base">{t('footer.address')}</span>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-gray-500 text-xs sm:text-sm pt-4 border-t border-gray-800/50">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  )
}