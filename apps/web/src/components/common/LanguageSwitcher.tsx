import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Globe, ChevronDown, Check } from 'lucide-react'

const languages = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English',
    flag: '🇺🇸' 
  },
  { 
    code: 'hi', 
    name: 'हिंदी', 
    nativeName: 'Hindi',
    flag: '🇮🇳' 
  }
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]
  
  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
    
    // Update URL path for SEO
    const currentPath = window.location.pathname
    const pathWithoutLang = currentPath.replace(/^\/(en|hi)/, '')
    const newPath = `/${languageCode}${pathWithoutLang}`
    window.history.pushState({}, '', newPath)
  }
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 h-9 px-3 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-sm group"
        >
          <Globe className="h-4 w-4 text-gray-600 group-hover:text-primary transition-colors" />
          <span className="text-lg">{currentLanguage?.flag ?? ''}</span>
          <span className="hidden sm:inline text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {currentLanguage?.name ?? ''}
          </span>
          <ChevronDown className={`h-3 w-3 text-gray-500 transition-all duration-200 group-hover:text-primary ${
            isOpen ? 'rotate-180' : ''
          }`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 p-2 bg-white border border-gray-200 rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <div className="px-2 py-1.5 mb-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Select Language
          </p>
        </div>
        <DropdownMenuSeparator className="my-1 bg-gray-100" />
        {languages.map((language, index) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer rounded-lg p-3 transition-all duration-150 focus:bg-gray-50 hover:bg-gray-50 ${
              language.code === i18n.language 
                ? 'bg-primary/5 text-primary border-l-4 border-primary' 
                : 'text-gray-700 hover:text-gray-900'
            } ${index === 0 ? 'mt-1' : ''}`}
          >
            <div className="flex items-center w-full">
              <span className="text-xl mr-3">{language.flag}</span>
              <div className="flex-1">
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{language.name}</span>
                  <span className="text-xs text-gray-500">{language.nativeName}</span>
                </div>
              </div>
              {language.code === i18n.language && (
                <Check className="h-4 w-4 text-primary ml-2" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}