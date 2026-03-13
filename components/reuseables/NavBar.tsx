"use client";

import { Coffee, Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import logo from "../../public/logo.png";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/track", label: "Track Purchase" },
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
    <nav
      className={`${
        pathname === "/admin" ? "hidden" : "block"
      } bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href={"/"}
            prefetch
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <Image
                src={logo}
                alt="logo"
                className="h-10 w-10"
                height={15}
                width={15}
              />
              <span className="text-2xl font-bold text-amber-900">
                Kims Coffee
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={linkClass(href)}
                prefetch={true}
              >
                {label}
              </Link>
            ))}
            <Link
              href={"/cart"}
              className="bg-amber-700 p-2 flex rounded-md hover:bg-amber-800 text-white"
              prefetch={true}
            >
              Cart
              <ShoppingCart className="w-5 h-5 mx-2 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
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
                prefetch={true}
              >
                {label}
              </Link>
            ))}

            <Link
              href={"/cart"}
              className="mx-3 mt-2 bg-amber-700 text-center p-2 rounded-md hover:bg-amber-800 text-white w-[90%] absolute bottom-[90px]"
              onClick={() => setIsMenuOpen(false)}
              prefetch={true}
            >
              <div className="flex items-center justify-center max-w-10">
                Cart
                <ShoppingCart className="w-5 h-5 mx-2 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>{" "}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
