"use client";

import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Premium Coffee", href: "/products" },
  { label: "Contact Us", href: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund Policy", href: "/refund" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

const contactDetails = [
  {
    icon: <MapPin className="w-5 h-5" />,
    text: "Satelocost, Jos, Nigeria",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    text: "+234 806 956 9863",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    text: "kimscoffee24@gmail.com",
  },
];

const socialPlatforms = [
  {
    icon: <Facebook className="w-5 h-5" />,
    href: "https://web.facebook.com/kimscoffeesNG/?_rdc=1&_rdr#",
    label: "Facebook"
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    href: "https://www.instagram.com/kimscoffees/?hl=en",
    label: "Instagram"
  },
];

const Footer = () => {
  const pathname = usePathname();
  
  if (pathname === "/admin") return null;

  return (
    <footer className="relative bg-[#0F0A05] text-white pt-24 pb-12 overflow-hidden">
      {/* Decorative Gradient Top Border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-800/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Brand Identity */}
          <div className="md:col-span-12 lg:col-span-4 space-y-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-4 group"
              prefetch={true}
            >
              <div className="relative w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-amber-500/50 transition-colors overflow-hidden">
                <Image 
                  src={Logo} 
                  alt="Kim Coffee" 
                  width={48} 
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase">
                  Kim<span className="text-amber-600">Coffee</span>
                </h2>
                <p className="text-[10px] font-bold tracking-[0.2em] text-amber-500/60 uppercase">
                  Est. 2024 • Plateau, NG
                </p>
              </div>
            </Link>
            
            <p className="text-amber-100/60 text-lg leading-relaxed max-w-sm">
              Crafting a legacy of excellence through 100% Arabica Nigerian beans. Every cup tells a story of our heritage.
            </p>

            <div className="flex gap-4">
              {socialPlatforms.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all duration-300 border border-white/10 hover:border-amber-600 group"
                  aria-label={label}
                >
                  <span className="group-hover:scale-110 transition-transform">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-4 lg:col-span-2 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500/40">Navigation</h3>
            <ul className="space-y-4">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-amber-100/70 hover:text-white flex items-center gap-2 group transition-colors font-medium"
                    prefetch={true}
                  >
                    <span>{label}</span>
                    <ArrowRight className="w-0 h-4 group-hover:w-4 transition-all opacity-0 group-hover:opacity-100 text-amber-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500/40">Legal & Privacy</h3>
            <ul className="space-y-4">
              {policyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-amber-100/70 hover:text-white flex items-center gap-2 group transition-colors font-medium"
                    prefetch={true}
                  >
                    <span>{label}</span>
                    <ArrowRight className="w-0 h-4 group-hover:w-4 transition-all opacity-0 group-hover:opacity-100 text-amber-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500/40">Reach Out</h3>
            <div className="space-y-6">
              {contactDetails.map(({ icon, text }, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="mt-1 text-amber-600 transition-colors">
                    {icon}
                  </div>
                  <span className="text-amber-100/70 font-medium group-hover:text-amber-100 transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-amber-100/30 text-sm font-medium">
            &copy; {new Date().getFullYear()} Kim Coffee. Handcrafted with passion in Nigeria.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/20">
            <span>Premium Cultivation</span>
            <span>Ethical Sourcing</span>
            <span>Expert Roasting</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
