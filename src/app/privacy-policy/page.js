"use client";
export default function PrivacyPolicy() {
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
          <h1 className="font-bold mb-4" style={{fontSize:'clamp(2rem, 5vw, 3rem)'}}>Privacy Policy</h1>
          <p className="text-indigo-100">Effective Date: January 2024 | Last Updated: March 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            
            {/* Section 1 */}
            <div className="border-l-4 border-indigo-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>1. Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Smart Review System ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our Smart Review Collection System ("Service"), including our website and mobile applications.
              </p>
            </div>

            {/* Section 2 */}
            <div className="border-l-4 border-purple-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>2. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-3"><strong>Personal Information You Provide:</strong></p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                <li>• Business name, address, contact details</li>
                <li>• Owner/manager name and email address</li>
                <li>• Phone number and website URL</li>
                <li>• Google Business profile information</li>
                <li>• Payment information (credit card, bank details)</li>
                <li>• Billing and shipping addresses</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mb-3"><strong>Customer Feedback Information:</strong></p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                <li>• Star ratings (1-5 stars)</li>
                <li>• Customer comments and feedback</li>
                <li>• Customer email addresses (if provided)</li>
                <li>• Customer IP addresses</li>
                <li>• Device information (browser, OS, device type)</li>
              </ul>

              <p className="text-gray-700 leading-relaxed"><strong>Automatically Collected Information:</strong></p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Log data (IP address, access times, pages viewed)</li>
                <li>• Cookies and tracking technology</li>
                <li>• Analytics data about Service usage</li>
                <li>• Device identifiers and location data</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="border-l-4 border-pink-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>3. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">We use collected information for:</p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Creating and managing your account</li>
                <li>• Processing payments and billing</li>
                <li>• Providing and improving the Service</li>
                <li>• Routing reviews to Google My Business</li>
                <li>• Storing feedback in your private dashboard</li>
                <li>• Sending service notifications and updates</li>
                <li>• Customer support and responding to inquiries</li>
                <li>• Analytics and performance monitoring</li>
                <li>• Compliance with legal obligations</li>
                <li>• Detecting fraud and preventing abuse</li>
                <li>• Marketing communications (with your consent)</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                <li>• SSL/TLS encryption for data in transit</li>
                <li>• Encrypted storage of sensitive data</li>
                <li>• Secure password hashing</li>
                <li>• Regular security audits and updates</li>
                <li>• Access controls and authentication</li>
                <li>• Firewalls and intrusion detection</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                However, no method of transmission over the Internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. You use the Service at your own risk.
              </p>
            </div>

            {/* Section 5 */}
            <div className="border-l-4 border-green-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>5. Data Sharing & Third Parties</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We only share your information with trusted third parties for legitimate purposes:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                <li>• <strong>Google My Business:</strong> We share positive reviews to post on Google</li>
                <li>• <strong>Payment Processors:</strong> For secure payment processing</li>
                <li>• <strong>Email Service Providers:</strong> For sending notifications</li>
                <li>• <strong>Analytics Services:</strong> For usage tracking and optimization</li>
                <li>• <strong>Legal Authorities:</strong> When required by law</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties for marketing purposes.
              </p>
            </div>

            {/* Section 6 */}
            <div className="border-l-4 border-yellow-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>6. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We retain your personal information as follows:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• <strong>Active Account Data:</strong> Retained while your account is active</li>
                <li>• <strong>Customer Feedback:</strong> Retained for as long as needed for your business purposes</li>
                <li>• <strong>Payment Records:</strong> Retained for 7 years (tax compliance)</li>
                <li>• <strong>Log Data:</strong> Typically retained for 90 days</li>
                <li>• <strong>Deleted Accounts:</strong> Data deleted within 30 days of account closure</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="border-l-4 border-red-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>7. Your Rights & Choices</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                <li>• <strong>Correction:</strong> Correct inaccurate information</li>
                <li>• <strong>Deletion:</strong> Request deletion of your data (right to be forgotten)</li>
                <li>• <strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
                <li>• <strong>Portability:</strong> Receive your data in a portable format</li>
                <li>• <strong>Object:</strong> Object to certain uses of your data</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us at privacy@smartreviewsystem.com.
              </p>
            </div>

            {/* Section 8 */}
            <div className="border-l-4 border-indigo-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>8. Cookies & Tracking</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                <li>• Remember your login information</li>
                <li>• Track Service usage and preferences</li>
                <li>• Improve user experience</li>
                <li>• Analyze Service performance</li>
                <li>• Prevent fraud and security issues</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can control cookies through your browser settings. Disabling cookies may affect the functionality of the Service.
              </p>
            </div>

            {/* Section 9 */}
            <div className="border-l-4 border-purple-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>9. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our Service is not intended for children under 13 years old. We do not knowingly collect personal information from children under 13. If we discover that we have collected such information, we will delete it immediately. If you believe a child has provided information to us, please contact us immediately.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-l-4 border-pink-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>10. GDPR & International Compliance</h2>
              <p className="text-gray-700 leading-relaxed">
                If you are located in the European Union or other jurisdictions with data protection laws, you have additional rights under those laws. We comply with the General Data Protection Regulation (GDPR) and similar international privacy standards. Our processing of your data is based on legitimate business interests, contract necessity, or your consent.
              </p>
            </div>

            {/* Section 11 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>11. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of the Service constitutes your acceptance of the updated policy.
              </p>
            </div>

            {/* Section 12 */}
            <div className="border-l-4 border-green-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>12. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                For privacy-related questions or to exercise your rights, please contact us:
              </p>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@smartreviewsystem.com</p>
                <p className="text-gray-700"><strong>Phone:</strong> 94253 05534</p>
                <p className="text-gray-700"><strong>Address:</strong> Bhopal, Madhya Pradesh, India</p>
                <p className="text-gray-700"><strong>Data Protection Officer:</strong> dpo@smartreviewsystem.com</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gray-50 text-center border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-gray-600 mb-6">Your privacy is important to us. Have questions?</p>
          <a href="tel:9425305534" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-all" style={{fontSize:'12px'}}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}