"use client";
import { useState } from "react";

export default function RefundPolicy() {
  const [expandedSection, setExpandedSection] = useState(null);

  // Icon Components
  const Icons = {
    ChevronDown: () => (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
      </svg>
    ),
    AlertCircle: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Clock: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    DollarSign: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    Zap: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    CheckCircle: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    X: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l6-6m0 0L4 4m16 16L4 4" />
      </svg>
    ),
    Gift: () => (
      <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v-1m0 0H8m4 0h4M3 12a9 9 0 0118 0v6a9 9 0 01-18 0v-6zm9-12v1m0 0h4m-4 0H8" />
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
      title: "Policy Overview",
      color: "indigo",
      icon: Icons.AlertCircle,
      content: "This Refund Policy outlines our approach to billing, trial periods, and refund requests for Smart Review Collection System. Please read this policy carefully to understand our terms regarding refunds and cancellations.",
    },
   
    {
      num: "2",
      title: "No-Refund Policy",
      color: "red",
      icon: Icons.X,
      content: [
        {
          subtitle: "Important: We Do NOT Offer Refunds",
          text: ", NO REFUNDS are available under any circumstances. This is a strict no-refund policy.",
        },
        {
          subtitle: "What This Means:",
          items: [
            "Once billing starts (after day 14), charges cannot be refunded",
            "All monthly charges are final once payment is processed",
            "No partial refunds for unused portions of service",
            "No refunds for billing errors (we correct them going forward)",
            "No refunds even if you request cancellation later",
          ],
        },
        {
          subtitle: "Why No Refunds?",
          text: "Our service provides immediate access to review generation, QR code creation, and dashboard analytics. Once payment is made and the service is activated, these benefits are provided and cannot be returned. The generous 14-day free trial allows you to test everything before committing.",
        },
      ],
    },
    {
      num: "3",
      title: "Cancellation (Without Refund)",
      color: "blue",
      icon: Icons.Clock,
      content: [
        {
          subtitle: "How to Cancel:",
          items: [
            "Log into your account and go to Settings → Billing → Cancel Subscription",
            "Or email us at reviewbadhao@gmail.com with 'CANCELLATION REQUEST' in subject",
            "Cancellations are processed within 24-48 hours",
          ],
        },
        {
          subtitle: "After Cancellation:",
          items: [
            "You will not be charged for future months",
            "Your access ends at the end of your current billing period",
            "All data will be permanently deleted within 30 days",
            "QR codes will stop functioning",
            "You can rejoin anytime by subscribing again",
          ],
        },
      ],
    },
    {
      num: "4",
      title: "Subscription Details",
      color: "purple",
      icon: Icons.DollarSign,
      content: [
        {
          subtitle: "Pricing:",
          items: [
            "Monthly subscription: ₹2,499 per month",
            "Billing date: Same day each month",
            "Payment methods: Credit card, debit card, online payment gateways",
            "Invoices: Sent via email after each payment",
          ],
        },
        {
          subtitle: "Automatic Renewal:",
          text: "Your subscription automatically renews each month. Billing will continue until you cancel. To avoid charges, cancel at least 24 hours before your next billing date.",
        },
      ],
    },
    {
      num: "5",
      title: "Billing Errors & Disputes",
      color: "yellow",
      icon: Icons.AlertCircle,
      content: [
        {
          subtitle: "What We'll Do:",
          items: [
            "Duplicate charges: Immediately reversed upon verification",
            "Wrong amounts: Corrected in next billing cycle",
            "Unauthorized charges: Full investigation and resolution",
            "Response time: Within 24-48 hours of your complaint",
          ],
        },
        {
          subtitle: "How to Report:",
          text: "Email us immediately at reviewbadhao@gmail.com with proof (bank statement, receipt, etc.). Please do NOT file a chargeback without contacting us first.",
        },
      ],
    },
    {
      num: "6",
      title: "Chargeback Policy",
      color: "orange",
      icon: Icons.X,
      content: [
        {
          subtitle: "Important Warning:",
          items: [
            "Do NOT file a chargeback without contacting us first",
            "Chargebacks may result in account suspension",
            "We may pursue legal action for fraudulent chargebacks",
            "Future refund requests will be denied for chargeback accounts",
          ],
        },
        {
          subtitle: "Better Option:",
          text: "Contact us first. We're here to help and will resolve any legitimate billing issues quickly and fairly.",
        },
      ],
    },
    {
      num: "8",
      title: "Data After Cancellation",
      color: "pink",
      icon: Icons.AlertCircle,
      content: [
        {
          subtitle: "Upon Account Closure:",
          items: [
            "All data deleted within 30 days",
            "QR codes stop functioning",
            "Customer feedback and analytics become inaccessible",
            "Published Google reviews remain on Google (cannot be removed)",
            "No recovery possible after deletion",
          ],
        },
        {
          subtitle: "Important:",
          text: "Back up any important data before cancelling. We cannot recover deleted data.",
        },
      ],
    },
    {
      num: "9",
      title: "Special Cases & Exceptions",
      color: "cyan",
      icon: Icons.CheckCircle,
      content: [
        {
          subtitle: "Rare Exceptions (At Our Sole Discretion):",
          items: [
            "Service outage >48 hours: May receive account credit",
            "Technical issues preventing access: May receive partial credit",
            "Account suspension due to our error: May receive credit or extension",
            "Cases are reviewed individually - no guarantees",
          ],
        },
        {
          subtitle: "How to Request:",
          text: "Email reviewbadhao@gmail.com with detailed explanation and supporting evidence. We will review and respond within 3-5 business days.",
        },
      ],
    },
    {
      num: "10",
      title: "Payment Methods",
      color: "indigo",
      icon: Icons.DollarSign,
      content: [
        {
          subtitle: "Accepted Methods:",
          items: [
            "Credit cards (Visa, MasterCard, American Express)",
            "Debit cards",
            "Online payment gateways (UPI, Netbanking, etc.)",
            "Digital wallets as available",
          ],
        },
        {
          subtitle: "Payment Security:",
          text: "All payments are processed through secure, encrypted payment gateways. Your financial information is never stored on our servers.",
        },
      ],
    },
    {
      num: "11",
      title: "Contact Support",
      color: "green",
      icon: Icons.Mail,
      content: [
        {
          subtitle: "For Billing & Subscription Questions:",
          items: [
            "Email: reviewbadhao@gmail.com",
            "Subject line: BILLING INQUIRY or REFUND QUESTION",
            "Phone: +917554937509",
            "Hours: Monday - Friday, 9 AM - 6 PM IST",
          ],
        },
        {
          subtitle: "Include in Your Message:",
          items: [
            "Your account email address",
            "Order ID or transaction ID",
            "Clear description of your issue",
            "Screenshots if applicable",
          ],
        },
      ],
    },
    {
      num: "12",
      title: "Policy Updates",
      color: "purple",
      icon: Icons.Clock,
      content: "We may update this Refund Policy at any time. Changes will be posted on this page with an updated 'Last Updated' date. Your continued use of the Service constitutes your acceptance of any changes to the Refund Policy.",
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

  const borderColorMap = {
    indigo: "border-indigo-600",
    purple: "border-purple-600",
    pink: "border-pink-600",
    blue: "border-blue-600",
    green: "border-green-600",
    yellow: "border-yellow-600",
    red: "border-red-600",
    cyan: "border-cyan-600",
    orange: "border-orange-600",
  };

  const badgeBgMap = {
    indigo: "bg-indigo-600",
    purple: "bg-purple-600",
    pink: "bg-pink-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    yellow: "bg-yellow-600",
    red: "bg-red-600",
    cyan: "bg-cyan-600",
    orange: "bg-orange-600",
  };

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold mb-3 sm:mb-4 leading-tight" style={{fontSize:'clamp(2rem, 5vw, 3rem)'}}>
            Refund Policy
          </h1>
          <p className="text-indigo-100 text-xs sm:text-sm">
            Effective Date: January 2026 | Last Updated: March 2026
          </p>
          <p className="text-indigo-100 text-xs sm:text-sm mt-2">
            No-Refund Policy with 14-Day Free Trial. Read carefully before subscribing.
          </p>
        </div>
      </section>

      {/* ==================== QUICK SUMMARY SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-gray-800 mb-8 text-center" style={{fontSize:'clamp(1.4rem, 3vw, 2rem)'}}>
            Key Points
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
             
              { 
                icon: Icons.X, 
                title: "NO REFUNDS", 
                desc: "After trial ends, no refunds available"
              },
              { 
                icon: Icons.Clock, 
                title: "Cancel Anytime", 
                desc: "Stop future charges, no penalties"
              },
              { 
                icon: Icons.DollarSign, 
                title: "₹2,499/month", 
                desc: "Transparent monthly pricing"
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center">
                <div className={item.title === "NO REFUNDS" ? "text-red-600" : "text-indigo-600"} style={{marginBottom: "12px", display: "flex", justifyContent: "center"}}>
                  <item.icon />
                </div>
                <h3 className={`font-bold ${item.title === "NO REFUNDS" ? "text-red-700" : "text-gray-800"} mb-2 text-sm sm:text-base`}>
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
                className={`border-l-4 ${borderColorMap[section.color]} ${bgColorMap[section.color]} border rounded-r-lg p-4 sm:p-6 cursor-pointer transition-all hover:shadow-md`}
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
                          <span className={`inline-block w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${badgeBgMap[section.color]}`}>
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
          </div>

          {/* Important Notice */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
            <h3 className="font-bold text-red-900 mb-3 text-sm sm:text-base flex items-center gap-2">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              NO-REFUND POLICY
            </h3>
            <p className="text-red-800 text-xs sm:text-sm leading-relaxed">
              This is a NO-REFUND policy., no refunds are available under ANY circumstances. Use your free trial to test everything before committing. Once you understand the service and are ready to pay, you accept this no-refund policy.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-gray-800 mb-8 text-center" style={{fontSize:'clamp(1.3rem, 3vw, 1.8rem)'}}>
            Common Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Do I need a credit card for the free trial?",
                a: "No! The 14-day free trial requires NO credit card. You only pay after the trial ends if you choose to continue."
              },
              {
                q: "When does billing start?",
                a: "On day 15 of your free trial. You'll receive a reminder email before the first charge is made."
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes! You can cancel anytime. You won't be charged for future months, but we do NOT offer refunds for past charges."
              },
              {
                q: "What if I change my mind after paying?",
                a: "Once payment is made, it's final. No refunds are issued. This is why we offer a full 14-day free trial to test everything first."
              },
              {
                q: "What happens to my data after cancellation?",
                a: "All your data will be permanently deleted within 30 days. Download any important data before cancelling."
              },
              {
                q: "How long does cancellation take?",
                a: "Cancellations are processed within 24-48 hours. You'll have access until the end of your current billing period."
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-800 mb-3 text-sm sm:text-base">
                  {item.q}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FOOTER CTA ==================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
         
          <p className="text-indigo-100 mb-8 text-xs sm:text-sm">
            No credit card needed. Full access to all features. Cancel anytime during the trial with zero charges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           
            <a
              href="mailto:reviewbadhao@gmail.com"
              className="inline-flex items-center gap-2 sm:gap-3 border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white hover:text-indigo-600 transition-all w-full sm:w-auto text-center text-xs sm:text-sm lg:text-base"
            >
              <Icons.Mail />
              Ask Questions
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER INFO ==================== */}
      <section className="py-8 sm:py-12 bg-gray-900 text-gray-400 text-center text-xs sm:text-sm px-4">
        <div className="max-w-4xl mx-auto">
          <p className="mb-4">
            <strong>Contact Us:</strong> reviewbadhao@gmail.com | +917554937509 | Bhopal, Madhya Pradesh, India
          </p>
          <p>
            © 2026 ReviewBadhao. All rights reserved. | 
            <a href="#" className="text-gray-300 hover:text-white ml-2">Privacy Policy</a> | 
            <a href="#" className="text-gray-300 hover:text-white ml-2">Terms of Service</a>
          </p>
        </div>
      </section>
    </>
  );
}