"use client";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <>
      <style jsx global>{`
        html, body { font-size: 12px; }
        * { font-size: inherit; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 top-20 left-10"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -bottom-20 -right-20"
          />
        </div>

        <div className="max-w-6xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-black bg-white bg-opacity-20 backdrop-blur-sm rounded-full font-semibold"
            style={{fontSize:'12px'}}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
            </svg>
            <span>Powerful Features</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-extrabold mb-6 leading-tight"
            style={{fontSize:'clamp(1.8rem, 5vw, 4rem)'}}
          >
            Smart Tools to <span className="text-yellow-300">Protect & Grow</span><br />Your Reputation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-indigo-100 max-w-4xl mx-auto leading-relaxed mb-8 px-2"
            style={{fontSize:'clamp(0.85rem, 2vw, 1.1rem)'}}
          >
            Explore comprehensive tools designed to filter reviews intelligently, boost your Google rating,
            and turn customer feedback into sustainable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
           
            <motion.a
              href="tel:+917554937509"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto text-center"
              style={{fontSize:'12px'}}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Call: 94253 05534
            </motion.a>
          </motion.div>

          <div className="mt-12 flex flex-wrap justify-center gap-6" style={{fontSize:'12px'}}>
            {[ "Setup in 5 Minutes"].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "95%", label: "Positive Reviews on Google", bg: "bg-yellow-100", color: "text-yellow-600" },
              { value: "4.8★", label: "Average Rating Achieved", bg: "bg-green-100", color: "text-green-600" },
              { value: "300%", label: "More 5-Star Reviews", bg: "bg-blue-100", color: "text-blue-600" },
              { value: "100%", label: "Negative Reviews Filtered", bg: "bg-purple-100", color: "text-purple-600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 hover:transform hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 mx-auto mb-3 ${stat.bg} rounded-full flex items-center justify-center`}>
                  <svg className={`w-8 h-8 ${stat.color}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="font-bold text-indigo-600 mb-1" style={{fontSize:'clamp(1.2rem, 3vw, 1.8rem)'}}>{stat.value}</div>
                <div className="text-gray-600" style={{fontSize:'12px'}}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Overview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-4" style={{fontSize:'12px'}}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/>
              </svg>
              <span>Complete Solution</span>
            </div>
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.4rem, 4vw, 2.5rem)'}}>
              Everything You Need to Master Reviews
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto" style={{fontSize:'12px'}}>
              From intelligent QR filtering to advanced analytics, our platform empowers businesses to protect their reputation and thrive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Smart QR Code Generator", desc: "Create unlimited customized QR codes that filter reviews intelligently. Place them anywhere customers interact with your business.", gradient: "from-blue-500 to-indigo-500" },
              { title: "Intelligent Rating Filter", desc: "Automatically route 4-5 star reviews to Google while keeping 1-3 star feedback private. Protect your reputation intelligently.", gradient: "from-indigo-500 to-purple-500" },
              { title: "Private Feedback Dashboard", desc: "View all negative feedback privately. Analyze issues, respond directly, and improve service before reputation damage occurs.", gradient: "from-green-500 to-teal-500" },
              { title: "Google Review Integration", desc: "Seamless connection to Google My Business. Satisfied customers are automatically directed to leave public reviews instantly.", gradient: "from-yellow-500 to-orange-500" },
              { title: "Real-Time Notifications", desc: "Get instant alerts for every review via email or SMS. Never miss important feedback and respond promptly to all customers.", gradient: "from-red-500 to-pink-500" },
              { title: "Multi-Location Management", desc: "Manage unlimited locations from one dashboard. Separate QR codes, analytics, and team access for each branch or outlet.", gradient: "from-indigo-500 to-purple-500" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
              >
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(0.9rem,1.8vw,1.1rem)'}}>{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow" style={{fontSize:'12px'}}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Feature Deep Dive */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-4" style={{fontSize:'12px'}}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              <span>Feature Deep Dive</span>
            </div>
            <h2 className="font-bold text-gray-800" style={{fontSize:'clamp(1.4rem, 3.5vw, 2rem)'}}>How Each Feature Works</h2>
          </div>

          {[
            {
              title: "Smart QR Code Generator",
              desc: "Generate unlimited unique QR codes for each location, table, or product. Customers scan with their phone camera to access your smart feedback form instantly.",
              details: "Our QR system integrates seamlessly with your existing workflows. Place codes on tables, receipts, posters, or digital displays. Track scan analytics to understand customer engagement patterns and optimize placement.",
              features: ["Unlimited QR codes", "Custom branding", "Print-ready files", "Analytics tracking"],
              gradient: "from-blue-500 to-indigo-500",
            },
            {
              title: "Intelligent Rating Filter",
              desc: "The heart of our system: automatically routes 4-5 star reviews to Google while keeping 1-3 star feedback private in your dashboard for resolution.",
              details: "This intelligent filtering protects your online reputation while giving you the chance to fix problems before they become public. Turn unhappy customers into satisfied ones without permanent damage of negative public reviews.",
              features: ["Smart routing", "Reputation protection", "Private feedback", "Issue resolution"],
              gradient: "from-indigo-500 to-purple-500",
            },
            {
              title: "Private Feedback Dashboard",
              desc: "View all feedback in one place. Real-time analytics show trends, sentiment analysis reveals customer emotions, and detailed reports drive improvement.",
              details: "Visualize your review performance with interactive charts and graphs. Identify patterns, track improvement over time, and make data-driven decisions to enhance your customer experience and service quality.",
              features: ["Real-time analytics", "Sentiment analysis", "Trend tracking", "Export reports"],
              gradient: "from-green-500 to-teal-500",
            },
            {
              title: "Google Review Integration",
              desc: "Seamless connection to Google My Business. Satisfied customers (4-5 stars) are automatically directed to leave public reviews on your Google listing.",
              details: "Maximize your Google presence with streamlined review collection. The easier you make it for happy customers to leave reviews, the more positive feedback you'll receive. Our one-tap system removes all friction.",
              features: ["Direct Google link", "One-tap reviews", "Higher conversion", "Verified reviews"],
              gradient: "from-yellow-500 to-orange-500",
            },
            {
              title: "Real-Time Notifications",
              desc: "Stay informed instantly when reviews come in. Receive email or SMS notifications with full review details so you can respond immediately.",
              details: "Never miss important feedback. Set up notification rules to alert specific team members based on review sentiment, location, or rating. Quick response times show customers you care.",
              features: ["Email alerts", "SMS notifications", "Instant delivery", "Custom rules"],
              gradient: "from-red-500 to-pink-500",
            },
            {
              title: "Multi-Location Management",
              desc: "Manage multiple business locations effortlessly. Each location gets separate QR codes, analytics, and team access with centralized control.",
              details: "Perfect for franchises, chains, or multi-branch businesses. Compare performance across locations, identify best practices, and ensure consistency while allowing local customization.",
              features: ["Unlimited locations", "Location analytics", "Team permissions", "Centralized dashboard"],
              gradient: "from-indigo-500 to-purple-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-2xl transition-all duration-300 border border-indigo-100"
            >
              <div className="flex items-center mb-6 gap-4">
                <div className={`w-14 h-14 flex-shrink-0 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white`}>
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-800" style={{fontSize:'clamp(0.95rem,2vw,1.2rem)'}}>{feature.title}</h3>
              </div>
              <p className="text-gray-700 mb-3 leading-relaxed" style={{fontSize:'12px'}}>{feature.desc}</p>
              <p className="text-gray-500 mb-6 leading-relaxed" style={{fontSize:'12px'}}>{feature.details}</p>
              <div className="flex flex-wrap gap-2">
                {feature.features.map((item, idx) => (
                  <span key={idx} className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full font-medium border border-indigo-100" style={{fontSize:'12px'}}>
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-4" style={{fontSize:'12px'}}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              <span>Key Benefits</span>
            </div>
            <h2 className="font-bold text-gray-800" style={{fontSize:'clamp(1.4rem, 3.5vw, 2rem)'}}>Why Businesses Love Our Platform</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "Protect Your Reputation", desc: "Negative reviews stay private until you've had a chance to address them. No more public damage from one-off bad experiences." },
              { title: "Boost Google Rating", desc: "Only happy customers leave public reviews on Google, naturally increasing your average rating and attracting more business." },
              { title: "Improve Customer Service", desc: "Private feedback gives you actionable insights to fix problems and improve operations without the pressure of public scrutiny." },
              { title: "Save Time & Money", desc: "Automated filtering and notifications eliminate manual review monitoring. Focus on running your business, not managing reviews." },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 p-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl border border-indigo-100 hover:shadow-lg transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-2" style={{fontSize:'clamp(0.9rem,1.8vw,1.1rem)'}}>{benefit.title}</h4>
                  <p className="text-gray-600 leading-relaxed" style={{fontSize:'12px'}}>{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Flow */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.4rem, 3.5vw, 2rem)'}}>Smart Rating-Based Redirection</h2>
            <p className="text-gray-600" style={{fontSize:'12px'}}>The secret sauce that protects your reputation automatically</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Positive */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-green-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-green-100 px-6 py-3 rounded-full mb-4">
                  <span className="font-bold text-green-700" style={{fontSize:'clamp(1rem,2vw,1.3rem)'}}>4-5 Stars ⭐</span>
                </div>
                <h3 className="font-bold text-green-700" style={{fontSize:'clamp(0.9rem,1.8vw,1.1rem)'}}>Happy Customer Path</h3>
              </div>
              <div className="space-y-3" style={{fontSize:'12px'}}>
                {["Customer gives 4 or 5 stars", "Auto-redirect to Google Review page", "Positive review goes PUBLIC on Google!"].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                    <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{fontSize:'12px'}}>{i+1}</div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200 text-center" style={{fontSize:'12px'}}>
                <strong className="text-green-800">Result:</strong> <span className="text-green-700">Your Google rating improves automatically!</span>
              </div>
            </div>
            {/* Negative */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-orange-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-orange-100 px-6 py-3 rounded-full mb-4">
                  <span className="font-bold text-orange-700" style={{fontSize:'clamp(1rem,2vw,1.3rem)'}}>1-3 Stars ⭐</span>
                </div>
                <h3 className="font-bold text-orange-700" style={{fontSize:'clamp(0.9rem,1.8vw,1.1rem)'}}>Unhappy Customer Path</h3>
              </div>
              <div className="space-y-3" style={{fontSize:'12px'}}>
                {["Customer gives 1, 2, or 3 stars", "Feedback saved to private dashboard", "Review stays PRIVATE — Not on Google!"].map((step, i) => (
                  <div key={i} className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg">
                    <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{fontSize:'12px'}}>{i+1}</div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200 text-center" style={{fontSize:'12px'}}>
                <strong className="text-orange-800">Result:</strong> <span className="text-orange-700">Fix issues privately. Reputation protected!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo / CTA Section */}
      <section id="demo" className="py-16 sm:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="font-bold mb-4" style={{fontSize:'clamp(1.5rem, 4vw, 2.5rem)'}}>Ready to See It in Action?</h2>
            <p className="text-indigo-200 max-w-3xl mx-auto" style={{fontSize:'12px'}}>
              Experience how our intelligent review filtering system protects your reputation and boosts your ratings. Call us for a live demo!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            
            <motion.a
              href="tel:+917554937509"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto"
              style={{fontSize:'12px'}}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Call Demo: +917554937509
            </motion.a>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-black">
            {[
              { title: "Scan QR", desc: "Open camera app" },
              { title: "Rate Experience", desc: "Choose 1-5 stars" },
              { title: "Smart Redirect", desc: "See where you go!" },
            ].map((item, i) => (
              <div key={i} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl text-black">
                <h4 className="font-bold mb-2 text-black" style={{fontSize:'12px'}}>{item.title}</h4>
                <p className="text-black" style={{fontSize:'12px'}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="get-started" className="py-16 sm:py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-bold mb-6"
            style={{fontSize:'clamp(1.5rem, 4vw, 2.5rem)'}}
          >
            Start Protecting Your Reputation Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 text-indigo-100 max-w-2xl mx-auto leading-relaxed"
            style={{fontSize:'12px'}}
          >
            Join thousands of businesses using our intelligent review filtering to boost their Google ratings and protect their online reputation.
          </motion.p>

          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 mb-8 max-w-2xl mx-auto border border-white border-opacity-20">
            <div className="grid sm:grid-cols-3 gap-6 text-center text-black">
              {[["2,500+", "Happy Businesses"], ["50,000+", "Reviews Filtered"], ["4.8★", "Average Rating"]].map(([val, lbl], i) => (
                <div key={i}>
                  <div className="font-bold mb-1 text-black" style={{fontSize:'clamp(1.2rem,2.5vw,1.6rem)'}}>{val}</div>
                  <div className="text-black" style={{fontSize:'12px'}}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            
            <a href="tel:+917554937509" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-10 py-5 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto" style={{fontSize:'12px'}}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Call: +917554937509
            </a>
          </motion.div>

          <div className="mt-8 flex flex-wrap justify-center gap-6" style={{fontSize:'12px'}}>
            {["Setup in 5 Minutes", ].map((text, i) => (
              <div key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}