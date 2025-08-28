import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const currentLang = i18n.language || 'en'
  
  const navigation = [
    { name: t('navigation.home'), href: `/${currentLang}` },
    { name: t('navigation.services'), href: `/${currentLang}/services` },
    { name: t('navigation.industries'), href: `/${currentLang}/industries` },
    { name: t('navigation.caseStudies'), href: `/${currentLang}/case-studies` },
    { name: t('navigation.about'), href: `/${currentLang}/about` },
    { name: t('navigation.careers'), href: `/${currentLang}/careers` },
    { name: t('navigation.insights'), href: `/${currentLang}/insights` },
    { name: t('navigation.contact'), href: `/${currentLang}/contact` },
  ]
  
  const isActive = (href: string) => {
    return location.pathname === href
  }
  
  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
<div className="flex-shrink-0">
  <Link to={`/${currentLang}`} className="flex items-center group">
    <div className="text-2xl md:text-3xl font-bold text-gray-900 transition-all duration-300 group-hover:scale-105 group-hover:text-primary">
      Spintatech
    </div>
  </Link>
</div>
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 relative ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in slide-in-from-bottom-1" />
                )}
                {!isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Right side */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <div className="relative w-6 h-6">
                  <Menu className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                  <X className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                </div>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100">
            {/* Mobile Language Switcher */}
            <div className="sm:hidden px-3 py-2 border-b border-gray-100 mb-2">
              <LanguageSwitcher />
            </div>
            
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 transform ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10 translate-x-2'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50 hover:translate-x-2'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <span className="flex items-center justify-between">
                  {item.name}
                  {isActive(item.href) && (
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}