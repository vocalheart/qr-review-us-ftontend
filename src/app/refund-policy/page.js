"use client";
export default function RefundPolicy() {
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
          <h1 className="font-bold mb-4" style={{fontSize:'clamp(2rem, 5vw, 3rem)'}}>Refund Policy</h1>
          <p className="text-indigo-100">Effective Date: January 2024 | Last Updated: March 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            
            {/* Quick Summary */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border-l-4 border-green-600 p-6 rounded-lg">
              <h2 className="font-bold text-green-800 mb-3" style={{fontSize:'clamp(1.1rem, 2vw, 1.3rem)'}}>Quick Summary</h2>
              <ul className="space-y-2 text-green-900">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span><strong>30-Day Money-Back Guarantee</strong> on your first month</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span><strong>No questions asked</strong> if unsatisfied</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span><strong>Full refund</strong> within 30 days</span>
                </li>
                
              </ul>
            </div>

            {/* Section 1 */}
            <div className="border-l-4 border-indigo-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>1. Money-Back Guarantee</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Smart Review System offers a <strong>30-Day Money-Back Guarantee</strong> on your first subscription month. If you are not completely satisfied with our Service for any reason, you can request a full refund within 30 days of your first payment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>Subscription Cost:</strong> ₹2,499 per month
              </p>
            </div>

            {/* Section 2 */}
            <div className="border-l-4 border-purple-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>2. Free Trial Period</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We offer a <strong>14-day free trial</strong> with full access to all Service features:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Full access to all tools and features</li>
                <li>• Unlimited QR code generation</li>
                <li>• Complete feedback dashboard</li>
                <li>• Google My Business integration</li>
                <li>• Support team access</li>
                <li>• <strong>No credit card required</strong> to start</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                After the 14-day trial, billing begins automatically unless you cancel before the trial ends.
              </p>
            </div>

            {/* Section 3 */}
            <div className="border-l-4 border-pink-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>3. Refund Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>You are eligible for a full refund if:</strong>
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-4">
                <li>• You submit a refund request within 30 days of payment</li>
                <li>• Your refund request is the first month only</li>
                <li>• You have used the Service in good faith</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>You may NOT be eligible for a refund if:</strong>
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Your request is made after 30 days of the first payment</li>
                <li>• You are requesting a refund for charges beyond the first month</li>
                <li>• Your account was used for fraudulent, illegal, or abusive purposes</li>
                <li>• You violated our Terms & Conditions</li>
                <li>• You are requesting a refund for subsequent billing cycles</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>4. How to Request a Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                To request a refund, follow these simple steps:
              </p>
              <div className="space-y-4 ml-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{fontSize:'12px'}}>1</div>
                  <div>
                    <p className="text-gray-700"><strong>Email our support team:</strong></p>
                    <p className="text-gray-600">Send an email to <strong>vocalheart.tech@gmail.com</strong> with "REFUND REQUEST" in the subject line</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{fontSize:'12px'}}>2</div>
                  <div>
                    <p className="text-gray-700"><strong>Provide your details:</strong></p>
                    <p className="text-gray-600">Include your account email, order ID, and reason for refund request</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{fontSize:'12px'}}>3</div>
                  <div>
                    <p className="text-gray-700"><strong>Verification:</strong></p>
                    <p className="text-gray-600">We will verify your refund request and confirm eligibility</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{fontSize:'12px'}}>4</div>
                  <div>
                    <p className="text-gray-700"><strong>Refund Processing:</strong></p>
                    <p className="text-gray-600">Approved refunds are processed within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div className="border-l-4 border-green-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>5. Refund Processing Time</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Once your refund request is approved:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• <strong>Initial Review:</strong> 1-2 business days</li>
                <li>• <strong>Approval:</strong> We will notify you via email</li>
                <li>• <strong>Processing:</strong> 5-7 business days to appear in your account</li>
                <li>• <strong>Confirmation Email:</strong> You will receive a confirmation email with refund details</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                The time taken may vary depending on your bank and payment method. Some banks may take longer to credit the refund to your account.
              </p>
            </div>

            {/* Section 6 */}
            <div className="border-l-4 border-yellow-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>6. Subscription Cancellation</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                You can cancel your subscription at any time:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                <li>• <strong>Free Trial:</strong> Cancel anytime without charges</li>
                <li>• <strong>Paid Subscription:</strong> Cancel before the next billing date for no further charges</li>
                <li>• <strong>Full Refund:</strong> Only within 30 days of first payment (see refund eligibility)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                <strong>How to Cancel:</strong> Log into your account and go to Settings → Billing → Cancel Subscription, or email us at vocalheart.tech@gmail.com
              </p>
            </div>

            {/* Section 7 */}
            <div className="border-l-4 border-red-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>7. No Refund After 30 Days</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Important:</strong> No refunds will be issued for charges beyond the first 30 days. This includes:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Subsequent monthly payments after the first month</li>
                <li>• Partial months (we only refund in full month units)</li>
                <li>• Annual plans after the 30-day guarantee period</li>
                <li>• Upgrades or additional features purchased</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                If you want to cancel after 30 days, you can do so without receiving a refund, and you will not be charged for future months.
              </p>
            </div>

            {/* Section 8 */}
            <div className="border-l-4 border-indigo-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>8. Billing & Account Issues</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Billing Errors:</strong> If you notice a billing error or duplicate charge:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                <li>• Contact us immediately at vocalheart.tech@gmail.com</li>
                <li>• Provide proof of the error (receipt, bank statement, etc.)</li>
                <li>• We will investigate and correct billing errors within 5-7 business days</li>
                <li>• Duplicate charges will be refunded immediately upon verification</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We take billing accuracy seriously and will resolve any issues promptly.
              </p>
            </div>

            {/* Section 9 */}
            <div className="border-l-4 border-purple-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>9. Chargeback Disputes</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                If you dispute a charge through your credit card company or bank without first contacting us:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• We may not be able to refund the amount</li>
                <li>• Your account may be suspended</li>
                <li>• Future refund requests may be denied</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                Please contact us first to resolve any issues. We are here to help and will work with you to find a solution.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-l-4 border-pink-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>10. Special Cases & Exceptions</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>We may offer refunds in special circumstances:</strong>
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Service outages lasting more than 48 hours (partial refund)</li>
                <li>• Technical issues preventing Service use (at our discretion)</li>
                <li>• Account suspension due to our error (full refund)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                These are determined on a case-by-case basis. Contact our support team to discuss your situation.
              </p>
            </div>

            {/* Section 11 */}
            <div className="border-l-4 border-blue-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>11. Data After Refund</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Important:</strong> Upon refund and account closure:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4 mb-3">
                <li>• All your data will be permanently deleted within 30 days</li>
                <li>• QR codes will stop functioning</li>
                <li>• Customer feedback and analytics will no longer be accessible</li>
                <li>• Google reviews that were posted will remain on Google</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Please ensure you have backed up any important data before requesting a refund.
              </p>
            </div>

            {/* Section 12 */}
            <div className="border-l-4 border-green-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>12. Contact Support</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                For refund requests or billing questions, please contact us:
              </p>
              <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> vocalheart.tech@gmail.com</p>
                <p className="text-gray-700"><strong>Subject:</strong> REFUND REQUEST (for refund inquiries)</p>
                <p className="text-gray-700"><strong>Phone:</strong> 94253 05534</p>
                <p className="text-gray-700"><strong>Hours:</strong> Monday - Friday, 9 AM - 6 PM IST</p>
                <p className="text-gray-700"><strong>Address:</strong> Bhopal, Madhya Pradesh, India</p>
              </div>
            </div>

            {/* Section 13 */}
            <div className="border-l-4 border-orange-600 pl-6">
              <h2 className="font-bold text-gray-800 mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>13. Policy Updates</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Refund Policy at any time. Changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Service constitutes your acceptance of any changes to the Refund Policy.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Mini Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-bold text-gray-800 mb-8 text-center" style={{fontSize:'clamp(1.3rem, 3vw, 1.8rem)'}}>Refund Questions?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-800 mb-3" style={{fontSize:'clamp(1rem, 1.8vw, 1.1rem)'}}>Do I need a credit card for the free trial?</h3>
              <p className="text-gray-600" style={{fontSize:'12px'}}>No! Our 14-day free trial requires no credit card. You only pay after the trial ends.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-800 mb-3" style={{fontSize:'clamp(1rem, 1.8vw, 1.1rem)'}}>When does billing start?</h3>
              <p className="text-gray-600" style={{fontSize:'12px'}}>After your 14-day free trial ends. You'll receive a reminder email before charging begins.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-800 mb-3" style={{fontSize:'clamp(1rem, 1.8vw, 1.1rem)'}}>Can I get a refund after 30 days?</h3>
              <p className="text-gray-600" style={{fontSize:'12px'}}>No, the 30-day refund guarantee only applies to your first month. After 30 days, you can cancel to prevent future charges.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-gray-800 mb-3" style={{fontSize:'clamp(1rem, 1.8vw, 1.1rem)'}}>How long does refund processing take?</h3>
              <p className="text-gray-600" style={{fontSize:'12px'}}>Approved refunds are processed within 5-7 business days, depending on your bank.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-center border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-bold mb-4" style={{fontSize:'clamp(1.2rem, 2.5vw, 1.5rem)'}}>Ready to Try Risk-Free?</h2>
          <p className="text-indigo-100 mb-6">Start your 14-day free trial today with our 30-day money-back guarantee!</p>
          <a href="tel:9425305534" className="inline-flex items-center gap-2 bg-yellow-400 text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all" style={{fontSize:'12px'}}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            Start Free Trial
          </a>
        </div>
      </section>
    </>
  );
}