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
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white text-[rgb(38,38,38)] antialiased">
        <Navigation />
        <main className="flex-1">
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
              element={
                <div className="py-24 text-center space-y-4">
                  <h1 className="text-4xl font-extrabold text-black">404 - Page Not Found</h1>
                  <p className="text-gray-600">The page you requested could not be located.</p>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
