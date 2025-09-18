import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import LoanApplicationModal from '../components/LoanApplicationModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Career', href: '/career' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ✅ Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "Coolmonie Microfinance Institution",
            url: "https://www.coolmonie.ng",
            logo: "https://www.coolmonie.ng/coolmonielogo.svg",
            description:
              "Coolmonie is Nigeria's trusted microfinance institution offering loans, salary advances, and asset financing.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Adeoni Estate Street",
              addressLocality: "Lagos",
              addressRegion: "LA",
              postalCode: "112107",
              addressCountry: "NG",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+234-704-910-5291",
              contactType: "Customer Service",
            },
          }),
        }}
      />

      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <img 
                  src="coolmonielogo.svg" 
                  alt="Coolmonie Logo" 
                  className="h-20 w-50 object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-indigo-900'
                      : 'text-gray-700 hover:text-indigo-900'
                  }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-800 to-indigo-900 rounded-full" />
                  )}
                </Link>
              ))}
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-900 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Apply for Loans
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-indigo-900 transition-colors duration-200"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation with animation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="md:hidden overflow-hidden"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className="block px-3 py-2 text-base font-medium rounded-lg
                                   transition-all duration-200 transform hover:scale-105
                                   hover:bg-indigo-50 hover:text-indigo-900"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Loan Modal */}
      <LoanApplicationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Navbar;
