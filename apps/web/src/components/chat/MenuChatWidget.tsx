import { useState, useRef, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { menuChatMachine } from '@/lib/agent/menuChatMachine'
import chatFlow from '@/lib/agent/flows/main-flow.json'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'

export default function MenuChatWidget() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [state, send] = useMachine(menuChatMachine)
  const [overFooter, setOverFooter] = useState(false)
  const chatBtnRef = useRef<HTMLButtonElement>(null)
  const footerRef = useRef<HTMLElement | null>(null)

  // Find the current node, fallback to the first node if not found
  const node = chatFlow.find((n: any) => n.id === state.context.currentNodeId) || chatFlow[0]
  const lang = state.context.locale || (i18n.language as 'en' | 'hi') || 'en'

  // Intersection Observer to detect overlap with footer
  useEffect(() => {
    footerRef.current = document.querySelector('footer')
    if (!chatBtnRef.current || !footerRef.current) return

    const observer = new window.IntersectionObserver(
      (entries) => setOverFooter(entries[0]?.isIntersecting ?? false),
      {
        root: null,
        threshold: 0.1
      }
    )
    observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleOptionClick = (next: string) => {
    send({ type: 'SELECT_OPTION', next })
  }

  const handleClose = () => {
    send({ type: 'RESET_CHAT' })
    setIsOpen(false)
  }

  const handleLanguageChange = (newLocale: 'en' | 'hi') => {
    send({ type: 'CHANGE_LOCALE', locale: newLocale })
    i18n.changeLanguage(newLocale)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <Button
          ref={chatBtnRef}
          onClick={() => setIsOpen(true)}
          size="lg"
          className={
            overFooter
              ? "rounded-full w-14 h-14 bg-white text-primary border-4 border-accent shadow-2xl hover:bg-accent hover:text-white transition-all duration-300"
              : "rounded-full w-14 h-14 bg-primary text-black border-4 border-accent shadow-2xl hover:bg-accent hover:text-primary transition-all duration-300"
          }
          aria-label={lang === 'hi' ? 'चैट खोलें' : 'Open chat'}
          style={{
            boxShadow: '0 8px 32px 0 rgba(10,37,64,0.25), 0 1.5px 6px 0 rgba(0,0,0,0.10)'
          }}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-[#181F2A] rounded-2xl shadow-2xl border border-primary flex flex-col animate-fade-in">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">Spintatech Assistant</span>
              <span className="ml-2 px-2 py-0.5 rounded bg-accent text-xs font-semibold">Menu</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLanguageChange('en')}
                className={`text-white hover:bg-white/20 px-2 py-1 rounded ${lang === 'en' ? 'bg-white/20 font-bold' : ''}`}
              >
                EN
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLanguageChange('hi')}
                className={`text-white hover:bg-white/20 px-2 py-1 rounded ${lang === 'hi' ? 'bg-white/20 font-bold' : ''}`}
              >
                HI
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-white hover:bg-white/20 px-2 py-1 rounded"
                aria-label={lang === 'hi' ? 'चैट बंद करें' : 'Close chat'}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#181F2A] rounded-b-2xl">
            <div className="mb-8 text-base text-white font-medium text-center">
              {node?.message?.[lang]}
            </div>
            <div className="flex flex-col gap-3">
              {node?.options?.map((opt: any) => (
                <Button
                  key={opt.next}
                  onClick={() => handleOptionClick(opt.next)}
                  className="w-full text-base font-semibold bg-[#232B3A] border border-primary text-white hover:bg-accent hover:text-primary transition-colors duration-200 rounded-lg shadow-sm"
                  variant="outline"
                >
                  {opt.label?.[lang]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}