import { createMachine, assign } from 'xstate'

export interface MenuChatContext {
  currentNodeId: string
  history: string[]
  locale: 'en' | 'hi'
}

export type MenuChatEvent =
  | { type: 'SELECT_OPTION'; next: string }
  | { type: 'CHANGE_LOCALE'; locale: 'en' | 'hi' }
  | { type: 'RESET_CHAT' }

export const menuChatMachine = createMachine({
  id: 'menuChatAgent',
  initial: 'welcome',
  context: {
    currentNodeId: 'root',
    history: [],
    locale: 'en'
  } as MenuChatContext,
  states: {
    welcome: {
      on: {
        SELECT_OPTION: {
          target: 'node',
          actions: assign(({ context, event }) => {
            if (event.type !== 'SELECT_OPTION') return context
            return {
              ...context,
              currentNodeId: event.next,
              history: [...context.history, context.currentNodeId]
            }
          })
        },
        CHANGE_LOCALE: {
          actions: assign(({ context, event }) => {
            if (event.type !== 'CHANGE_LOCALE') return context
            return {
              ...context,
              locale: event.locale
            }
          })
        },
        RESET_CHAT: {
          actions: assign(({ context }) => ({
            ...context,
            currentNodeId: 'root',
            history: []
          }))
        }
      }
    },
    node: {
      always: [
        {
          target: 'welcome',
          guard: ({ context }) => context.currentNodeId === 'root'
        }
      ],
      on: {
        SELECT_OPTION: {
          actions: assign(({ context, event }) => {
            if (event.type !== 'SELECT_OPTION') return context
            return {
              ...context,
              currentNodeId: event.next,
              history: [...context.history, context.currentNodeId]
            }
          })
        },
        CHANGE_LOCALE: {
          actions: assign(({ context, event }) => {
            if (event.type !== 'CHANGE_LOCALE') return context
            return {
              ...context,
              locale: event.locale
            }
          })
        },
        RESET_CHAT: {
          target: 'welcome',
          actions: assign(({ context }) => ({
            ...context,
            currentNodeId: 'root',
            history: []
          }))
        }
      }
    }
  }
})