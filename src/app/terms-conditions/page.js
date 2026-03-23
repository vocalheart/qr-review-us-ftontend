"use client";
import { useState } from "react";

export default function TermsConditions() {
  const [expandedSection, setExpandedSection] = useState(null);

  const Icons = {
    ChevronDown: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    ),
    FileText: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    Briefcase: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    CreditCard: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h4m4 0h4m-11 3h10a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
      </svg>
    ),
    Lock: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    AlertTriangle: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
    Zap: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    Link: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    XCircle: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l6-6m0 0l-6-6m6 6l6 6m0-6l-6 6" />
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
      title: "Agreement to Terms",
      color: "indigo",
      icon: Icons.FileText,
      content: "By accessing and using our Smart Review Collection System (\"Service\"), you agree to be bound by these Terms & Conditions. If you do not agree to any part of these terms, you may not use our Service. We reserve the right to modify these terms at any time, and continued use of the Service constitutes your acceptance of any changes.",
    },
    {
      num: "2",
      title: "Service Description",
      color: "purple",
      icon: Icons.Briefcase,
      content: [
        {
          subtitle: "Our Service provides a QR-based review collection and filtering system that:",
          items: [
            "Generates customizable QR codes for collecting customer feedback",
            "Automatically routes 4-5 star reviews to Google My Business",
            "Stores 1-3 star feedback privately in your dashboard",
            "Provides analytics and feedback management tools",
            "Offers integration with Google My Business and email notifications",
          ],
        },
      ],
    },
    {
      num: "3",
      title: "User Responsibilities",
      color: "pink",
      icon: Icons.Lock,
      content: [
        {
          subtitle: "You agree to:",
          items: [
            "Provide accurate business information during registration",
            "Maintain confidentiality of your login credentials",
            "Use the Service only for legitimate business purposes",
            "Comply with all applicable laws and regulations",
            "Not attempt to access other users' accounts or data",
            "Not use the Service for fraudulent or illegal activities",
            "Respond appropriately to customer feedback and reviews",
          ],
        },
      ],
    },
    {
      num: "4",
      title: "Subscription & Payment",
      color: "blue",
      icon: Icons.CreditCard,
      content: [
        {
          subtitle: "Available Plans:",
          items: [
            "Monthly Plan: ₹649 / month — billed every 30 days",
            "Quarterly Plan: ₹1,449 / 3 months — save ₹498 vs monthly",
            "Yearly Plan: ₹2,499 / year — save ₹3,289 vs monthly (includes free QR stand)",
          ],
        },
        {
          subtitle: "Payment Terms:",
          text: "Payment is processed at the start of each billing cycle. Invoices are provided via email. Payment methods include credit cards, debit cards, and online payment gateways (via Razorpay) as available in your region. Subscriptions do not auto-renew — you choose your plan duration at checkout.",
        },
        {
          subtitle: "Cancellation:",
          text: "You may cancel your subscription at any time. Upon cancellation, access continues until the end of the current billing period. No refunds are issued for unused days within a billing cycle, except as provided in our Refund Policy.",
        },
      ],
    },
    {
      num: "5",
      title: "Intellectual Property Rights",
      color: "green",
      icon: Icons.Lock,
      content: [
        {
          text: "All content, features, and functionality of our Service (including software, code, design) are owned by Smart Review System or its content providers and are protected by copyright and intellectual property laws.",
        },
        {
          text: "You are granted a limited, non-exclusive, non-transferable license to use the Service for your personal business purposes. You may not reproduce, distribute, or transmit any content without our prior written permission.",
        },
      ],
    },
    {
      num: "6",
      title: "Limitation of Liability",
      color: "yellow",
      icon: Icons.AlertTriangle,
      content: [
        {
          subtitle: "Smart Review System shall not be liable for:",
          items: [
            "Loss of revenue or business opportunities",
            "Loss of data or business interruption",
            "Inability to achieve expected results",
            "Any third-party claims or damages",
          ],
        },
        {
          text: "Our total liability shall not exceed the amount you paid for the Service in the past 12 months.",
        },
      ],
    },
    {
      num: "7",
      title: "Disclaimer of Warranties",
      color: "red",
      icon: Icons.Zap,
      content: [
        {
          text: "The Service is provided \"AS IS\" and \"AS AVAILABLE\" without any warranties of any kind. We do not guarantee that:",
        },
        {
          items: [
            "The Service will be uninterrupted or error-free",
            "All defects will be corrected",
            "Google will accept or publish all positive reviews",
            "Specific business results will be achieved",
          ],
        },
      ],
    },
    {
      num: "8",
      title: "Third-Party Services",
      color: "cyan",
      icon: Icons.Link,
      content: "Our Service integrates with Google My Business, Razorpay, and other third-party services. We are not responsible for the functionality, availability, or policies of these third-party services. Your use of third-party services is governed by their respective terms and policies.",
    },
    {
      num: "9",
      title: "Termination",
      color: "orange",
      icon: Icons.XCircle,
      content: [
        {
          subtitle: "We may terminate or suspend your account immediately for:",
          items: [
            "Violation of these Terms & Conditions",
            "Engaging in fraudulent or illegal activities",
            "Non-payment of subscription fees",
            "Harassment or abuse of our support team",
          ],
        },
        {
          text: "Upon termination, all data may be permanently deleted. You will not be entitled to a refund for the remaining subscription period, except as provided in our Refund Policy.",
        },
      ],
    },
    {
      num: "10",
      title: "Governing Law",
      color: "indigo",
      icon: Icons.Globe,
      content: "These Terms & Conditions are governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. Any disputes shall be resolved in the courts located in Bhopal, Madhya Pradesh.",
    },
  ];

  const bgColorMap = {
    indigo: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
    purple: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    pink:   "bg-pink-50 border-pink-200 hover:bg-pink-100",
    blue:   "bg-blue-50 border-blue-200 hover:bg-blue-100",
    green:  "bg-green-50 border-green-200 hover:bg-green-100",
    yellow: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
    red:    "bg-red-50 border-red-200 hover:bg-red-100",
    cyan:   "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
    orange: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  };

  const iconColorMap = {
    indigo: "text-indigo-600",
    purple: "text-purple-600",
    pink:   "text-pink-600",
    blue:   "text-blue-600",
    green:  "text-green-600",
    yellow: "text-yellow-600",
    red:    "text-red-600",
    cyan:   "text-cyan-600",
    orange: "text-orange-600",
  };

  const borderColorMap = {
    indigo: "border-indigo-600",
    purple: "border-purple-600",
    pink:   "border-pink-600",
    blue:   "border-blue-600",
    green:  "border-green-600",
    yellow: "border-yellow-600",
    red:    "border-red-600",
    cyan:   "border-cyan-600",
    orange: "border-orange-600",
  };

  const badgeBgMap = {
    indigo: "bg-indigo-600",
    purple: "bg-purple-600",
    pink:   "bg-pink-600",
    blue:   "bg-blue-600",
    green:  "bg-green-600",
    yellow: "bg-yellow-600",
    red:    "bg-red-600",
    cyan:   "bg-cyan-600",
    orange: "bg-orange-600",
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold mb-3 sm:mb-4 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Terms & Conditions
          </h1>
          <p className="text-indigo-100 text-xs sm:text-sm">
            Effective Date: January 2026 | Last Updated: March 2026
          </p>
          <p className="text-indigo-100 text-xs sm:text-sm mt-2">
            Please read our terms carefully before using our service.
          </p>
        </div>
      </section>

      {/* ── Quick Summary ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-gray-800 mb-8 text-center" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
            Key Terms at a Glance
          </h2>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                label: "Monthly",
                price: "₹649",
                period: "/ month",
                desc: "Billed every 30 days",
                badge: null,
                color: "border-slate-300 bg-slate-50",
                badgeColor: "",
              },
              {
                label: "3 Months",
                price: "₹1,449",
                period: "/ 3 months",
                desc: "Save ₹498 vs monthly",
                badge: "BEST VALUE",
                color: "border-indigo-400 bg-indigo-50",
                badgeColor: "bg-indigo-600",
              },
              {
                label: "Yearly",
                price: "₹2,499",
                period: "/ year",
                desc: "Save ₹3,289 • Free QR Stand",
                badge: "MOST POPULAR",
                color: "border-amber-400 bg-amber-50",
                badgeColor: "bg-amber-500",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative border-2 rounded-2xl p-5 text-center shadow-sm ${plan.color}`}
              >
                {plan.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[10px] font-bold px-3 py-1 rounded-full ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                )}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{plan.label}</p>
                <p className="text-2xl font-extrabold text-gray-900">{plan.price}</p>
                <p className="text-xs text-gray-500 mb-1">{plan.period}</p>
                <p className="text-xs text-gray-600 font-medium">{plan.desc}</p>
              </div>
            ))}
          </div>

          {/* Other summary cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Icons.Lock,
                title: "Your Data",
                desc: "Secure, private, and fully under your control",
              },
              {
                icon: Icons.Briefcase,
                title: "Business Use",
                desc: "Limited license for legitimate business purposes",
              },
              {
                icon: Icons.Globe,
                title: "Governed by India Law",
                desc: "Courts in Bhopal, Madhya Pradesh",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
                <div className="text-indigo-600 mb-3 flex justify-center">
                  <item.icon />
                </div>
                <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">{item.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {sections.map((section, i) => (
              <div
                key={i}
                className={`border-l-4 ${borderColorMap[section.color]} ${bgColorMap[section.color]} border rounded-r-lg p-4 sm:p-6 cursor-pointer transition-all hover:shadow-md`}
                onClick={() => setExpandedSection(expandedSection === i ? null : i)}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`flex-shrink-0 ${iconColorMap[section.color]}`}>
                    <section.icon />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center text-white font-bold text-sm ${badgeBgMap[section.color]}`}>
                            {section.num}
                          </span>
                        </div>
                        <h2 className="font-bold text-gray-800" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>
                          {section.title}
                        </h2>
                      </div>
                      <div className={`flex-shrink-0 text-gray-600 transition-transform duration-200 ${expandedSection === i ? "rotate-180" : ""}`}>
                        <Icons.ChevronDown />
                      </div>
                    </div>
                  </div>
                </div>

                {expandedSection === i && (
                  <div className="mt-4 sm:mt-6 ml-9 sm:ml-12 text-gray-700 text-xs sm:text-sm space-y-4">
                    {typeof section.content === "string" ? (
                      <p className="leading-relaxed">{section.content}</p>
                    ) : Array.isArray(section.content) ? (
                      section.content.map((block, idx) => (
                        <div key={idx}>
                          {block.subtitle && (
                            <p className="font-semibold text-gray-800 mb-2">{block.subtitle}</p>
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

            {/* Contact section */}
            <div
              className="border-l-4 border-indigo-600 bg-indigo-50 border rounded-r-lg p-4 sm:p-6 cursor-pointer transition-all hover:shadow-md"
              onClick={() => setExpandedSection(expandedSection === "contact" ? null : "contact")}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 text-indigo-600">
                  <Icons.Mail />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex w-7 h-7 sm:w-8 sm:h-8 rounded-full items-center justify-center text-white font-bold text-sm bg-indigo-600">
                          11
                        </span>
                      </div>
                      <h2 className="font-bold text-gray-800" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)" }}>
                        Contact Us
                      </h2>
                    </div>
                    <div className={`flex-shrink-0 text-gray-600 transition-transform duration-200 ${expandedSection === "contact" ? "rotate-180" : ""}`}>
                      <Icons.ChevronDown />
                    </div>
                  </div>
                </div>
              </div>

              {expandedSection === "contact" && (
                <div className="mt-4 sm:mt-6 ml-9 sm:ml-12 text-gray-700 text-xs sm:text-sm space-y-3">
                  <p className="leading-relaxed">For questions regarding these Terms & Conditions, please contact us:</p>
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
                        <a href="tel:+917554937509" className="text-indigo-600 hover:text-indigo-700">
                          +91 7554937509
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
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <h3 className="font-bold text-red-900 mb-2 text-sm sm:text-base flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              Important Legal Notice
            </h3>
            <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
              By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you are not authorized to use our Service.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold mb-4" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
            Questions About Our Terms?
          </h2>
          <p className="text-indigo-100 mb-8 text-xs sm:text-sm">
            Our support team is ready to help. Contact us — 10am to 7pm, MON–SAT
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+917554937509"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-gray-100 transition-all w-full sm:w-auto text-xs sm:text-sm lg:text-base"
            >
              <Icons.Phone />
              Call Us Now
            </a>
            <a
              href="mailto:reviewbadhao@gmail.com"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto text-xs sm:text-sm lg:text-base"
            >
              <Icons.Mail />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}