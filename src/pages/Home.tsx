import React, { useState, useEffect } from 'react';
import { ArrowRight, TrendingUp, CheckCircle, DollarSign, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoanApplicationModal from '../components/LoanApplicationModal';
import Loading from '../components/Loading';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    hero: false,
    features: false,
  });
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const backgroundImages = ["/14.svg", "/2.svg", "/15.svg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [
        ...backgroundImages,
        "/9.svg"
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
        setImagesLoaded({ hero: true, features: true });
        setAllImagesLoaded(true);
      } catch (error) {
        console.warn('Some images failed to load:', error);
        setAllImagesLoaded(true); // Still proceed to show content
      }
    };

    preloadImages();
  }, []);

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-white" />,
      title: "Speed",
      description: "At Coolmonie, we understand that time is of the essence, Experience banking that keeps pace with your life."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-white" />,
      title: "Transparent pricing",
      description: "We believe in honesty and clarity. This means there are no hidden fees or unexpected charges, just straightforward terms that empower you to make informed financial decisions."
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Superior Customer Service",
      description: "Your satisfaction is our priority. Our dedicated team is committed to providing exceptional customer service, ensuring that your banking experience is smooth and enjoyable."
    }
  ];

  const services = [
    {
      title: "Working Capital",
      description: "Flexible short-term loans to support daily business operations",
      features: ["Quick Approval Process", "No Hidden Fee", "Competitive Interest Rates"]
    },
    {
      title: "Salary advance",
      description: "Get your salary before payday, anytime you need it",
      features: ["Quick Disbursement", "Competitive Interest Rates", "No Hidden Fee"]
    },
    {
      title: "Asset Loan",
      description: "Finance vehicles, equipment, or tools to grow your business faster",
      features: ["Asset Ownership", "Quick Approval and Disbursement", "Competitive Interest Rates"]
    }
  ];

  const stats = [
    { label: "Active Customers", value: "10,000+" },
    { label: "Loans Disbursed", value: "₦2.5B+" },
    { label: "Success Rate", value: "98%" },
    { label: "Years of Service", value: "15+" }
  ];

  if (!allImagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="text-center space-y-4">
          <Loading type="spinner" size="lg" text="Loading Coolmonie..." />
          <p className="text-gray-600 max-w-md mx-auto">
            Preparing your financial journey with Nigeria's trusted microfinance institution
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Coolmonie Microfinance Institution - Supporting Dreams in Nigeria</title>
        <meta name="description" content="Coolmonie is Nigeria's trusted microfinance institution offering working capital, salary advance, and asset loans. Quick approval, competitive rates, and exceptional customer service for small businesses and individuals." />
        <meta name="keywords" content="microfinance Nigeria, small business loans, salary advance, asset financing, working capital, quick loans, competitive interest rates, financial inclusion" />
        <meta name="author" content="Coolmonie Microfinance Institution" />
        <meta property="og:title" content="Coolmonie Microfinance Institution - Supporting Dreams in Nigeria" />
        <meta property="og:description" content="Access tailored financial solutions that promote business growth and improve quality of life. Join 10,000+ customers who trust Coolmonie for their financial needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.coolmonie.ng" />
        <meta property="og:image" content="https://www.coolmonie.ng/14.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Coolmonie Microfinance Institution - Supporting Dreams" />
        <meta name="twitter:description" content="Nigeria's trusted microfinance institution offering quick loans, competitive rates, and exceptional service." />
        <meta name="twitter:image" content="https://www.coolmonie.ng/14.svg" />
        <link rel="canonical" href="https://www.coolmonie.ng" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-800 via-indigo-900 to-sky-950 text-white overflow-hidden min-h-screen flex items-center">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-30" : "opacity-0"
                }`}
              style={{
                backgroundImage: imagesLoaded.hero ? `url(${image})` : 'none',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {!imagesLoaded.hero && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loading type="pulse" size="md" text="Loading background..." />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* indigo/indigo Transparent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/1 via-indigo-900/0 to-sky-900/10 z-1"></div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                ? "bg-white shadow-md"
                : "bg-white/50 hover:bg-white/75"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 z-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Supporting dreams
              <span className="block bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                with Coolmonie Microfinance Institution, you can...
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Access solutions designed to grow your business and secure your financial future.
              Join people who trust Coolmonie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="overflow-hidden bg-white text-indigo-900 px-8 py-4 rounded-lg 
                        font-semibold transition-all duration-300 shadow-lg hover:shadow-xl 
                        transform hover:-translate-y-1 flex items-center justify-center active:scale-95 group
                        before:absolute before:inset-0 before:bg-indigo-50 
                        before:scale-0 before:rounded-full before:transition-transform 
                        before:duration-300 hover:before:scale-100"
                onClick={() => setShowModal(true)}
                aria-label="Apply for loan - Get started with Coolmonie"
              >
                <span className="relative z-10 transition-colors duration-200">
                  Get Started Today
                </span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 
                                    group-hover:translate-x-1" />
              </button>
              <Link
                to="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-900 transition-all duration-300 flex items-center justify-center"
                aria-label="Explore our financial services"
              >
                <span className="relative z-10 transition-colors duration-200">
                  Explore Services
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: imagesLoaded.features ? 'url("/9.svg")' : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {!imagesLoaded.features && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading type="skeleton" size="lg" text="Loading features..." />
            </div>
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Coolmonie?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine traditional banking values with modern technology to provide
              exceptional financial services that help you achieve your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-white animate-fade-in-up"
                style={{
                  background: "linear-gradient(to bottom right, #6A67D1, #4B48A1)",
                  animationDelay: `${index * 0.15}s`,
                  ['--index' as string]: index,
                }}
              >
                <div className="text-sky-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sky-50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Modal */}
      {showModal && (
        <LoanApplicationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Home;