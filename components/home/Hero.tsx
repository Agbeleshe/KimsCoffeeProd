/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight, ShoppingCart, Award, MapPin, Coffee } from "lucide-react";
import Link from "next/link";
import coffeeSeed from "../../public/coffee-three-bags-no-bg.png";
import Image from "next/image";
import logo from "../../public/logo.png";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FAF7F2]">
      {/* Background Decorative Elements */}
      {/* <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-100/30 to-transparent -z-10" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-100/20 rounded-full blur-[120px] -z-10" /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div
            className={`lg:col-span-7 space-y-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/50 border border-amber-200 text-amber-900 text-sm font-semibold tracking-wide">
              <Award className="w-4 h-4 text-amber-700" />
              <span>100% PREMIUM NIGERIAN ARABICA</span>
            </div> */}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-amber-950 leading-[1.1] tracking-tight">
              Experience the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-800">
                True Spirit
              </span> 
              <br /> of Plateau state
            </h1>

            <p className="text-xl text-amber-900/80 max-w-xl leading-relaxed font-medium">
              Grown in the misty highlands of central Nigeria, Kim's Coffee brings 
              the rich heritage of Plateau state straight to your cup. Authentic, bold, 
              and masterfully roasted.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link href="/products" prefetch={true}>
                <Button
                  size="lg"
                  className="bg-amber-800 min-w-[300px] md:min-w-[200px] hover:bg-amber-950 text-white px-10 py-7 rounded-2xl shadow-2xl shadow-amber-900/20 group text-lg font-bold transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Collection
                  <ShoppingCart className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about" prefetch={true}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 min-w-[300px] md:min-w-[200px] border-amber-800/30 bg-white/50 backdrop-blur-sm text-amber-900 hover:bg-amber-50 px-10 py-7 rounded-2xl text-lg font-bold transition-all duration-300 group"
                >
                  Our Story
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Micro Trust Elements */}
           
          </div>

          {/* Visual Content */}
          <div
            className={`lg:col-span-5 relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative z-10 w-full aspect-square flex items-center justify-center">
              {/* Spinning decorative ring */}
              <div className="absolute inset-0 border-[20px] border-amber-100/50 rounded-full animate-[spin_20s_linear_infinite]" />
              
              <Image
                src={coffeeSeed}
                alt="Premium Nigerian Coffee Bags"
                width={600}
                height={600}
                priority
                className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(67,40,24,0.3)] animate-[float_6s_ease-in-out_infinite]"
              />

              {/* Floating Badges */}
              {/* <div className="absolute top-10 -right-4 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white/50 animate-[float_5s_ease-in-out_infinite_1s]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-900 uppercase">Origin</p>
                    <p className="text-sm font-bold text-amber-950">Plateau, Nigeria</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 -left-8 bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white/50 animate-[float_4s_ease-in-out_infinite_0.5s]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-900 uppercase">Process</p>
                    <p className="text-sm font-bold text-amber-950">Master Roasted</p>
                  </div>
                </div>
              </div> */}

              {/* Decorative Logo */}
              <div className="absolute -bottom-10  opacity-20 rotate-12">
                <Image src={logo} alt="Kim's Coffee Logo" width={180} height={180} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero-specific animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
