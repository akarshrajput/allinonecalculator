import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CalculatorHub',
  description: 'Read the privacy policy for CalculatorHub to understand how we protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-4 border-b border-gray-100 pb-8">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      <div className="text-gray-600 space-y-6 leading-relaxed">
        <p>
          At CalculatorHub ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Do NOT Collect</h3>
        <p>
          We pride ourselves on privacy. The calculations you perform on our website (such as mortgage numbers, salary, weight, or health metrics) are processed locally in your browser. <strong>We do not transmit, save, or store your calculation data on our servers.</strong>
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Information We Automatically Collect</h3>
        <p>
          When you visit our website, our servers automatically record information that your browser sends. This may include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your IP address</li>
          <li>Browser type and version</li>
          <li>The pages you visit and the time spent on those pages</li>
          <li>Other diagnostic data</li>
        </ul>
        <p>This information is used strictly for analytics, troubleshooting, and improving the user experience.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Cookies and Tracking Technologies</h3>
        <p>
          We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website may not function optimally.
        </p>
        <p><strong>Third-Party Ad Serving:</strong> We use Google AdSense to serve ads on our website. Google uses cookies (including the DoubleClick cookie) to serve ads based on your prior visits to our website or other websites on the internet. You may opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Ads Settings</a>.</p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. Third-Party Links</h3>
        <p>
          Our website may contain links to third-party websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <strong>privacy@calculatorhub.com</strong>.
        </p>
      </div>
    </div>
  );
}
