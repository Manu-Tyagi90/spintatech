import { useState, useRef, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { chatMachine } from '@/lib/agent/chatMachine'
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'

export default function ChatWidget() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [state, send] = useMachine(chatMachine)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [state.context.messages])

  useEffect(() => {
    // Only send CHANGE_LOCALE if the machine is not stopped
    if (state.status !== 'stopped') {
      send({ type: 'CHANGE_LOCALE', locale: i18n.language as 'en' | 'hi' })
    }
  }, [i18n.language, send, state.status])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      send({ type: 'SEND_MESSAGE', message: inputValue.trim() })
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Spintatech Assistant</h3>
                <p className="text-xs text-white/80">
                  {state.matches('processing') ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {state.context.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {state.matches('processing') && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={i18n.language === 'hi' ? 'अपना संदेश टाइप करें...' : 'Type your message...'}
                className="flex-1"
                disabled={state.matches('processing')}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || state.matches('processing')}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => send({ type: 'SEND_MESSAGE', message: i18n.language === 'hi' ? 'आपकी सेवाएं क्या हैं?' : 'What services do you offer?' })}
                className="text-xs"
              >
                {i18n.language === 'hi' ? 'सेवाएं' : 'Services'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => send({ type: 'SEND_MESSAGE', message: i18n.language === 'hi' ? 'मैं आपसे कैसे संपर्क कर सकता हूं?' : 'How can I contact you?' })}
                className="text-xs"
              >
                {i18n.language === 'hi' ? 'संपर्क' : 'Contact'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => send({ type: 'REQUEST_HUMAN_HANDOFF' })}
                className="text-xs"
              >
                {i18n.language === 'hi' ? 'टीम से बात करें' : 'Talk to Team'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}