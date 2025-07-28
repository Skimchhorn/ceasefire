// src/components/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold mb-2">Voices for Peace</h3>
            <p className="text-sm text-gray-400">
              Building bridges through storytelling and shared humanity.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <Link href="/about" className="mb-2 border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="mb-2 border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="mb-2 border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Column 3: Support */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-4 text-lg font-semibold">Support</h4>
            <Link href="/donate" className="mb-2 border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors">
              Donate
            </Link>
            <Link href="/volunteer" className="mb-2 border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors">
              Volunteer
            </Link>
            <Link href="/partners" className="mb-2 border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors">
              Partner with Us
            </Link>
            <Link href="/newsletter" className="border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors">
              Newsletter
            </Link>
          </div>

          {/* Column 4: News Sources */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="mb-4 text-lg font-semibold">News Sources</h4>
            <Link
              href="https://www.cnn.com"
              target="_blank"
              rel="noreferrer"
              className="mb-2 border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors"
            >
              CNN
            </Link>
            <Link
              href="https://www.bbc.com"
              target="_blank"
              rel="noreferrer"
              className="mb-2 border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors"
            >
              BBC
            </Link>
            <Link
              href="https://www.reuters.com"
              target="_blank"
              rel="noreferrer"
              className="border-b border-gray-700 text-gray-400 hover:border-white hover:text-white transition-colors"
            >
              Reuters
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Voices for Peace. All rights reserved.</p>
      </div>
    </footer>
  )
}
