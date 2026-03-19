"use client";
import { useState } from "react";

export default function PrivacyPolicy() {
  const [expandedSection, setExpandedSection] = useState(null);

  // Icon Components
  const Icons = {
    ChevronDown: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    ),
    Shield: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Lock: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    Share: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C9.589 12.438 10 11.166 10 9.5c0-1.933-.716-3.696-1.9-5M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    Clock: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    User: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Globe: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H7m6-4v4m0-11v3m0 0a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    ),
    Mail: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
      </svg>
    ),
    Phone: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
      </svg>
    ),
    MapPin: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
      </svg>
    ),
  };

  const sections = [
    {
      num: "1",
      title: "Introduction",
      color: "indigo",
      icon: Icons.Shield,
      content: "Smart Review System (\"we,\" \"us,\" \"our,\" or \"Company\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our Smart Review Collection System (\"Service\"), including our website and mobile applications.",
    },
    {
      num: "2",
      title: "Information We Collect",
      color: "purple",
      icon: Icons.User,
      content: [
        {
          subtitle: "Personal Information You Provide:",
          items: [
            "Business name, address, contact details",
            "Owner/manager name and email address",
            "Phone number and website URL",
            "Google Business profile information",
            "Payment information (credit card, bank details)",
            "Billing and shipping addresses",
          ],
        },
        {
          subtitle: "Customer Feedback Information:",
          items: [
            "Star ratings (1-5 stars)",
            "Customer comments and feedback",
            "Customer email addresses (if provided)",
            "Customer IP addresses",
            "Device information (browser, OS, device type)",
          ],
        },
        {
          subtitle: "Automatically Collected Information:",
          items: [
            "Log data (IP address, access times, pages viewed)",
            "Cookies and tracking technology",
            "Analytics data about Service usage",
            "Device identifiers and location data",
          ],
        },
      ],
    },
    {
      num: "3",
      title: "How We Use Your Information",
      color: "pink",
      icon: Icons.Share,
      content: [
        {
          items: [
            "Creating and managing your account",
            "Processing payments and billing",
            "Providing and improving the Service",
            "Routing reviews to Google My Business",
            "Storing feedback in your private dashboard",
            "Sending service notifications and updates",
            "Customer support and responding to inquiries",
            "Analytics and performance monitoring",
            "Compliance with legal obligations",
            "Detecting fraud and preventing abuse",
            "Marketing communications (with your consent)",
          ],
        },
      ],
    },
    {
      num: "4",
      title: "Data Security",
      color: "blue",
      icon: Icons.Lock,
      content: [
        {
          subtitle: "Security Measures:",
          items: [
            "SSL/TLS encryption for data in transit",
            "Encrypted storage of sensitive data",
            "Secure password hashing",
            "Regular security audits and updates",
            "Access controls and authentication",
            "Firewalls and intrusion detection",
          ],
        },
        {
          text: "However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. You use the Service at your own risk.",
        },
      ],
    },
    {
      num: "5",
      title: "Data Sharing & Third Parties",
      color: "green",
      icon: Icons.Share,
      content: [
        {
          subtitle: "We share information with:",
          items: [
            "Google My Business: We share positive reviews to post on Google",
            "Payment Processors: For secure payment processing",
            "Email Service Providers: For sending notifications",
            "Analytics Services: For usage tracking and optimization",
            "Legal Authorities: When required by law",
          ],
        },
        {
          text: "We do not sell, trade, or rent your personal information to third parties for marketing purposes.",
        },
      ],
    },
    {
      num: "6",
      title: "Data Retention",
      color: "yellow",
      icon: Icons.Clock,
      content: [
        {
          items: [
            "Active Account Data: Retained while your account is active",
            "Customer Feedback: Retained for as long as needed for your business purposes",
            "Payment Records: Retained for 7 years (tax compliance)",
            "Log Data: Typically retained for 90 days",
            "Deleted Accounts: Data deleted within 30 days of account closure",
          ],
        },
      ],
    },
    {
      num: "7",
      title: "Your Rights & Choices",
      color: "red",
      icon: Icons.User,
      content: [
        {
          subtitle: "You have the right to:",
          items: [
            "Access: Request a copy of your personal data",
            "Correction: Correct inaccurate information",
            "Deletion: Request deletion of your data (right to be forgotten)",
            "Opt-out: Unsubscribe from marketing emails",
            "Portability: Receive your data in a portable format",
            "Object: Object to certain uses of your data",
          ],
        },
        {
          text: "To exercise these rights, please contact us at privacy@smartreviewsystem.com.",
        },
      ],
    },
    {
      num: "8",
      title: "Cookies & Tracking",
      color: "indigo",
      icon: Icons.Globe,
      content: [
        {
          subtitle: "We use cookies and similar tracking technologies to:",
          items: [
            "Remember your login information",
            "Track Service usage and preferences",
            "Improve user experience",
            "Analyze Service performance",
            "Prevent fraud and security issues",
          ],
        },
        {
          text: "You can control cookies through your browser settings. Disabling cookies may affect the functionality of the Service.",
        },
      ],
    },
    {
      num: "9",
      title: "Children's Privacy",
      color: "cyan",
      icon: Icons.Shield,
      content: "Our Service is not intended for children under 13 years old. We do not knowingly collect personal information from children under 13. If we discover that we have collected such information, we will delete it immediately. If you believe a child has provided information to us, please contact us immediately.",
    },
    {
      num: "10",
      title: "GDPR & International Compliance",
      color: "purple",
      icon: Icons.Globe,
      content: "If you are located in the European Union or other jurisdictions with data protection laws, you have additional rights under those laws. We comply with the General Data Protection Regulation (GDPR) and similar international privacy standards. Our processing of your data is based on legitimate business interests, contract necessity, or your consent.",
    },
    {
      num: "11",
      title: "Changes to This Privacy Policy",
      color: "orange",
      icon: Icons.Clock,
      content: "We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the \"Last Updated\" date. Your continued use of the Service constitutes your acceptance of the updated policy.",
    },
  ];

  const bgColorMap = {
    indigo: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
    purple: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    pink: "bg-pink-50 border-pink-200 hover:bg-pink-100",
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    green: "bg-green-50 border-green-200 hover:bg-green-100",
    yellow: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
    red: "bg-red-50 border-red-200 hover:bg-red-100",
    cyan: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
    orange: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  };

  const iconColorMap = {
    indigo: "text-indigo-600",
    purple: "text-purple-600",
    pink: "text-pink-600",
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    red: "text-red-600",
    cyan: "text-cyan-600",
    orange: "text-orange-600",
  };

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold mb-3 sm:mb-4 leading-tight" style={{fontSize:'clamp(2rem, 5vw, 3rem)'}}>
            Privacy Policy
          </h1>
          <p className="text-indigo-100 text-xs sm:text-sm">
            Effective Date: January 2026 | Last Updated: March 2026
          </p>
          <p className="text-indigo-100 text-xs sm:text-sm mt-2">
            Your privacy is our priority. Read our comprehensive policy to understand how we protect your data.
          </p>
        </div>
      </section>

      {/* ==================== QUICK SUMMARY SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-gray-800 mb-8 text-center" style={{fontSize:'clamp(1.4rem, 3vw, 2rem)'}}>
            What You Need to Know
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Icons.Shield, title: "Secure", desc: "Industry-standard encryption & security" },
              { icon: Icons.Lock, title: "Private", desc: "Your data stays private & protected" },
              { icon: Icons.User, title: "Control", desc: "Full rights to access & delete your data" },
              { icon: Icons.Share, title: "Transparent", desc: "Clear & honest about data usage" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
                <div className="text-indigo-600 mb-3 flex justify-center">
                  <item.icon />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTENT SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {sections.map((section, i) => (
              <div
                key={i}
                className={`border-l-4 ${
                  {
                    indigo: "border-indigo-600",
                    purple: "border-purple-600",
                    pink: "border-pink-600",
                    blue: "border-blue-600",
                    green: "border-green-600",
                    yellow: "border-yellow-600",
                    red: "border-red-600",
                    cyan: "border-cyan-600",
                    orange: "border-orange-600",
                  }[section.color]
                } ${bgColorMap[section.color]} border rounded-r-lg p-4 sm:p-6 cursor-pointer transition-all hover:shadow-md`}
                onClick={() => setExpandedSection(expandedSection === i ? null : i)}
              >
                {/* Header */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`flex-shrink-0 ${iconColorMap[section.color]}`}>
                    <section.icon />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-block w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            {
                              indigo: "bg-indigo-600",
                              purple: "bg-purple-600",
                              pink: "bg-pink-600",
                              blue: "bg-blue-600",
                              green: "bg-green-600",
                              yellow: "bg-yellow-600",
                              red: "bg-red-600",
                              cyan: "bg-cyan-600",
                              orange: "bg-orange-600",
                            }[section.color]
                          }`}>
                            {section.num}
                          </span>
                        </div>
                        <h2 className="font-bold text-gray-800" style={{fontSize:'clamp(1rem, 2vw, 1.3rem)'}}>
                          {section.title}
                        </h2>
                      </div>
                      <div className={`flex-shrink-0 text-gray-600 transition-transform ${expandedSection === i ? 'rotate-180' : ''}`}>
                        <Icons.ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable Content */}
                {expandedSection === i && (
                  <div className="mt-4 sm:mt-6 ml-9 sm:ml-12 text-gray-700 text-xs sm:text-sm space-y-4">
                    {typeof section.content === "string" ? (
                      <p className="leading-relaxed">{section.content}</p>
                    ) : Array.isArray(section.content) ? (
                      section.content.map((block, idx) => (
                        <div key={idx}>
                          {block.subtitle && (
                            <p className="font-semibold text-gray-800 mb-2">
                              {block.subtitle}
                            </p>
                          )}
                          {block.items && (
                            <ul className="space-y-2 ml-4">
                              {block.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex gap-2">
                                  <span className="text-indigo-600 flex-shrink-0">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {block.text && (
                            <p className="leading-relaxed mt-3">{block.text}</p>
                          )}
                        </div>
                      ))
                    ) : null}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Section */}
            <div className="border-l-4 border-indigo-600 bg-indigo-50 border rounded-r-lg p-4 sm:p-6 cursor-pointer transition-all hover:shadow-md"
              onClick={() => setExpandedSection(expandedSection === "contact" ? null : "contact")}>
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 text-indigo-600">
                  <Icons.Mail />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-block w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-sm bg-indigo-600">
                          12
                        </span>
                      </div>
                      <h2 className="font-bold text-gray-800" style={{fontSize:'clamp(1rem, 2vw, 1.3rem)'}}>
                        Contact Us
                      </h2>
                    </div>
                    <div className={`flex-shrink-0 text-gray-600 transition-transform ${expandedSection === "contact" ? 'rotate-180' : ''}`}>
                      <Icons.ChevronDown />
                    </div>
                  </div>
                </div>
              </div>

              {expandedSection === "contact" && (
                <div className="mt-4 sm:mt-6 ml-9 sm:ml-12 text-gray-700 text-xs sm:text-sm space-y-3">
                  <p className="leading-relaxed">
                    For privacy-related questions or to exercise your rights, please contact us:
                  </p>
                  <div className="space-y-3 mt-4">
                    <div className="flex gap-3 items-start">
                      <Icons.Mail />
                      <div>
                        <p className="font-semibold text-gray-800">Email</p>
                        <a href="mailto:reviewbadhao@gmail.com" className="text-indigo-600 hover:text-indigo-700 break-all">
                          reviewbadhao@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Icons.Phone />
                      <div>
                        <p className="font-semibold text-gray-800">Phone</p>
                        <a href="tel:07554045078" className="text-indigo-600 hover:text-indigo-700">
                          07554045078
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <Icons.MapPin />
                      <div>
                        <p className="font-semibold text-gray-800">Address</p>
                        <p className="text-gray-700">Bhopal, Madhya Pradesh, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
            <h3 className="font-bold text-yellow-900 mb-2 text-sm sm:text-base">
              Important Notice
            </h3>
            <p className="text-yellow-800 text-xs sm:text-sm leading-relaxed">
              This Privacy Policy is binding on all users. By using our Service, you consent to our collection, use, and sharing of your personal information as described herein. If you do not agree with our practices, please do not use our Service.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER CTA ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold mb-4" style={{fontSize:'clamp(1.5rem, 3vw, 2rem)'}}>
            Questions About Our Privacy Policy?
          </h2>
          <p className="text-indigo-100 mb-8 text-xs sm:text-sm">
            We're here to help. Contact us anytime for privacy-related inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:07554045078"
              className="inline-flex items-center gap-2 sm:gap-3 bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition-all w-full sm:w-auto text-center text-xs sm:text-sm lg:text-base"
            >
              <Icons.Phone />
              Call Us
            </a>
            <a
              href="mailto:reviewbadhao@gmail.com"
              className="inline-flex items-center gap-2 sm:gap-3 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto text-center text-xs sm:text-sm lg:text-base"
            >
              <Icons.Mail />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER INFO ==================== */}
      <section className="py-8 sm:py-12 bg-gray-900 text-gray-400 text-center text-xs sm:text-sm px-4">
        <div className="max-w-4xl mx-auto">
          <p>
            © 2026 Smart Review System. All rights reserved. | 
            <a href="#" className="text-gray-300 hover:text-white ml-2">Terms of Service</a> | 
            <a href="#" className="text-gray-300 hover:text-white ml-2">Privacy Policy</a>
          </p>
        </div>
      </section>
    </>
  );
}