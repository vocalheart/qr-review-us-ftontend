"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    subject: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", company: "", phone: "", message: "", subject: "general" });
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <>
      <style jsx global>{`
        html, body { font-size: 12px; }
        * { font-size: inherit; }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 -right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        </div>

        <div className="max-w-4xl mx-auto z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-black bg-white bg-opacity-20 backdrop-blur-sm rounded-full font-semibold"
            style={{fontSize:'12px'}}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span>Get in Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-extrabold mb-6 leading-tight"
            style={{fontSize:'clamp(1.8rem, 5vw, 4rem)'}}
          >
            Let's Talk About Your <span className="text-yellow-300">Business Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-8"
            style={{fontSize:'clamp(0.85rem, 2vw, 1.1rem)'}}
          >
            Have questions about our smart review filtering system? Want to see a demo? Our team is here to help you protect your reputation and boost your Google rating.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="tel:+917554937509"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-indigo-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all shadow-lg hover:scale-105 w-full sm:w-auto"
              style={{fontSize:'12px'}}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Call: +917554937509
            </a>
            <a
              href="mailto:reviewbadhao@gmail.com"
              className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto"
              style={{fontSize:'12px'}}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Email Us
            </a>
          </motion.div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-6" style={{fontSize:'12px'}}>
            {["No Credit Card Required", "14-Day Free Trial", "Setup in 5 Minutes"].map((text, i) => (
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

      {/* Contact Options Cards */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-4">
            {[
              {
                title: "Call Us",
                desc: "Mon-Fri, 9AM-6PM IST",
                contact: "94253 05534",
                icon: <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>,
                gradient: "from-indigo-500 to-purple-500",
                link: "tel:+917554937509"
              },
              {
                title: "Email Us",
                desc: "Get a response within 24 hours",
                contact: "reviewbadhao@gmail.com",
                icon: <><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></>,
                gradient: "from-blue-500 to-indigo-500",
                link: "mailto:reviewbadhao@gmail.com"
              },
              {
                title: "Live Chat",
                desc: "Chat with our support team",
                contact: "Available 24/7",
                icon: <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>,
                gradient: "from-green-500 to-teal-500",
                link: "#chat"
              }
            ].map((option, index) => (
              <motion.a
                key={index}
                href={option.link}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${option.gradient} rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">{option.icon}</svg>
                </div>
                <h3 className="font-bold text-gray-800 mb-2" style={{fontSize:'clamp(0.9rem,1.8vw,1.1rem)'}}>{option.title}</h3>
                <p className="text-gray-600 mb-3" style={{fontSize:'12px'}}>{option.desc}</p>
                <p className="text-indigo-600 font-semibold" style={{fontSize:'12px'}}>{option.contact}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-indigo-600 font-semibold mb-4" style={{fontSize:'12px'}}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
                <span>Send us a message</span>
              </div>
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.3rem,3vw,1.8rem)'}}>Ready to Get Started?</h2>
              <p className="text-gray-600 mb-8 leading-relaxed" style={{fontSize:'12px'}}>
                Fill out the form and our team will get back to you within 24 hours. We're excited to help you protect your reputation and grow your business!
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block font-semibold text-gray-700 mb-2" style={{fontSize:'12px'}}>Full Name *</label>
                    <input
                      type="text" id="name" name="name" required
                      value={formData.name} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      style={{fontSize:'12px'}}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-semibold text-gray-700 mb-2" style={{fontSize:'12px'}}>Email Address *</label>
                    <input
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      style={{fontSize:'12px'}}
                      placeholder="Enter Your Name"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block font-semibold text-gray-700 mb-2" style={{fontSize:'12px'}}>Company Name</label>
                    <input
                      type="text" id="company" name="company"
                      value={formData.company} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      style={{fontSize:'12px'}}
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-semibold text-gray-700 mb-2" style={{fontSize:'12px'}}>Phone Number</label>
                    <input
                      type="tel" id="phone" name="phone"
                      value={formData.phone} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      style={{fontSize:'12px'}}
                      placeholder="+91 +917554937509"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block font-semibold text-gray-700 mb-2" style={{fontSize:'12px'}}>What can we help you with? *</label>
                  <select
                    id="subject" name="subject" required
                    value={formData.subject} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    style={{fontSize:'12px'}}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="demo">Schedule a Demo</option>
                    <option value="pricing">Pricing & Plans</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block font-semibold text-gray-700 mb-2" style={{fontSize:'12px'}}>Your Message *</label>
                  <textarea
                    id="message" name="message" required
                    value={formData.message} onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    style={{fontSize:'12px'}}
                    placeholder="Tell us more about your needs..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{fontSize:'12px'}}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                      </svg>
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                    style={{fontSize:'12px'}}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Right Side Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Office */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800" style={{fontSize:'clamp(1rem,2vw,1.2rem)'}}>Our Offices</h3>
                </div>
                <div className="space-y-4" style={{fontSize:'12px'}}>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">India (Headquarters)</h4>
                    <p className="text-gray-600 leading-relaxed">
                       Bhopal<br />
                      Madhya Pradesh 462001, India
                    </p>
                  </div>
                 
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl border border-green-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800" style={{fontSize:'clamp(1rem,2vw,1.2rem)'}}>Business Hours</h3>
                </div>
                <div className="space-y-3 text-gray-700" style={{fontSize:'12px'}}>
                  {[
                    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
                    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
                    { day: "Sunday", time: "Closed", closed: true },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="font-semibold">{row.day}</span>
                      <span className={row.closed ? "text-red-600" : ""}>{row.time}</span>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-green-200">
                    <p className="text-gray-600" style={{fontSize:'12px'}}><strong>Note:</strong> All times are in Indian Standard Time (IST)</p>
                  </div>
                </div>
              </div>

              {/* Quick Answers */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-800" style={{fontSize:'clamp(1rem,2vw,1.2rem)'}}>Quick Answers</h3>
                </div>
                <div className="space-y-3" style={{fontSize:'12px'}}>
                  {[
                    "How does the review filtering work?",
                    "What are your pricing plans?",
                    "Can I manage multiple locations?",
                    "Is there a free trial available?",
                  ].map((q, i) => (
                    <a key={i} href="#" className="flex items-start gap-3 group">
                      <svg className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700 group-hover:text-indigo-600 transition">{q}</span>
                    </a>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-indigo-200">
                  <a href="#" className="text-indigo-600 font-semibold hover:text-indigo-700 transition inline-flex items-center gap-2" style={{fontSize:'12px'}}>
                    View all FAQs
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem,2.5vw,1.5rem)'}}>Connect With Us</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto" style={{fontSize:'12px'}}>
            Follow us on social media for the latest updates, tips, and success stories from businesses using SmartReview.
          </p>
          <div className="flex justify-center gap-4">
            {[
              { name: "Instagram", color: "hover:bg-pink-600", path: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003z" },
              { name: "Facebook", color: "hover:bg-blue-600", path: "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" },
              { name: "LinkedIn", color: "hover:bg-blue-700", path: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" },
              { name: "YouTube", color: "hover:bg-red-600", path: "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`w-12 h-12 bg-indigo-600 ${social.color} text-white rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                  <path d={social.path}/>
                </svg>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <h2 className="font-bold mb-6" style={{fontSize:'clamp(1.5rem, 4vw, 2.5rem)'}}>
            Ready to Transform Your Google Reviews?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed" style={{fontSize:'12px'}}>
            Join thousands of businesses already protecting their reputation and boosting their ratings with smart review filtering.
          </p>

          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-lg mx-auto border border-white border-opacity-20">
            <div className="grid grid-cols-3 gap-4 text-center text-black">
              {[["2,500+", "Happy Businesses"], ["50,000+", "Reviews Filtered"], ["4.8★", "Avg Rating"]].map(([val, lbl], i) => (
                <div key={i}>
                  <div className="font-bold text-black" style={{fontSize:'clamp(1rem,2.5vw,1.4rem)'}}>{val}</div>
                  <div className="text-black" style={{fontSize:'12px'}}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <a href="tel:+917554937509" className="border-2 border-white text-white px-10 py-5 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto flex items-center justify-center gap-2" style={{fontSize:'12px'}}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Call: 94253 05534
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6" style={{fontSize:'12px'}}>
            {["No Credit Card Required", "Setup in 5 Minutes", "Cancel Anytime"].map((text, i) => (
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

      {/* Map Placeholder */}
      <section className="h-64 bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-3 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <p className="font-semibold text-indigo-700" style={{fontSize:'12px'}}>Bhopal, Madhya Pradesh, India</p>
          </div>
        </div>
      </section>
    </>
  );
}