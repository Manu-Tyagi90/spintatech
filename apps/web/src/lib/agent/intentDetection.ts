import Fuse from 'fuse.js'
import { knowledgeBase, type KnowledgeItem } from './knowledgeBase'

export interface Intent {
  category: string
  confidence: number
  matchedItem: KnowledgeItem | null
}

export class IntentDetector {
  private readonly fuse: Fuse<KnowledgeItem>
  
  constructor(locale: 'en' | 'hi' = 'en') {
    // Filter knowledge base by locale
    const localizedKB = knowledgeBase.filter(item => item.locale === locale)
    
    // Configure Fuse.js for fuzzy matching
    this.fuse = new Fuse(localizedKB, {
      keys: [
        { name: 'question', weight: 0.4 },
        { name: 'keywords', weight: 0.6 }
      ],
      threshold: 0.6, // Lower = more strict matching
      includeScore: true,
      minMatchCharLength: 3
    })
  }
  
  detectIntent(userInput: string): Intent {
    const results = this.fuse.search(userInput)
    
    if (results.length === 0) {
      return {
        category: 'unknown',
        confidence: 0,
        matchedItem: null
      }
    }
    
    const bestMatch = results[0]
    if (!bestMatch) {
      return {
        category: 'unknown',
        confidence: 0,
        matchedItem: null
      }
    }
    const confidence = 1 - (bestMatch.score ?? 1)
    
    return {
      category: bestMatch.item.category,
      confidence,
      matchedItem: bestMatch.item
    }
  }
  
  setLocale(locale: 'en' | 'hi') {
    const localizedKB = knowledgeBase.filter(item => item.locale === locale)
    this.fuse.setCollection(localizedKB)
  }
}
