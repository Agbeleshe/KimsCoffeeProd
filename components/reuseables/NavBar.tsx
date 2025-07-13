"use client";

import { Coffee, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `transition-colors ${
      pathname === href
        ? "font-bold text-amber-700"
        : "text-amber-900 hover:text-amber-700"
    }`;

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Coffee className="w-8 h-8 text-amber-700" />
            <span className="text-2xl font-bold text-amber-900">
              Kim Coffee
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
            <Button className="bg-amber-700 hover:bg-amber-800 text-white">
              Order Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-900 hover:text-amber-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t absolute top-16 left-0 w-full h-[100vh] shadow-lg z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 max-w-[100vw] h-full overflow-hidden relative">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 ${linkClass(href)}`}
              >
                {label}
              </Link>
            ))}

            <Button
              className="mx-3 mt-2 bg-amber-700 hover:bg-amber-800 text-white w-[90%] absolute bottom-[90px]"
              onClick={() => setIsMenuOpen(false)}
            >
              Order Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
