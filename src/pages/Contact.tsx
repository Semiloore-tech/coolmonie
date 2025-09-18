import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin, Phone, Mail, Clock, Send, MessageSquare, User,
  Building2, CheckCircle
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import emailjs from "@emailjs/browser";
import Loading from '../components/Loading';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    contact: false,
    faq: false,
  });
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [
        "10.svg",
        "6.svg"
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
          contact: true,
          faq: true
        });
        setAllImagesLoaded(true);
      } catch (error) {
        console.warn('Some images failed to load:', error);
        setAllImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear previous states when user starts typing
    if (isSent) setIsSent(false);
    if (isError) setIsError(false);
  };

  useEffect(() => {
    // Initialize EmailJS once when the component mounts
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) {
      setIsError(true);
      return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setIsSent(false);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        formRef.current
      );

      console.log("Email sent successfully");
      setIsSent(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error("Email send failed", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Call Us",
      details: [
        "+234 802 386 7498",
        "+234 704 910 5291",
      ]
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Us",
      details: [
        "info@coolmonie.ng",
      ]
    },
  ];

  const branches = [
    {
      name: "Victoria Island Branch",
      address: "123 Financial District, Victoria Island, Lagos",
      phone: "+234 801 234 5678",
      manager: "Mrs. Adunni Olapade"
    },
    {
      name: "Ikeja Branch",
      address: "45 Allen Avenue, Ikeja, Lagos",
      phone: "+234 802 345 6789",
      manager: "Mr. Chukwuma Okafor"
    },
    {
      name: "Abuja Branch",
      address: "78 Central Business District, Abuja",
      phone: "+234 803 456 7890",
      manager: "Dr. Fatima Hassan"
    },
    {
      name: "Port Harcourt Branch",
      address: "56 Trans Amadi Road, Port Harcourt",
      phone: "+234 804 567 8901",
      manager: "Mr. David Williams"
    }
  ];

  const faqs = [
    {
      question: "What documents do I need to apply for a loan?",
      answer: "You'll need valid identification, proof of income, bank statements, and for business loans, business registration documents."
    },
    {
      question: "How long does loan approval take?",
      answer: "Most loan applications are processed within 24-48 hours."
    },
    {
      question: "Can I repay my loan early?",
      answer: "Yes, you can make early repayments if you want."
    },
    {
      question: "Can I access my account or services online?",
      answer: "We're currently working on launching our digital platform. In the meantime, our team is available to assist you via phone, email, or in person at our office."
    }
  ];

  if (!allImagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="text-center space-y-4">
          <Loading type="spinner" size="lg" text="Loading Contact..." />
          <p className="text-gray-600 max-w-md mx-auto">
            Preparing ways to connect with Coolmonie's expert team for all your financial needs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Contact Coolmonie - Get Expert Financial Advice & Support</title>
        <meta name="description" content="Contact Coolmonie Microfinance Institution for expert financial advice and support. Call +234 802 386 7498, email info@coolmonie.ng, or use our contact form. Quick response within 24 hours guaranteed." />
        <meta name="keywords" content="contact Coolmonie, microfinance Nigeria contact, financial advisor contact, loan inquiry Nigeria, customer support microfinance, Coolmonie phone number email" />
        <meta name="author" content="Coolmonie Microfinance Institution" />
        <meta property="og:title" content="Contact Coolmonie - Expert Financial Support & Advice" />
        <meta property="og:description" content="Get in touch with Coolmonie's expert team for personalized financial solutions. Quick response guaranteed within 24 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.coolmonie.ng/contact" />
        <meta property="og:image" content="https://www.coolmonie.ng/10.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Coolmonie - Expert Financial Support" />
        <meta name="twitter:description" content="Contact Nigeria's trusted microfinance institution for expert financial advice and support." />
        <meta name="twitter:image" content="https://www.coolmonie.ng/10.svg" />
        <link rel="canonical" href="https://www.coolmonie.ng/contact" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": "Coolmonie Microfinance Institution",
            "telephone": "+234 802 386 7498",
            "email": "info@coolmonie.ng",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+234 802 386 7498",
              "contactType": "customer service",
              "availableLanguage": "English"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 [background:linear-gradient(to_bottom_right,_rgba(130,127,255,0.8),_rgba(107,104,224,0.8))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl lg:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              We're here to help you with all your financial needs.
              Contact us today to speak with our expert team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 relative overflow-hidden" >
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: imagesLoaded.contact ? 'url("10.svg")' : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {!imagesLoaded.contact && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading type="skeleton" size="sm" text="" />
            </div>
          )}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us - choose what's most convenient for you.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gradient-to-br p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center group text-white animate-fade-in-up w-full max-w-sm mx-auto"
                style={{
                  background: "linear-gradient(to bottom right, #6A67D1, #4B48A1)",
                  animationDelay: `${index * 0.15}s`,
                  ['--index' as string]: index,
                }}
              >
                <div className="text-indigo-100 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-indigo-50">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="scroll-mt-28 py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Have a question or need assistance? Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-indigo-800 to-indigo-800 p-3 rounded-lg shadow-lg">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Quick Response</h3>
                    <p className="text-gray-600">We respond to all inquiries within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-br from-indigo-800 to-indigo-800 p-3 rounded-lg shadow-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Personal Service</h3>
                    <p className="text-gray-600">Dedicated account managers for all clients</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-indigo-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 transition-colors duration-200 disabled:opacity-50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 transition-colors duration-200 disabled:opacity-50"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 transition-colors duration-200 disabled:opacity-50"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 transition-colors duration-200 disabled:opacity-50"
                    >
                      <option value="">Select a subject</option>
                      <option value="loan-inquiry">Loan Inquiry</option>
                      <option value="investment">Investment Services</option>
                      <option value="complaint">Complaint</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-700 focus:border-indigo-700 transition-colors duration-200 resize-none disabled:opacity-50"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-800 to-indigo-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  aria-label="Send message to Coolmonie"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-5 w-5" />
                </button>

                {/* Feedback Messages */}
                {isSent && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-green-600 flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Message sent successfully!</span>
                    </div>
                    <p className="text-green-600 text-sm mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}
                {isError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-600 flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-medium">Failed to send message</span>
                    </div>
                    <p className="text-red-600 text-sm mt-1">
                      Please try again or contact us directly.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: imagesLoaded.faq ? 'url("6.svg")' : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {!imagesLoaded.faq && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading type="skeleton" size="sm" text="" />
            </div>
          )}
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get instant answers to the most common questions about our financial services and application process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-indigo-100"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-indigo-800 to-indigo-800 p-2 rounded-lg shadow-lg flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-indigo-800 to-indigo-800 p-8 rounded-xl shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-indigo-100 mb-6">
                Our customer support team is available to help you with any inquiries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+2348023867498"
                  className="bg-white text-indigo-800 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  aria-label="Call Coolmonie customer support"
                >
                  Call Us Now
                </a>
                <a
                  href="#contact-form"
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  aria-label="Send email to Coolmonie"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;