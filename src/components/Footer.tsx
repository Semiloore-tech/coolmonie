import React from 'react';
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      className="text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, #2D2A87, #1A1971, #04014E)",
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2 relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <Link to="/">
                <img 
                  src="coolmoniefooter.svg" 
                  alt="Coolmonie" 
                  className="h-20 w-30 object-contain"
                />
                  {/* <span className="text-2xl font-bold">MFI LTD</span> */}
              </Link>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Supporting businesses through personalized microfinance solutions and empowerment for small businesses to grow and thrive.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61554264450454" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://x.com/CoolMonieMFI" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200">
                <X className="h-6 w-6" />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a> */}
              <a href="https://www.instagram.com/coolmoniemfi/" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="relative z-10">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="relative z-10">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-300" />
                <span className="text-gray-300">+234 813 400 1380</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-300" />
                <span className="text-gray-300">+234 704 910 5291</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-300" />
                <span className="text-gray-300">info@coolmonie.ng</span>
              </div>
              {/* <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-300 mt-0.5" />
                <span className="text-gray-300">
                  123 Financial District<br />
                  Lagos, Nigeria
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center relative z-10">
          <p className="text-gray-400 text-sm">
            © 2025 Coolmonie. All rights reserved.
          </p>
          {/* <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Cookie Policy
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;