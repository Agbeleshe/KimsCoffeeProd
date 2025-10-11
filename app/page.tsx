"use client";

import { Coffee, Award, Users, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import CompanyValues from "@/components/home/CompanyValues";
import About from "@/components/home/About";
import ProductSection from "@/components/home/ProductSection"; // ✅ new import

export default function Home() {
  const coffeeProducts = [
    {
      name: "Premium Arabica",
      description: "Single-origin beans from the highlands of Nigeria",
      image:
        "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦5,500",
    },
    {
      name: "Robusta Blend",
      description: "Rich, bold flavor with chocolate undertones",
      image:
        "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦4,200",
    },
    {
      name: "Espresso Supreme",
      description: "Perfect for your morning espresso ritual",
      image:
        "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦6,800",
    },
  ];

  const features = [
    {
      icon: <Award className="w-8 h-8 text-amber-600" />,
      title: "Premium Quality",
      description:
        "Carefully selected beans from the best Nigerian coffee farms",
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "Local Community",
      description: "Supporting local farmers and communities across Nigeria",
    },
    {
      icon: <Truck className="w-8 h-8 text-amber-600" />,
      title: "Fast Delivery",
      description: "Fresh coffee delivered to your doorstep nationwide",
    },
    {
      icon: <Coffee className="w-8 h-8 text-amber-600" />,
      title: "Expert Roasting",
      description:
        "Masterfully roasted to bring out the perfect flavor profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Hero />
      <About />
      <CompanyValues />
      <ProductSection
        title="Our Premium Coffee Selection"
        subtitle="Discover our carefully curated selection of premium Nigerian coffee beans, each with its unique flavor profile and character."
        products={coffeeProducts}
      />
    </div>
  );
}
