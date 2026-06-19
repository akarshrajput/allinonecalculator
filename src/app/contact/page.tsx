import { Metadata } from 'next';
import { getGlobalKeywords } from '@/lib/calculatorData';

export const metadata: Metadata = {
  title: 'Contact Us | All In One Calculator',
  description: 'Get in touch with the All In One Calculator team for support, feedback, or business inquiries.',
  keywords: getGlobalKeywords(),
  alternates: {
    canonical: 'https://www.allinonecalculator.fun/contact'
  }
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">Contact Us</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input type="text" id="first-name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-colors" />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" id="last-name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-colors" />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select id="subject" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-colors">
              <option>General Inquiry</option>
              <option>Report a Bug / Error</option>
              <option>Suggest a New Calculator</option>
              <option>Business / Partnership</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-colors"></textarea>
          </div>

          <button type="button" className="w-full bg-gray-900 text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition-colors">
            Send Message
          </button>
        </form>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        <p>Prefer email? Reach out directly to <strong>support@allinonecalculator.fun</strong></p>
      </div>
    </div>
  );
}
