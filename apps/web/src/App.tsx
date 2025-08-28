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
import CaseStudiesPage from './pages/CaseStudiesPage'
import CaseStudyPage from './pages/CaseStudyPage'
import InsightPostPage from './pages/InsightPostPage'
import AdminPage from './pages/AdminPage'
import ClientPortalPage from './pages/ClientPortalPage'
import IndustryDetailsPage from './pages/IndustryDetailsPage'

// Import layout components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MenuChatWidget from './components/chat/MenuChatWidget'

function App() {
  const { i18n } = useTranslation()
  
  useEffect(() => {
    document.documentElement.lang = i18n.language
    document.documentElement.dir = 'ltr'
  }, [i18n.language])
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Default: redirect to English */}
            <Route path="/" element={<Navigate to="/en" replace />} />

            {/* English routes */}
            <Route path="/en" element={<HomePage />} />
            <Route path="/en/services" element={<ServicesPage />} />
            <Route path="/en/industries" element={<IndustriesPage />} />
            <Route path="/en/industries/:key" element={<IndustryDetailsPage />} />
            <Route path="/en/about" element={<AboutPage />} />
            <Route path="/en/careers" element={<CareersPage />} />
            <Route path="/en/insights" element={<InsightsPage />} />
            <Route path="/en/insights/:slug" element={<InsightPostPage />} />
            <Route path="/en/contact" element={<ContactPage />} />
            <Route path="/en/case-studies" element={<CaseStudiesPage />} />
            <Route path="/en/case-studies/:slug" element={<CaseStudyPage />} />
            <Route path="/en/admin" element={<AdminPage />} />
            <Route path="/en/client-portal" element={<ClientPortalPage />} />

            {/* Hindi routes */}
            <Route path="/hi" element={<HomePage />} />
            <Route path="/hi/services" element={<ServicesPage />} />
            <Route path="/hi/industries" element={<IndustriesPage />} />
            <Route path="/hi/industries/:key" element={<IndustryDetailsPage />} />
            <Route path="/hi/about" element={<AboutPage />} />
            <Route path="/hi/careers" element={<CareersPage />} />
            <Route path="/hi/insights" element={<InsightsPage />} />
            <Route path="/hi/insights/:slug" element={<InsightPostPage />} />
            <Route path="/hi/contact" element={<ContactPage />} />
            <Route path="/hi/case-studies" element={<CaseStudiesPage />} />
            <Route path="/hi/case-studies/:slug" element={<CaseStudyPage />} />
            <Route path="/hi/admin" element={<AdminPage />} />
            <Route path="/hi/client-portal" element={<ClientPortalPage />} />

            {/* 404 fallback */}
            <Route path="*" element={<Navigate to="/en" replace />} />
          </Routes>
        </main>
        <Footer />
        <MenuChatWidget />
      </div>
    </Router>
  )
}

export default App