import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="font-display font-bold text-xl sm:text-2xl text-gray-900 tracking-tight">All In One Calculator</span>
          </Link>
          <nav className="hidden sm:flex sm:space-x-10">
            <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              All Calculators
            </Link>
            <Link href="/blog" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
