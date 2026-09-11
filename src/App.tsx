import { LanguageProvider } from './i18n/LanguageContext';
import { PageMetadata } from './components/PageMetadata';
import { NotFoundPage } from './pages/NotFoundPage';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { LanguageCourseDetailsPage } from './pages/LanguageCourseDetailsPage';
import { SMMCourseDetailsPage } from './pages/SMMCourseDetailsPage';
import { NiceExchangePage } from './pages/NiceExchangePage';
import { RegisterPage } from './pages/RegisterPage';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) { requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView()); }
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider><Router>
      <ScrollToTop /><PageMetadata />
      <div className="flex flex-col min-h-screen bg-white text-[rgb(38,38,38)] antialiased">
        <Navigation />
        <main id="main-content" className="flex-1 pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/nice-exchange" element={<NiceExchangePage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dynamic Course Routes */}
            <Route path="/courses/smm/:tier" element={<SMMCourseDetailsPage />} />
            <Route path="/courses/:slug" element={<LanguageCourseDetailsPage />} />

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router></LanguageProvider>
  );
};

export default App;
