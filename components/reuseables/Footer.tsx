import { Coffee, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer id="contact" className="bg-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Coffee className="w-8 h-8 text-amber-400" />
                <span className="text-2xl font-bold">Kim Coffee</span>
              </Link>
              <p className="text-amber-200 mb-4">
                Bringing you the finest Nigerian coffee experience, one cup at a
                time.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">i</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    Arabica Coffee
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    Robusta Blend
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    Espresso
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    Ground Coffee
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-200">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-200">+234 800 123 4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-400" />
                  <span className="text-amber-200">hello@kimcoffee.ng</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-12 pt-8 text-center">
            <p className="text-amber-200">
              &copy; 2025 Kim Coffee. All rights reserved. Made with ❤️ in
              Nigeria.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
