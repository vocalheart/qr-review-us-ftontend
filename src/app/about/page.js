// app/about/page.js
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-black bg-white bg-opacity-20 backdrop-blur-sm rounded-full font-semibold text-xs sm:text-sm"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
            </svg>
            <span>About Our Mission</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-bold mb-4 sm:mb-6 leading-tight"
            style={{fontSize:'clamp(1.75rem, 6vw, 3.5rem)'}}
          >
            About <span className="text-yellow-300">SmartReview</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed text-xs sm:text-sm lg:text-base"
          >
            We're on a mission to empower businesses with intelligent tools that turn customer feedback into actionable insights and protect your online reputation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-indigo-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-lg hover:scale-105 text-xs sm:text-sm lg:text-base"
            >
              Get Started Today
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all text-xs sm:text-sm lg:text-base"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Mini stats in hero */}
          <div className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            {["Setup in 5 Min"].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "10,000+", label: "Active Businesses" },
              { value: "1M+", label: "Reviews Filtered" },
              { value: "4.8★", label: "Avg Rating" },
              { value: "95%", label: "Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 hover:transform hover:scale-105 transition-transform text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 bg-indigo-100 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                  {i === 0 ? "🏢" : i === 1 ? "⭐" : i === 2 ? "📈" : "✅"}
                </div>
                <div className="font-bold text-indigo-600 mb-1" style={{fontSize:'clamp(1rem, 2.5vw, 1.6rem)'}}>
                  {stat.value}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OUR STORY SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-2 text-xs sm:text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                </svg>
                <span>Our Journey</span>
              </div>

              <h2 className="font-bold text-gray-800" style={{fontSize:'clamp(1.3rem, 3.5vw, 2rem)'}}>
                Our Story
              </h2>

              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                Founded in 2023, SmartReview was born from the frustration of small business owners who struggled with negative Google reviews damaging their reputation before they could address customer concerns.
              </p>

              <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                We set out to create a simple, intelligent solution that combines QR code technology with smart review filtering. Today, thousands of businesses—from local cafes to dental clinics—use SmartReview to protect their reputation and boost their Google ratings.
              </p>

              {/* Mini Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[["10K+", "Businesses"], ["1M+", "Reviews"]].map(([val, lbl], i) => (
                  <div key={i} className="text-center p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 hover:shadow-lg transition-shadow">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                      </svg>
                    </div>
                    <div className="font-bold text-indigo-600 mb-1" style={{fontSize:'clamp(1rem, 2.5vw, 1.4rem)'}}>
                      {val}
                    </div>
                    <div className="text-gray-600 font-medium text-xs sm:text-sm">{lbl}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Vision Box */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl p-6 sm:p-8 lg:p-12 text-white text-center shadow-2xl"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </div>

              <h3 className="font-bold mb-4 text-xl sm:text-2xl">Our Vision</h3>
              <p className="opacity-90 leading-relaxed mb-8 text-xs sm:text-sm lg:text-base">
                A world where every business thrives on genuine customer feedback while maintaining complete control over their online reputation.
              </p>

              <div className="pt-8 border-t border-white border-opacity-20">
                <h4 className="font-bold mb-3 text-base sm:text-lg">Our Mission</h4>
                <p className="opacity-90 text-xs sm:text-sm lg:text-base">
                  Empower businesses to turn feedback into growth without fear of reputation damage.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white border-opacity-20">
                {[["95%", "Positive"], ["4.8★", "Rating"], ["300%", "More 5⭐"]].map(([val, lbl], i) => (
                  <div key={i}>
                    <div className="font-bold text-yellow-300 text-sm sm:text-base lg:text-lg">{val}</div>
                    <div className="opacity-80 text-xs">{lbl}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== WHY SMARTREVIEW WORKS ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.3rem, 3.5vw, 2rem)'}}>
              Why SmartReview Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base">
              The smart filtering system that protects your reputation automatically
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Without SmartReview */}
            <div className="bg-red-50 border-l-4 border-red-500 p-6 sm:p-8 rounded-lg">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                Without SmartReview
              </h3>
              <ul className="space-y-3 text-gray-700 text-xs sm:text-sm">
                {[
                  "Negative reviews go to Google",
                  "Your rating drops publicly",
                  "No chance to fix issues",
                  "Happy customers forget to review",
                  "Reputation damaged"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* With SmartReview */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 sm:p-8 rounded-lg">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                With SmartReview
              </h3>
              <ul className="space-y-3 text-gray-700 text-xs sm:text-sm">
                {[
                  "4-5 stars → Auto Google redirect",
                  "1-3 stars → Private only",
                  "Fix issues before damage",
                  "QR codes boost reviews",
                  "Control all feedback"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TEAM SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-4 text-xs sm:text-sm">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
            <span>Leadership Team</span>
          </div>

          <h2 className="font-bold text-gray-800 mb-10 sm:mb-14" style={{fontSize:'clamp(1.3rem, 3.5vw, 2rem)'}}>
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                name: "Dhruv Saxena", 
                role: "CEO & Founder", 
                bio: "Visionary entrepreneur with 15+ years in SaaS and customer experience.",
                gradient: "from-indigo-100 to-indigo-200",
                color: "text-indigo-600"
              },
              { 
                name: "Anurag", 
                role: "CTO", 
                bio: "Tech innovator specializing in scalable web apps and AI solutions.",
                gradient: "from-purple-100 to-purple-200",
                color: "text-purple-600"
              },
              { 
                name: "Raj Shukla", 
                role: "Head of Product", 
                bio: "Design thinker creating intuitive experiences that drive results.",
                gradient: "from-yellow-100 to-yellow-200",
                color: "text-yellow-600"
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center`}>
                  <svg className={`w-10 h-10 sm:w-12 sm:h-12 ${member.color}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base lg:text-lg">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4 text-xs sm:text-sm">
                  {member.role}
                </p>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm lg:text-base">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== VALUES SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-4 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>What Drives Us</span>
            </div>
            <h2 className="font-bold text-gray-800" style={{fontSize:'clamp(1.3rem, 3.5vw, 2rem)'}}>
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                title: "Innovation", 
                desc: "We constantly push boundaries in feedback management.",
                gradient: "from-blue-500 to-indigo-500"
              },
              { 
                title: "Customer First", 
                desc: "Every decision centers around user success.",
                gradient: "from-indigo-500 to-purple-500"
              },
              { 
                title: "Integrity", 
                desc: "We build trust through transparency and honesty.",
                gradient: "from-green-500 to-teal-500"
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-4 text-center text-sm sm:text-base lg:text-lg">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center text-xs sm:text-sm lg:text-base">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== IMPACT NUMBERS ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-center mb-10 sm:mb-14" style={{fontSize:'clamp(1.3rem, 3.5vw, 2rem)'}}>
            Our Impact in Numbers
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: "10,000+", label: "Businesses" },
              { number: "1M+", label: "Reviews" },
              { number: "4.8★", label: "Rating" },
              { number: "95%", label: "Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl hover:bg-opacity-20 transition-all"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="font-bold text-yellow-300 mb-2" style={{fontSize:'clamp(1rem, 2.5vw, 1.6rem)'}}>
                  {stat.number}
                </div>
                <div className="text-indigo-200 text-xs sm:text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TRUSTED BY SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.3rem, 3.5vw, 2rem)'}}>
            Trusted Across Industries
          </h2>
          <p className="text-gray-600 mb-10 text-xs sm:text-sm lg:text-base">
            Thousands of businesses use SmartReview
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { bg: "bg-orange-100", color: "text-orange-600", label: "Restaurants" },
              { bg: "bg-yellow-100", color: "text-yellow-600", label: "Cafes" },
              { bg: "bg-pink-100", color: "text-pink-600", label: "Salons" },
              { bg: "bg-blue-100", color: "text-blue-600", label: "Clinics" },
              { bg: "bg-purple-100", color: "text-purple-600", label: "Retail" },
              { bg: "bg-red-100", color: "text-red-600", label: "Hotels" },
              { bg: "bg-green-100", color: "text-green-600", label: "Gyms" },
              { bg: "bg-gray-100", color: "text-gray-600", label: "Auto" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 sm:p-5 rounded-xl shadow-md hover:shadow-lg transition-all text-center hover:-translate-y-1 border border-gray-100">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 ${item.bg} rounded-full flex items-center justify-center`}>
                  <svg className={`w-6 h-6 sm:w-7 sm:h-7 ${item.color}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="font-semibold text-gray-800 text-xs sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-bold mb-4 sm:mb-6" style={{fontSize:'clamp(1.4rem, 4vw, 2.3rem)'}}>
              Ready to Join Our Success Story?
            </h2>

            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed text-xs sm:text-sm lg:text-base">
              Start protecting your reputation and boosting your Google ratings with our intelligent review filtering system.
            </p>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-lg mx-auto border border-white border-opacity-20">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[["2,500+", "Businesses"], ["50,000+", "Reviews"], ["4.8★", "Rating"]].map(([val, lbl], i) => (
                  <div key={i}>
                    <div className="font-bold text-black text-sm sm:text-base lg:text-lg" style={{fontSize:'clamp(0.9rem, 2vw, 1.3rem)'}}>
                      {val}
                    </div>
                    <div className="text-black text-xs">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-indigo-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-yellow-300 transition-all w-full sm:w-auto text-xs sm:text-sm lg:text-base"
              >
                Get Started Free
              </Link>
              <a
                href="tel:+917554937509"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto text-xs sm:text-sm lg:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                Call: +917554937509
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              {["Setup in 5 Min", ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}