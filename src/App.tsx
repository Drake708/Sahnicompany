import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import HomePage from './components/HomePage';
import ServicesPage from './components/ServicesPage';
import TaxMateAI from './components/TaxMateAI';
import KnowledgePortal from './components/KnowledgePortal';
import CalculatorsPage from './components/CalculatorsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import ClientPortal from './components/ClientPortal';
import AdminPortal from './components/AdminPortal';
import PrivacyPolicy from './components/PrivacyPolicy';

type Page = 'home' | 'services' | 'taxmate' | 'knowledge' | 'calculators' | 'about' | 'contact' | 'login' | 'portal' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [userType, setUserType] = useState<'client' | 'admin' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'taxmate', label: 'TaxMate AI' },
    { id: 'knowledge', label: 'Knowledge' },
    { id: 'calculators', label: 'Calculators' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavigation = (page: Page, type?: 'client' | 'admin') => {
    // Check if user is trying to navigate away from portal pages without logging out
    if ((currentPage === 'portal' || currentPage === 'admin') && !type && page !== 'login') {
      alert('Please logout first before navigating to other pages.');
      return;
    }

    if (type) {
      setUserType(type);
      setIsLoggedIn(true);
      // Navigate to appropriate portal based on user type
      if (type === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('portal');
      }
    } else {
      setCurrentPage(page);
    }
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'services':
        return <ServicesPage />;
      case 'taxmate':
        return <TaxMateAI />;
      case 'knowledge':
        return <KnowledgePortal />;
      case 'calculators':
        return <CalculatorsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigation} />;
      case 'portal':
        return <ClientPortal onNavigate={handleNavigation} onLogout={handleLogout} />;
      case 'admin':
        return <AdminPortal onNavigate={handleNavigation} onLogout={handleLogout} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-[#628ca2]/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(98, 140, 162, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(98, 140, 162, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-[#628ca2]/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              className="cursor-pointer"
              onClick={() => handleNavigation('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.h1 
                className="text-2xl font-light tracking-[0.3em]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                SAHNI & CO.
              </motion.h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as Page)}
                  className={`relative py-3 text-sm font-light tracking-widest transition-all duration-500 ${
                    currentPage === item.id ? 'text-[#628ca2]' : 'text-white hover:text-[#628ca2]'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-[#628ca2]"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-[#628ca2]/5 -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </nav>

            <motion.div 
              className="hidden lg:flex"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-white/60 text-sm">
                    Welcome, {userType === 'admin' ? 'Admin' : 'Client'}
                  </span>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-500/40 text-red-400 bg-transparent hover:bg-red-500 hover:text-white transition-all duration-500 px-6 py-2 font-light tracking-wider"
                  >
                    LOGOUT
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => handleNavigation('login')}
                  variant="outline"
                  className="border-[#628ca2]/40 text-[#628ca2] bg-transparent hover:bg-[#628ca2] hover:text-white hover:border-[#628ca2] transition-all duration-500 px-8 py-2 font-light tracking-wider"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    LOGIN
                  </motion.span>
                </Button>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-3"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-[#628ca2]/10 bg-black/98 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-8 py-8 space-y-6">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavigation(item.id as Page)}
                    className={`block w-full text-left py-4 text-lg font-light tracking-wider transition-all duration-300 ${
                      currentPage === item.id ? 'text-[#628ca2]' : 'text-white hover:text-[#628ca2]'
                    }`}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.1 }}
                >
                  {isLoggedIn ? (
                    <div className="mt-6 space-y-4">
                      <div className="text-center text-white/60 text-sm">
                        Welcome, {userType === 'admin' ? 'Admin' : 'Client'}
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-red-500/40 text-red-400 bg-transparent hover:bg-red-500 hover:text-white transition-all duration-500 py-4 font-light tracking-wider"
                      >
                        LOGOUT
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleNavigation('login')}
                      variant="outline"
                      className="w-full border-[#628ca2]/40 text-[#628ca2] bg-transparent hover:bg-[#628ca2] hover:text-white transition-all duration-500 py-4 mt-6 font-light tracking-wider"
                    >
                      LOGIN
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}

      {/* Footer */}
      <footer className="relative border-t border-[#628ca2]/10 bg-black/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-light tracking-[0.3em] mb-6">SAHNI & CO.</h3>
              <p className="text-white/60 text-lg leading-relaxed max-w-md font-light">
                Professional chartered accountancy services with modern technology solutions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg mb-8 font-light tracking-widest">SERVICES</h4>
              <ul className="space-y-4 text-white/60 font-light">
                {['Taxation Services', 'Audit & Assurance', 'Financial Advisory', 'Compliance Services'].map((service, index) => (
                  <motion.li 
                    key={service}
                    className="hover:text-[#628ca2] transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg mb-8 font-light tracking-widest">RESOURCES</h4>
              <ul className="space-y-4 text-white/60 font-light">
                {[
                  { name: 'Knowledge Portal', page: 'knowledge' },
                  { name: 'Tax Calculators', page: 'calculators' },
                  { name: 'TaxMate AI', page: 'taxmate' },
                  { name: 'Client Portal', page: 'login' }
                ].map((resource, index) => (
                  <motion.li 
                    key={resource.name}
                    className="hover:text-[#628ca2] transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleNavigation(resource.page as Page)}
                  >
                    {resource.name}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-[#628ca2]/10 mt-16 pt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-white/40 font-light tracking-widest text-sm">
                &copy; 2026 SAHNI & CO. ALL RIGHTS RESERVED.
              </p>
              <div className="flex space-x-6 text-white/40 text-sm">
                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="hover:text-[#628ca2] transition-colors duration-300"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNavigation('contact')}
                  className="hover:text-[#628ca2] transition-colors duration-300"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}