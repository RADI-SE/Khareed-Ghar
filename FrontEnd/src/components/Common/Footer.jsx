import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Khareed-Ghar</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your one-stop destination for all your shopping needs. Experience the best in online retail with quality products and exceptional service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <FaPhone className="h-5 w-5 mr-3" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaEnvelope className="h-5 w-5 mr-3" />
                <span>support@khareedghar.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors duration-200">Products</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
            <p className="text-gray-300 text-sm">Subscribe for updates and offers!</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-blue-800 text-white placeholder-gray-400 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200">
                Subscribe
              </button>
            </div>
            <div className="pt-4">
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <FaFacebook className="h-6 w-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
                  <FaInstagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 py-6">
          <p className="text-center text-gray-300 text-sm">
            © {new Date().getFullYear()} Khareed-Ghar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer