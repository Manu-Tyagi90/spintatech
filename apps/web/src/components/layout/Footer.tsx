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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-bold mb-4">Spintatech</div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('footer.description')}
            </p>
            <div className="text-accent font-semibold">
              {t('footer.tagline')}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services_links')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-accent" />
              <span className="text-gray-300">{t('footer.email')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-accent" />
              <span className="text-gray-300">{t('footer.phone')}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-accent" />
              <span className="text-gray-300">{t('footer.address')}</span>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  )
}