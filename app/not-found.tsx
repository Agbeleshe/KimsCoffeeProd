"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, Home, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F0A05] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Icon/Visual */}
          <div className="relative inline-block">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="bg-gradient-to-br from-amber-600 to-orange-800 p-8 rounded-[40px] shadow-2xl relative z-10"
            >
              <Coffee className="w-24 h-24 text-white" strokeWidth={1.5} />
            </motion.div>
            {/* Spilled Effect Decorative Ring */}
            <div className="absolute inset-0 bg-amber-600/20 blur-3xl rounded-full scale-150 -z-10" />
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter">
              40<span className="text-amber-600">4</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-100">
              Oops! This roast is missing.
            </h2>
            <p className="text-amber-100/60 text-lg max-w-md mx-auto font-medium leading-relaxed">
              It seems the page you're looking for has evaporated. Let's get you back to the aroma of fresh beans.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 h-16 rounded-2xl text-lg font-bold shadow-xl shadow-amber-900/40 group transition-all"
            >
              <Link href="/">
                <Home className="w-5 h-5 mr-2 group-hover:-translate-y-1 transition-transform" />
                Return Home
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 h-16 rounded-2xl text-lg font-bold backdrop-blur-md group transition-all"
            >
              <Link href="/products">
                <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform text-amber-500" />
                Browse Products
              </Link>
            </Button>
          </div>

          {/* Minimalist Footer Link */}
          <div className="pt-8">
            <Link 
              href="/contact" 
              className="text-amber-500/50 hover:text-amber-500 text-sm font-bold uppercase tracking-[0.2em] transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Report an Issue
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
    </div>
  );
}
