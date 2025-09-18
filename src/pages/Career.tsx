import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import Loading from '../components/Loading';

const Career = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    resumeLink: '',
    coverLetter: ''
  });

  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({
    hero: false,
  });
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [
        "/16.svg"
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
          hero: true
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      position: '',
      resumeLink: '',
      coverLetter: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidUrl = (url: string) =>
      url.startsWith('http://') || url.startsWith('https://');

    if (!isValidUrl(formData.resumeLink)) {
      alert('Invalid or missing Resume URL');
      return;
    }

    if (formData.coverLetter && !isValidUrl(formData.coverLetter)) {
      alert('Cover letter link is not valid');
      return;
    }

    const templateParams = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      resume_link: formData.resumeLink,
      cover_letter: formData.coverLetter || 'N/A'
    };

    setIsSubmitting(true);
    setIsSent(false);
    setIsError(false);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_IDI!,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );
      setIsSent(true);
      alert("Application submitted successfully. We'll be in touch shortly.");
      resetForm();
    } catch (error) {
      console.error('Submission failed', error);
      setIsError(true);
      alert('There was a problem submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!allImagesLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100">
        <div className="text-center space-y-4">
          <Loading type="spinner" size="lg" text="Loading Career Opportunities..." />
          <p className="text-gray-600 max-w-md mx-auto">
            Discovering exciting career opportunities at Nigeria's trusted microfinance institution
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Careers at Coolmonie - Join Nigeria's Leading Microfinance Team</title>
        <meta name="description" content="Join Coolmonie's growing team of financial professionals. We're looking for talented individuals passionate about financial inclusion and helping small businesses grow. Apply now for exciting career opportunities." />
        <meta name="keywords" content="careers Coolmonie, jobs microfinance Nigeria, financial services careers, banking jobs Nigeria, microfinance employment opportunities, finance career Nigeria" />
        <meta name="author" content="Coolmonie Microfinance Institution" />
        <meta property="og:title" content="Careers at Coolmonie - Join Nigeria's Leading Microfinance Team" />
        <meta property="og:description" content="Discover exciting career opportunities at Coolmonie. Join our mission to promote financial inclusion and support small businesses across Nigeria." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://coolmonie.ng/career" />
        <meta property="og:image" content="https://coolmonie.ng/16.svg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Careers at Coolmonie - Join Our Team" />
        <meta name="twitter:description" content="Apply for exciting career opportunities at Nigeria's trusted microfinance institution." />
        <meta name="twitter:image" content="https://coolmonie.ng/16.svg" />
        <link rel="canonical" href="https://coolmonie.ng/career" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Coolmonie Microfinance Institution"
            },
            "title": "Various Positions Available",
            "description": "Join Coolmonie's team of financial professionals dedicated to promoting financial inclusion in Nigeria.",
            "employmentType": "FULL_TIME",
            "jobLocation": {
              "@type": "Place",
              "address": "Nigeria"
            }
          })}
        </script>
      </Helmet>

      <section className="bg-gradient-to-br text-white py-20 relative overflow-hidden" style={{
        backgroundImage: imagesLoaded.hero ? 'url("/16.svg")' : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 opacity-20">
          {!imagesLoaded.hero && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loading type="pulse" size="md" text="Loading hero image..." />
            </div>
          )}
        </div>
        <div className="absolute inset-0 [background:linear-gradient(to_bottom_right,_rgba(130,127,255,0.8),_rgba(107,104,224,0.8))]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl lg:text-2xl text-indigo-100">We're always on the lookout for talented individuals. Submit your resume and we'll be in touch!</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Career Application Form</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Applied For *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  placeholder="Enter the role you're applying for"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link *</label>
              <input
                type="url"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                required
                placeholder="Paste your resume link (Drive/Dropbox)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter Link (optional)</label>
              <input
                type="url"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Paste your cover letter link (Drive/Dropbox)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-indigo-800 to-indigo-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                aria-label="Submit career application to Coolmonie"
              >
                {isSubmitting ? 'Submitting...' : (
                  <>
                    Submit Application <Send className="h-5 w-5 ml-2" />
                  </>
                )}
              </button>
            </div>

            {isSent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-green-600 flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Application sent successfully!</span>
                </div>
                <p className="text-green-600 text-sm mt-1">We'll get back to you within 24 hours.</p>
              </div>
            )}

            {isError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-600 flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Failed to send application</span>
                </div>
                <p className="text-red-600 text-sm mt-1">Please try again or contact us directly.</p>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Career;