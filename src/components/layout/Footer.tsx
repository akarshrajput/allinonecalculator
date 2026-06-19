import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo.jpeg" alt="All In One Calculator Logo" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-display font-bold text-xl text-gray-900 tracking-tight">All In One Calculator</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Fast, accurate, and easy-to-use online calculators for everyday math, health, finance, and more.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-6">Categories</h3>
            <ul className="space-y-4">
              <li><Link href="/calculators/finance" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Finance & Business</Link></li>
              <li><Link href="/calculators/health" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Health & Fitness</Link></li>
              <li><Link href="/calculators/math" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Math & Time</Link></li>
              <li><Link href="/calculators/home" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Home & Utility</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-6">Popular</h3>
            <ul className="space-y-4">
              <li><Link href="/mortgage-calculator" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/bmi-calculator" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">BMI Calculator</Link></li>
              <li><Link href="/percentage-calculator" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Percentage Calculator</Link></li>
              <li><Link href="/age-calculator" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Age Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 tracking-widest uppercase mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} All In One Calculator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
