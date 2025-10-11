"use client";

import {
  Coffee,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const contactInfo = [
  {
    icon: <MapPin className="w-5 h-5 text-amber-400" />,
    text: "Plateau, Nigeria",
  },
  {
    icon: <Phone className="w-5 h-5 text-amber-400" />,
    text: "+234 806 956 9863",
  },
  {
    icon: <Mail className="w-5 h-5 text-amber-400" />,
    text: "kimscoffee24@gmail.com",
  },
];

const socialLinks = [
  {
    icon: <Facebook className="w-4 h-4 text-amber-100" />,
    href: "https://web.facebook.com/kimscoffeesNG/?_rdc=1&_rdr#",
  },
  // {
  //   icon: <Twitter className="w-4 h-4 text-amber-100" />,
  //   href: "#",
  // },
  {
    icon: <Instagram className="w-4 h-4 text-amber-100" />,
    href: "https://www.instagram.com/kimscoffees/?hl=en",
  },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-amber-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="bg-amber-600 p-4 rounded-xl">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src={Logo} alt="logo" width={100} height={100} />
              <span className="text-2xl font-bold">Kims Coffee</span>
            </Link>
            <p className="text-amber-200 mb-4">
              Bringing you the finest Nigerian coffee experience, one cup at a
              time.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map(({ icon, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Our Policies</h3>
            <ul className="space-y-2">
              {policyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-amber-200 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              {contactInfo.map(({ icon, text }, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  {icon}
                  <span className="text-amber-200">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-12 pt-8 text-center">
          <p className="text-amber-200">
            &copy; {new Date().getFullYear()} Kim Coffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
