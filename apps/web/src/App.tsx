import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './i18n'

// Import pages
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import IndustriesPage from './pages/IndustriesPage'
import AboutPage from './pages/AboutPage'
import CareersPage from './pages/CareersPage'
import InsightsPage from './pages/InsightsPage'
import ContactPage from './pages/ContactPage'

// Import layout components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ChatWidget from './components/chat/ChatWidget'

function App() {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    // Set document language and direction
    document.documentElement.lang = i18n.language
    document.documentElement.dir = 'ltr' // Both are LTR
  }, [i18n.language])
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Redirect root to default language */}
            <Route path="/" element={<Navigate to="/en" replace />} />
            
            {/* English routes */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/services" element={<ServicesPage />} />
            <Route path="/en/industries" element={<IndustriesPage />} />
            <Route path="/en/about" element={<AboutPage />} />
            <Route path="/en/careers" element={<CareersPage />} />
            <Route path="/en/insights" element={<InsightsPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            
            {/* Hindi routes */}
            <Route path="/hi" element={<HomePage />} />
            <Route path="/hi/services" element={<ServicesPage />} />
            <Route path="/hi/industries" element={<IndustriesPage />} />
            <Route path="/hi/about" element={<AboutPage />} />
            <Route path="/hi/careers" element={<CareersPage />} />
            <Route path="/hi/insights" element={<InsightsPage />} />
            <Route path="/hi/contact" element={<ContactPage />} />
            
            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/en" replace />} />
          </Routes>
        </main>
        <Footer />
        {/* <ChatWidget /> */}
        <ChatWidget />
      </div>
    </Router>
  )
}

export default App