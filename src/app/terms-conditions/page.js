"use client";
export default function TermsConditions() {
  return (
    <>
      <style jsx global>{`
        html, body {
          font-size: 12px;
        }
        * {
          font-size: inherit;
        }`}
      </style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold mb-4" style={{fontSize:'clamp(2rem, 5vw, 3rem)'}}>Terms & Conditions</h1>
          <p className="text-indigo-100">Effective Date: January 2024 | Last Updated: March 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            
            {/* Section 1 */}
            <div className="border-l-4 border-indigo-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                By accessing and using our Smart Review Collection System ("Service"), you agree to be bound by these Terms & Conditions. If you do not agree to any part of these terms, you may not use our Service. We reserve the right to modify these terms at any time, and continued use of the Service constitutes your acceptance of any changes.
              </p>
            </div>

            {/* Section 2 */}
            <div className="border-l-4 border-purple-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our Service provides a QR-based review collection and filtering system that:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Generates customizable QR codes for collecting customer feedback</li>
                <li>• Automatically routes 4-5 star reviews to Google My Business</li>
                <li>• Stores 1-3 star feedback privately in your dashboard</li>
                <li>• Provides analytics and feedback management tools</li>
                <li>• Offers integration with Google My Business and email notifications</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="border-l-4 border-pink-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>3. User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed mb-3">You agree to:</p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Provide accurate business information during registration</li>
                <li>• Maintain confidentiality of your login credentials</li>
                <li>• Use the Service only for legitimate business purposes</li>
                <li>• Comply with all applicable laws and regulations</li>
                <li>• Not attempt to access other users' accounts or data</li>
                <li>• Not use the Service for fraudulent or illegal activities</li>
                <li>• Respond appropriately to customer feedback and reviews</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>4. Subscription & Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Pricing:</strong> Our standard subscription is ₹2,499 per month.
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                <li>• Free trial: 14 days with full access to all features</li>
                <li>• No credit card required for the trial</li>
                <li>• Billing begins after the trial period ends</li>
                <li>• Subscription renews automatically each month</li>
                <li>• You can cancel anytime before the next billing cycle</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>Payment Terms:</strong> Payment will be processed monthly. Invoices are provided via email. Payment methods include credit cards, debit cards, and online payment gateways as available in your region.
              </p>
            </div>

            {/* Section 5 */}
            <div className="border-l-4 border-green-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>5. Intellectual Property Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                All content, features, and functionality of our Service (including software, code, design) are owned by Smart Review System or its content providers and are protected by copyright and intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You are granted a limited, non-exclusive, non-transferable license to use the Service for your personal business purposes. You may not reproduce, distribute, or transmit any content without our prior written permission.
              </p>
            </div>

            {/* Section 6 */}
            <div className="border-l-4 border-yellow-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>6. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To the fullest extent permitted by law, Smart Review System shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Loss of revenue or business opportunities</li>
                <li>• Loss of data or business interruption</li>
                <li>• Inability to achieve expected results</li>
                <li>• Any third-party claims or damages</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Our total liability shall not exceed the amount you paid for the Service in the past 12 months.
              </p>
            </div>

            {/* Section 7 */}
            <div className="border-l-4 border-red-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>7. Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind. We do not guarantee that:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mt-3">
                <li>• The Service will be uninterrupted or error-free</li>
                <li>• All defects will be corrected</li>
                <li>• Google will accept or publish all positive reviews</li>
                <li>• Specific business results will be achieved</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="border-l-4 border-indigo-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>8. Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service integrates with Google My Business and other third-party services. We are not responsible for the functionality, availability, or policies of these third-party services. Your use of third-party services is governed by their respective terms and policies.
              </p>
            </div>

            {/* Section 9 */}
            <div className="border-l-4 border-purple-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>9. Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may terminate or suspend your account immediately, without prior notice or liability, for:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Violation of these Terms & Conditions</li>
                <li>• Engaging in fraudulent or illegal activities</li>
                <li>• Non-payment of subscription fees</li>
                <li>• Harassment or abuse of our support team</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Upon termination, all data may be permanently deleted. You will not be entitled to a refund for the remaining subscription period, except as provided in our Refund Policy.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-l-4 border-pink-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>10. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms & Conditions are governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. Any disputes shall be resolved in the courts located in Bhopal, Madhya Pradesh.
              </p>
            </div>

            {/* Section 11 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions regarding these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> vocalheart.tech@gmail.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> 94253 05534</p>
                <p className="text-gray-700"><strong>Address:</strong> Bhopal, Madhya Pradesh, India</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gray-50 text-center border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-gray-600 mb-6">Have questions about our Terms?</p>
          <a href="tel:9425305534" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all" style={{fontSize:'12px'}}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            Contact Our Support Team
          </a>
        </div>
      </section>
    </>
  );
}