import { createMachine, assign } from 'xstate'
import { IntentDetector, type Intent } from './intentDetection'

export interface ChatMessage {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface ChatContext {
  messages: ChatMessage[]
  currentIntent: Intent | null
  locale: 'en' | 'hi'
  intentDetector: IntentDetector
}

export type ChatEvent =
  | { type: 'SEND_MESSAGE'; message: string }
  | { type: 'CHANGE_LOCALE'; locale: 'en' | 'hi' }
  | { type: 'RESET_CHAT' }
  | { type: 'REQUEST_HUMAN_HANDOFF' }

const generateId = () => Math.random().toString(36).substring(2, 11)

const welcome = (loc: 'en' | 'hi') =>
  loc === 'hi'
    ? 'नमस्ते! मैं स्पिंटाटेक सर्विसेज के बारे में जानने में आपकी मदद करने के लिए यहाँ हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?'
    : "Hello! I'm here to help you learn about Spintatech Services. How can I assist you today?"

const fallback = (loc: 'en' | 'hi') =>
  loc === 'hi'
    ? 'मुझे इसके बारे में यकीन नहीं है। क्या आप चाहेंगे कि मैं आपको हमारी टीम से जोड़ूं?'
    : "I'm not sure about that. Would you like me to connect you with our team?"

export const chatMachine = createMachine({
  id: 'chatAgent',
  initial: 'idle',
  context: {
    messages: [],
    currentIntent: null,
    locale: 'en',
    intentDetector: new IntentDetector('en')
  } as ChatContext,

  states: {
    idle: {
      entry: assign((ctx: any) => ({
        messages: [
          {
            id: generateId(),
            text: welcome(ctx.locale),
            sender: 'bot',
            timestamp: new Date()
          }
        ]
      })),
      on: {
        SEND_MESSAGE: {
          target: 'processing',
          actions: assign((ctx: any, evt: any) => {
            if (evt.type !== 'SEND_MESSAGE') return {}
            return {
              messages: [
                ...ctx.messages,
                {
                  id: generateId(),
                  text: evt.message,
                  sender: 'user',
                  timestamp: new Date()
                }
              ]
            }
          })
        },
        CHANGE_LOCALE: {
          actions: assign((ctx: any, evt: any) => {
            if (evt.type !== 'CHANGE_LOCALE') return {}
            ctx.intentDetector.setLocale(evt.locale)
            return { locale: evt.locale, intentDetector: ctx.intentDetector }
          })
        },
        RESET_CHAT: {
          actions: assign((ctx: any) => ({
            messages: [
              {
                id: generateId(),
                text: welcome(ctx.locale),
                sender: 'bot',
                timestamp: new Date()
              }
            ],
            currentIntent: null
          }))
        },
        REQUEST_HUMAN_HANDOFF: 'humanHandoff'
      }
    },

    processing: {
      entry: assign((ctx: any) => {
        const userMsg = [...ctx.messages].reverse().find((m: any) => m.sender === 'user')
        return {
          currentIntent: userMsg ? ctx.intentDetector.detectIntent(userMsg.text) : null
        }
      }),
      always: [
        {
          target: 'responding',
          guard: (ctx: any) => !!ctx.currentIntent && ctx.currentIntent.confidence > 0.3
        },
        { target: 'fallback' }
      ]
    },

    responding: {
      entry: assign((ctx: any) => {
        if (!ctx.currentIntent?.matchedItem) return {}
        return {
          messages: [
            ...ctx.messages,
            {
              id: generateId(),
              text: ctx.currentIntent.matchedItem.answer,
              sender: 'bot',
              timestamp: new Date()
            }
          ]
        }
      }),
      after: { 1000: 'idle' }
    },

    fallback: {
      entry: assign((ctx: any) => ({
        messages: [
          ...ctx.messages,
          {
            id: generateId(),
            text: fallback(ctx.locale),
            sender: 'bot',
            timestamp: new Date()
          }
        ]
      })),
      after: { 1000: 'idle' }
    },

    humanHandoff: {
      entry: assign((ctx: any) => ({
        messages: [
          ...ctx.messages,
          {
            id: generateId(),
            text:
              ctx.locale === 'hi'
                ? 'मैं आपको हमारी टीम से जोड़ रहा हूँ। कृपया अपना संपर्क विवरण साझा करें।'
                : "I'm connecting you with our team. Please share your contact details.",
            sender: 'bot',
            timestamp: new Date()
          }
        ]
      })),
      on: { SEND_MESSAGE: 'idle' }
    }
  }
})