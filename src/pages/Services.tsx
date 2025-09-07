import React, { useState, useEffect } from 'react';
import { HandCoins, Wallet, Truck, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LoanCalculator } from "../components/LoanCalculator";
import LoanApplicationModal from '../components/LoanApplicationModal';
import Loading from '../components/Loading';

const Services = () => {
  const [showModal, setShowModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    hero: false,
    benefits: false,
  });
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [
        "/7.svg",
        "/8.svg"
      ];

      const imagePromises = imagesToLoad.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => reject(src);
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded({ 
          hero: true, 
          benefits: true 
        });
        setAllImagesLoaded(true);
      } catch (error) {
        console.warn('Some images failed to load:', error);
        setAllImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const services = [
    {
      icon: <HandCoins className="h-12 w-12" />,
      title: "Working Capital",
      description: "Flexible short-term loans to support small businesses",
      features: [
        "Quick Approval Process",
        "No Hidden Fee",
        "Competitive Interest Rates"
      ],
    },
    {
      icon: <Wallet className="h-12 w-12" />,
      title: "Salary Advance",
      description: "Get your 2-month salary in advance and pay over 6 months",
      features: [
        "Quick Disbursement",
        "Competitive Interest Rates",
        "No Hidden Fee"
      ],
    },
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Asset Loan",
      description: "Business vehicles, equipment or tools to grow your business faster",
      features: [
        "Asset Ownership",
        "Quick Approval and Disbursement",
        "Competitive Interest Rates"
      ],
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Application",
      description: "Submit your application online or visit our branch",
      icon: <Users className="h-8 w-8" />
    },
    {
      step: "2",
      title: "Documentation",
      description: "Provide required documents for verification",
      icon: <CheckCircle className="h-8 w-8" />
    },
    {
      step: "3",
      title: "Assessment",
      description: "Our team reviews and assesses your application",
      icon: <Clock className="h-8 w-8" />
    },
    {
      step: "4",
      title: "Approval and Disbursement",
      description: "Get disbursement through the account details provided and access your funds quickly",
      icon: <ArrowRight className="h-8 w-8" />
    }
  ];

  const benefits = [
    "Competitive rates and flexible terms",
    "Fast approval and disbursement",
    "Personalized customer service",
    "Financial literacy support",
    "Community development focus"
  ];

  if (!allImagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="text-center space-y-4">
          <Loading type="spinner" size="lg" text="Loading Services..." />
          <p className="text-gray-600 max-w-md mx-auto">
            Preparing comprehensive financial solutions tailored for your business growth
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Financial Services - Working Capital, Salary Advance & Asset Loans | Coolmonie</title>
        <meta name="description" content="Explore Coolmonie's comprehensive financial services: Working Capital loans for businesses, Salary Advance for employees, and Asset Loans for equipment financing. Quick approval, competitive rates, no hidden fees." />
        <meta name="keywords" content="working capital loans Nigeria, salary advance loans, asset financing, business equipment loans, microfinance services, quick loan approval, competitive interest rates" />
        <meta name="author" content="Coolmonie Microfinance Institution" />
        <meta property="og:title" content="Financial Services - Loans & Advances | Coolmonie Microfinance" />
        <meta property="og:description" content="Get working capital, salary advances, and asset loans with quick approval and competitive rates. Use our loan calculator to plan your financing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://coolmonie.com/services" />
        <meta property="og:image" content="https://coolmonie.com/7.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Services - Loans & Advances | Coolmonie" />
        <meta name="twitter:description" content="Working capital, salary advance, and asset loans with quick approval and competitive rates." />
        <meta name="twitter:image" content="https://coolmonie.com/7.svg" />
        <link rel="canonical" href="https://coolmonie.com/services" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: imagesLoaded.hero ? 'url("/7.svg")' : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {!imagesLoaded.hero && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading type="pulse" size="md" text="Loading hero image..." />
            </div>
          )}
        </div>
        <div className="absolute inset-0 [background:linear-gradient(to_bottom_right,_rgba(130,127,255,0.8),_rgba(107,104,224,0.8))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Our Financial Services
            </h1>
            <p className="text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Comprehensive financial solutions designed to help you achieve your 
              personal and business goals with confidence and convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Complete Financial Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From micro loans to investment services, we offer a full range of 
              financial products tailored to meet your unique needs.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  services.length === 3 && index === 2 ? 'lg:col-span-2 lg:mx-auto' : ''
                  }`}
                 style={{
                  animationDelay: `${index * 0.15}s`,
                  ['--index' as string]: index,
                }}
              >
                <div className="flex items-start space-x-6 animate-fade-in-up">
                  <div className="text-white bg-gradient-to-br from-indigo-800 to-indigo-800 p-3 rounded-lg shadow-lg flex-shrink-0" style={{
                  animationDelay: `${index * 0.15}s`,
                  ['--index' as string]: index,
                }}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Calculator Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Loan Calculator
            </h2>
            <p className="text-xl text-gray-600">
              Calculate your monthly payments and see how much you can borrow.
            </p>
          </div>

          <LoanCalculator />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-indigo-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Services?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                At Coolmonie, we're committed to providing exceptional value 
                through innovative products, competitive pricing, and outstanding service.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="relative">
                {imagesLoaded.benefits ? (
                  <img
                    src="/8.svg"
                    alt="Financial services and benefits illustration"
                    className="rounded-xl shadow-lg w-full h-96 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="rounded-xl shadow-lg w-full h-96 bg-gray-200 flex items-center justify-center">
                    <Loading type="skeleton" size="lg" text="Loading benefits image..." />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with Coolmonie is easy. Follow these simple steps 
              to access our financial services.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="bg-gradient-to-r from-indigo-800 to-indigo-800 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="text-indigo-800 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r text-white relative overflow-hidden" style={{
                  background: "linear-gradient(to bottom right, #6A67D1, #4B48A1)",
                }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 relative z-10">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto relative z-10">
            Choose the service that's right for you and take the first step 
            toward achieving your financial goals.
          </p>
          <div className="space-x-4 relative z-10">
            <button
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
                  aria-label="Apply for loans with Coolmonie"
                >
                  Apply for Loans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
            <Link
              to="/contact#contact-form"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-900 transition-all duration-300 inline-flex items-center justify-center"
              aria-label="Speak with a financial expert"
            >
              Speak with an Expert
            </Link>
          </div>
        </div>
      </section>
      {/* Loan Modal */}
            <LoanApplicationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Services;