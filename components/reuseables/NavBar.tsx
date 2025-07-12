"use client";
import { Coffee, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
            <Link href="/" className="text-amber-700 font-semibold">
              Home
            </Link>
            <Link
              href="/about"
              className="text-amber-900 hover:text-amber-700 transition-colors"
            >
              About
            </Link>
            <Link
              href="/products"
              className="text-amber-900 hover:text-amber-700 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="text-amber-900 hover:text-amber-700 transition-colors"
            >
              Contact
            </Link>
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
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-amber-700 font-semibold"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-amber-900 hover:text-amber-700"
            >
              About
            </Link>
            <Link
              href="/products"
              className="block px-3 py-2 text-amber-900 hover:text-amber-700"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-amber-900 hover:text-amber-700"
            >
              Contact
            </Link>
            <Button className="mx-3 mt-2 bg-amber-700 hover:bg-amber-800 text-white w-full">
              Order Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
