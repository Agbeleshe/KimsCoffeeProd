/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronRight, ShoppingCart } from "lucide-react";
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
    <section id="home" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-2 transition-all duration-1000 relative min-h-[90vh]  gap-6 flex flex-col justify-center ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
              Taste the Rich
              <span className="text-amber-700"> Heritage</span> of
              <span className="text-amber-700"> Nigerian Coffee</span>
            </h1>
            <p className="text-lg text-amber-800 max-w-2xl">
              Kim's Coffee is a quality 100% Arabica Coffee beans grown in the
              highlands of Plateau state in Central Nigeira. Experience the
              finest coffee beans grown in the heart of Plateau State. From our
              farms to your cup, we bring you the authentic taste of premium
              Nigerian coffee with every sip.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button
                  // onClick={() => {
                  //   toast.info("Welcome to our Products Page!");
                  // }}
                  size="lg"
                  className="bg-amber-700 w-[100%] md:w-auto hover:bg-amber-800 text-white group"
                >
                  View Prices
                  <ShoppingCart className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-700 w-[100%] md:w-auto text-amber-700 hover:bg-amber-700 hover:text-white"
                >
                  Learn More
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <Image
              alt="absolute logo"
              src={logo}
              height={200}
              width={200}
              className="absolute opacity-50 right-[20%] md:right-[35%] z-10  bottom-[10%] animate-bounce [animation-duration:10s]"
            />
            <div className="relative ">
              <Image
                height={500}
                width={500}
                src={coffeeSeed}
                alt="Premium Nigerian Coffee"
                className="w-full  h-96 lg:h-[500px] object-contain  hover:scale-105 transition-transform duration-300"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/40 to-transparent rounded-2xl cursor-pointer"></div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
