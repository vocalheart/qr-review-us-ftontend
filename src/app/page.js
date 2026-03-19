"use client";
import { useState } from "react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);

  // Icon Components
  const Icons = {
    QR: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    Star: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ),
    Filter: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    ),
    Check: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    ),
    Lock: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    Link: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    Bell: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    Building: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    PhoneCall: () => (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
      </svg>
    ),
    ChevronDown: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    ),
  };

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Background Blobs */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto z-10 py-8 sm:py-12 lg:py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 sm:mb-8 px-4 sm:px-6 py-2 sm:py-3 text-white bg-white bg-opacity-20 backdrop-blur-sm rounded-full font-semibold text-xs sm:text-sm">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
            </svg>
            <span className="text-black">Smart Review Collection System</span>
          </div>

          {/* Headline */}
          <h1 className="font-bold mb-4 sm:mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white" style={{fontSize:'clamp(1.75rem, 6vw, 3.5rem)', lineHeight: '1.2'}}>
            Boost Your Google Rating & Filter Negative Reviews
          </h1>

          {/* Subheading */}
          <p className="text-indigo-100 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-10 px-2" style={{fontSize:'clamp(0.9rem, 2.5vw, 1.1rem)'}}>
            Only positive reviews reach Google. Negative feedback stays private. Smart QR-based review filtering for restaurants, shops, clinics & local businesses.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-8 sm:mt-10">
            <a
              href="#how-it-works"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-yellow-400 text-indigo-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-all w-full sm:w-auto text-center transform hover:scale-105 text-sm sm:text-base"
            >
              See How It Works
            </a>
            <a
              href="tel:7554045078"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto text-center text-sm sm:text-base"
            >
              Try Demo Call
            </a>
          </div>

          {/* Trust Badges */}
          <div className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm px-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Setup in 5 Min</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { stat: "95%", label: "Positive Reviews", Icon: Icons.Check, bgColor: "bg-yellow-100", textColor: "text-yellow-600" },
              { stat: "4.8★", label: "Average Rating", Icon: Icons.Star, bgColor: "bg-green-100", textColor: "text-green-600" },
              { stat: "300%", label: "More 5-Stars", Icon: Icons.Check, bgColor: "bg-blue-100", textColor: "text-blue-600" },
              { stat: "100%", label: "Filtered Negatives", Icon: Icons.Filter, bgColor: "bg-purple-100", textColor: "text-purple-600" },
            ].map((item, i) => (
              <div key={i} className="p-4 sm:p-6 hover:transform hover:scale-105 transition-transform text-center">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 ${item.bgColor} rounded-full flex items-center justify-center`}>
                  <div className={item.textColor}>
                    <item.Icon />
                  </div>
                </div>
                <div className="font-bold text-indigo-600 mb-2" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.8rem)'}}>
                  {item.stat}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROBLEM-SOLUTION SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Problem */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 sm:p-8 rounded-lg">
              <h3 className="font-bold text-red-800 mb-4 sm:mb-6 flex items-center gap-2" style={{fontSize:'clamp(1rem, 2vw, 1.2rem)'}}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                Traditional Way Problem
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                  <span>Unhappy customers post 1-2 star reviews directly on Google</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                  <span>Your rating drops publicly & damages reputation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                  <span>No chance to fix issues before damage is done</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                  <span>Happy customers forget to leave reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                  <span>Difficult to manage all feedback effectively</span>
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 sm:p-8 rounded-lg">
              <h3 className="font-bold text-green-800 mb-4 sm:mb-6 flex items-center gap-2" style={{fontSize:'clamp(1rem, 2vw, 1.2rem)'}}>
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Smart System Solution
              </h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-700 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span><strong>4-5 stars?</strong> Auto-redirect to Google (Public)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span><strong>1-3 stars?</strong> Stays private in your dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span>Fix issues before they harm your reputation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span>Easy QR scan encourages positive reviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                  <span>Centralized dashboard for all feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.4rem, 4vw, 2.5rem)'}}>
              How Smart Review Filtering Works
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xs sm:text-sm">
              Simple 4-step process to protect your reputation and boost positive reviews
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { 
                num: "01", 
                title: "Customer Scans QR", 
                desc: "Place QR codes at tables or counter. Customer scans with phone camera.", 
                Icon: Icons.QR,
                bgColor: "bg-indigo-100",
                textColor: "text-indigo-600"
              },
              { 
                num: "02", 
                title: "Rates Experience", 
                desc: "Smart feedback form opens. Customer selects 1-5 star rating.", 
                Icon: Icons.Star,
                bgColor: "bg-yellow-100",
                textColor: "text-yellow-600"
              },
              { 
                num: "03", 
                title: "Smart Filtering", 
                desc: "4-5 stars → Google. 1-3 stars → Private Dashboard.", 
                Icon: Icons.Filter,
                bgColor: "bg-purple-100",
                textColor: "text-purple-600"
              },
              { 
                num: "04", 
                title: "You Take Action", 
                desc: "Monitor dashboard, fix issues privately, boost your rating.", 
                Icon: Icons.Check,
                bgColor: "bg-green-100",
                textColor: "text-green-600"
              },
            ].map((step, i) => (
              <div key={i} className="relative bg-white p-6 sm:p-7 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-indigo-300 transition-all hover:shadow-xl hover:-translate-y-2">
                {/* Number Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg text-xs sm:text-sm">
                  {step.num}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mt-6 sm:mt-8 mb-4 ${step.bgColor} rounded-full flex items-center justify-center`}>
                  <div className={step.textColor}>
                    <step.Icon />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-gray-800 mb-2 sm:mb-3 text-center text-xs sm:text-sm lg:text-base">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center text-xs sm:text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SMART FILTERING VISUAL ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.4rem, 3.5vw, 2rem)'}}>
              Rating-Based Smart Redirection
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">The secret sauce that protects your reputation</p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Positive Path */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-green-300">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-green-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="font-bold text-green-700 text-xs sm:text-sm">4-5 Stars</span>
                </div>
                <h3 className="font-bold text-green-700 text-sm sm:text-base">Happy Customer Path</h3>
              </div>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3 bg-green-50 p-3 sm:p-4 rounded-lg">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">1</div>
                  <p className="text-gray-700">Customer gives 4 or 5 stars</p>
                </div>
                <div className="flex justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex items-center gap-3 bg-green-50 p-3 sm:p-4 rounded-lg">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">2</div>
                  <p className="text-gray-700">Auto-redirects to Google Review page</p>
                </div>
                <div className="flex justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex items-center gap-3 bg-green-100 p-3 sm:p-4 rounded-lg border-2 border-green-400">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-800 font-semibold text-xs sm:text-sm">Review goes PUBLIC on Google!</p>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-800 text-center text-xs sm:text-sm font-medium">
                  <strong>Result:</strong> Your Google rating improves automatically!
                </p>
              </div>
            </div>

            {/* Negative Path */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-orange-300">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 bg-orange-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="font-bold text-orange-700 text-xs sm:text-sm">1-3 Stars</span>
                </div>
                <h3 className="font-bold text-orange-700 text-sm sm:text-base">Unhappy Customer Path</h3>
              </div>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                <div className="flex items-center gap-3 bg-orange-50 p-3 sm:p-4 rounded-lg">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">1</div>
                  <p className="text-gray-700">Customer gives 1, 2, or 3 stars</p>
                </div>
                <div className="flex justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex items-center gap-3 bg-orange-50 p-3 sm:p-4 rounded-lg">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">2</div>
                  <p className="text-gray-700">Feedback saved to private dashboard</p>
                </div>
                <div className="flex justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="flex items-center gap-3 bg-orange-100 p-3 sm:p-4 rounded-lg border-2 border-orange-400">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <p className="text-gray-800 font-semibold text-xs sm:text-sm">Review stays PRIVATE!</p>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-orange-800 text-center text-xs sm:text-sm font-medium">
                  <strong>Result:</strong> You can fix the issue privately. Reputation protected!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.4rem, 4vw, 2.5rem)'}}>
              Complete Review Management
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-xs sm:text-sm">
              Everything you need to collect, filter, and manage customer feedback effectively
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: "Smart QR Generator", desc: "Create unlimited QR codes. Print anywhere.", Icon: Icons.QR, bgColor: "bg-blue-100", textColor: "text-blue-600" },
              { title: "Intelligent Filter", desc: "Auto-route positive reviews to Google.", Icon: Icons.Filter, bgColor: "bg-green-100", textColor: "text-green-600" },
              { title: "Private Dashboard", desc: "View all negative feedback privately.", Icon: Icons.Lock, bgColor: "bg-red-100", textColor: "text-red-600" },
              { title: "Google Integration", desc: "Seamless Google My Business sync.", Icon: Icons.Link, bgColor: "bg-yellow-100", textColor: "text-yellow-600" },
              { title: "Instant Alerts", desc: "Get notified of every review instantly.", Icon: Icons.Bell, bgColor: "bg-purple-100", textColor: "text-purple-600" },
              { title: "Multi-Location", desc: "Manage all branches from one place.", Icon: Icons.Building, bgColor: "bg-indigo-100", textColor: "text-indigo-600" },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 sm:p-7 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 ${feature.textColor}`}>
                  <feature.Icon />
                </div>
                <h3 className="font-bold text-gray-800 mb-3 text-sm sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PERFECT FOR SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.4rem, 3.5vw, 2rem)'}}>
              Perfect For Every Local Business
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">Trusted by thousands across industries</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: "Restaurants", icon: "🍽️" },
              { name: "Cafes", icon: "☕" },
              { name: "Salons", icon: "💇" },
              { name: "Clinics", icon: "🏥" },
              { name: "Retail", icon: "🛍️" },
              { name: "Hotels", icon: "🏨" },
              { name: "Gyms", icon: "💪" },
              { name: "Auto Services", icon: "🔧" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl mb-2">{item.icon}</div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DEMO CTA SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-bold mb-4 sm:mb-6" style={{fontSize:'clamp(1.5rem, 4vw, 2.5rem)'}}>
            Try It Yourself
          </h2>
          <p className="text-indigo-200 mb-8 sm:mb-12 max-w-3xl mx-auto text-xs sm:text-sm">
            Experience the smart review system live. Call us for a personal demo!
          </p>

          <a
            href="tel:7554045078"
            className="inline-flex items-center gap-2 sm:gap-3 bg-yellow-400 text-indigo-900 px-6 sm:px-10 py-3 sm:py-5 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-2xl hover:scale-105 text-xs sm:text-sm lg:text-base"
          >
            <Icons.PhoneCall />
            Call Demo: 7554045078
          </a>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.4rem, 3.5vw, 2rem)'}}>
              What Business Owners Say
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm">Real results from real businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Rajesh Kumar", business: "Restaurant, Delhi", rating: "4.2 → 4.7", text: "Rating jumped in 2 months! Only happy customers post reviews publicly now." },
              { name: "Priya Sharma", business: "Salon, Mumbai", rating: "3.8 → 4.6", text: "We fix problems privately now. No more public reputation damage." },
              { name: "Amit Patel", business: "Clinic, Bangalore", rating: "4.1 → 4.8", text: "QR system is genius! Bookings increased by 40%." },
            ].map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 sm:p-8 rounded-2xl shadow-lg border border-indigo-100">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full font-bold text-xs sm:text-sm">
                    {t.rating}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic text-xs sm:text-sm">
                  "{t.text}"
                </p>
                <div className="border-t border-indigo-200 pt-4">
                  <p className="font-bold text-gray-800 text-xs sm:text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.business}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.4rem, 3.5vw, 2rem)'}}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              { q: "Is filtering negative reviews legal?", a: "Yes! You're collecting private feedback first and directing happy customers to public platforms. This is a smart business practice used worldwide." },
              { q: "How does the QR code work?", a: "Customers scan the QR with their phone camera. A feedback form opens where they rate 1-5 stars. They're auto-directed to Google or your dashboard based on the rating." },
              { q: "What happens to 1-3 star reviews?", a: "They're saved in your private dashboard where you can view, analyze, and respond. This gives you a chance to fix issues privately." },
              { q: "Can I customize QR codes?", a: "Yes! Add your logo, change colors, and get print-ready files for cards and posters." },
              { q: "Do I need technical knowledge?", a: "Not at all! Setup takes less than 5 minutes. Create account, connect Google Business, generate QR codes, and you're done." },
              { q: "What about multiple locations?", a: "Our Pro and Enterprise plans support unlimited locations with location-specific analytics." },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <h3 className="font-bold text-gray-800 text-xs sm:text-sm pr-4">
                    {faq.q}
                  </h3>
                  <div className={`flex-shrink-0 text-indigo-600 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>
                    <Icons.ChevronDown />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-200 bg-gray-50">
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="font-bold mb-4 sm:mb-6" style={{fontSize:'clamp(1.5rem, 4vw, 2.5rem)'}}>
            Ready to Transform Your Google Reviews?
          </h2>
          <p className="mb-8 sm:mb-10 text-indigo-100 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            Join thousands of businesses protecting their reputation and boosting ratings with smart review filtering.
          </p>

          {/* Stats Box */}
          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-8 max-w-2xl mx-auto border border-white border-opacity-20">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="font-bold text-black mb-1" style={{fontSize:'clamp(1.3rem, 2.5vw, 1.8rem)'}}>
                  2,500+
                </div>
                <div className="text-black text-xs sm:text-sm">Happy Businesses</div>
              </div>
              <div>
                <div className="font-bold text-black mb-1" style={{fontSize:'clamp(1.3rem, 2.5vw, 1.8rem)'}}>
                  50,000+
                </div>
                <div className="text-black text-xs sm:text-sm">Reviews Filtered</div>
              </div>
              <div>
                <div className="font-bold text-black mb-1" style={{fontSize:'clamp(1.3rem, 2.5vw, 1.8rem)'}}>
                  4.8★
                </div>
                <div className="text-black text-xs sm:text-sm">Avg Rating</div>
              </div>
            </div>
          </div>

          <a
            href="tel:7554045078"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 border-2 border-white text-white px-6 sm:px-10 py-3 sm:py-5 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto text-xs sm:text-sm lg:text-base"
          >
            <Icons.PhoneCall />
            Schedule a Demo Call
          </a>

          <div className="mt-6 sm:mt-8 flex justify-center text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Setup in 5 Minutes</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}