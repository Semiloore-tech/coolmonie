import React, { useState, useEffect } from 'react';
import { Award, Users, Target, Heart, TrendingUp, Shield, Globe, CheckCircle, Lightbulb, Handshake, Zap, HeadphonesIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import LoanApplicationModal from '../components/LoanApplicationModal';
import Loading from '../components/Loading';

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    hero: false,
    mission: false,
    values: false,
    team: false,
  });
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [
        "4.svg",
        "/5.svg",
        "/11.svg",
        "/12.svg"
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
          mission: true, 
          values: true, 
          team: true 
        });
        setAllImagesLoaded(true);
      } catch (error) {
        console.warn('Some images failed to load:', error);
        setAllImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const values = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Teamwork",
      description: "We believe in the power of collaboration and working together to achieve exceptional results for our customers."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Integrity",
      description: "We operate with transparency and honesty, building lasting relationships based on mutual trust and ethical practices."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion",
      description: "We are passionate about empowering our customers and making a positive impact in their financial journey."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We continuously evolve our services and technology to provide cutting-edge financial solutions."
    },
    {
      icon: <HeadphonesIcon className="h-8 w-8" />,
      title: "Customer Service",
      description: "We are committed to providing exceptional customer service and ensuring customer satisfaction at every touchpoint."
    }
  ];

  const milestones = [
    {
      year: "2010",
      title: "Founded",
      description: "Coolmonie was established with a mission to provide accessible microfinance solutions."
    },
    {
      year: "2015",
      title: "5,000 Customers",
      description: "Reached our first major milestone of serving 5,000 customers across Nigeria."
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Launched our digital banking platform, making services more accessible than ever."
    },
    {
      year: "2025",
      title: "10,000+ Customers",
      description: "Proudly serving over 10,000 customers with ₦2.5B+ in loans disbursed."
    }
  ];

  const achievements = [
    "Licensed by Central Bank of Nigeria",
    "Member of Nigeria Deposit Insurance Corporation (NDIC)",
    "ISO 27001 Certified for Information Security",
    "Best Microfinance Bank Award 2023",
    "Excellence in Customer Service Award",
    "Financial Inclusion Champion 2024"
  ];

  if (!allImagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="text-center space-y-4">
          <Loading type="spinner" size="lg" text="Loading About Coolmonie..." />
          <p className="text-gray-600 max-w-md mx-auto">
            Discovering our mission, vision, and values that drive financial inclusion in Nigeria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Coolmonie - Nigeria's Trusted Microfinance Institution</title>
        <meta name="description" content="Learn about Coolmonie's mission to support small businesses and low-income earners through accessible microfinance solutions. Discover our values, team, and commitment to financial inclusion in Nigeria." />
        <meta name="keywords" content="about Coolmonie, microfinance Nigeria, mission vision values, financial inclusion, small business support, microfinance institution history" />
        <meta name="author" content="Coolmonie Microfinance Institution" />
        <meta property="og:title" content="About Coolmonie - Nigeria's Trusted Microfinance Institution" />
        <meta property="og:description" content="Discover Coolmonie's journey as a microfinance institution dedicated to supporting small businesses and promoting financial inclusion across Nigeria." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://coolmonie.com/about" />
        <meta property="og:image" content="https://coolmonie.com/5.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Coolmonie - Nigeria's Trusted Microfinance Institution" />
        <meta name="twitter:description" content="Learn about our mission, values, and commitment to financial inclusion in Nigeria." />
        <meta name="twitter:image" content="https://coolmonie.com/5.svg" />
        <link rel="canonical" href="https://coolmonie.com/about" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: imagesLoaded.hero ? 'url("4.svg")' : 'none',
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
              About Us.
            </h1>
            <p className="text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Coolmonie is a microfinance institution established to support small businesses and low income earners through credits and financial literacy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                Our Mission & Vision
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-3 rounded-lg shadow-lg">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To be a trusted financial partner for small businesses and low income earners, empowering them with appropriate microfinance solutions that foster business growth and improve quality of life.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-3 rounded-lg shadow-lg">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Vision</h3>
                    <p className="text-gray-600 leading-relaxed">
                      To provide tailored financial solutions that promote financial inclusion and support small businesses in a manner that delivers values to the customers and stakeholders.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-first">
              <div className="relative">
                {imagesLoaded.mission ? (
                  <img
                    src="/5.svg"
                    alt="Team collaboration representing our mission and vision"
                    className="rounded-xl shadow-lg w-full h-96 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="rounded-xl shadow-lg w-full h-96 bg-gray-200 flex items-center justify-center">
                    <Loading type="skeleton" size="lg" text="Loading mission image..." />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: imagesLoaded.values ? 'url("/11.svg")' : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {!imagesLoaded.values && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading type="skeleton" size="sm" text="" />
            </div>
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide our decisions and shape our culture, 
              ensuring we always act in the best interests of our customers and communities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br p-6 rounded-xl shadow-lg hover:shadow-xl 
                          transition-all duration-300 transform hover:-translate-y-2 
                          text-center group text-white animate-fade-in-up"
                style={{
                  background: "linear-gradient(to bottom right, #6A67D1, #4B48A1)",
                  animationDelay: `${index * 0.15}s`,
                  ['--index' as string]: index,
                }}
              >
                <div className="text-indigo-100 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-indigo-50 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Trust Our Team */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-indigo-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Why You Should Trust Our Team
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Our experienced team combines expertise in finance, technology, 
                and customer service. We are committed to your financial success and have 
                the credentials to back it up.
              </p>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div> */}
            </div>
            <div>
              <img
                src="/12.svg"
                alt="Professional team"
                className="rounded-xl shadow-lg w-full h-96 object-cover"
              />
            </div>
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
            Join Our Growing Family
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto relative z-10">
            Become part of our success story. Experience the difference that personalized 
            service and innovative solutions can make in your financial journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button
                onClick={() => setShowModal(true)}
                className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Today
            </button>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-900 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
      {/* Loan Modal */}
            <LoanApplicationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default About;