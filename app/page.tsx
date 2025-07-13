"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Coffee, Award, Users, Truck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Hero from "@/components/home/Hero";

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

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              About Kim Coffee
            </h2>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto">
              Founded in the heart of Nigeria, Kim Coffee is dedicated to
              bringing you the finest coffee experience while supporting local
              communities and sustainable farming practices.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-amber-900">
                Our Story
              </h3>
              <p className="text-amber-800 leading-relaxed">
                Kim Coffee was born from a passion for exceptional coffee and a
                commitment to showcasing Nigeria rich coffee heritage. We work
                directly with local farmers, ensuring fair trade practices and
                the highest quality beans.
              </p>
              <p className="text-amber-800 leading-relaxed">
                Every cup tells a story of tradition, quality, and the
                dedication of Nigerian coffee farmers who have perfected their
                craft over generations.
              </p>
              <div className="flex items-center space-x-4 text-amber-700">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-semibold">4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5" />
                  <span className="ml-1 font-semibold">
                    10,000+ Happy Customers
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4350057/pexels-photo-4350057.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Coffee farming in Nigeria"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products"
        className="py-20 bg-gradient-to-br from-amber-50 to-orange-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Our Premium Coffee Selection
            </h2>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto">
              Discover our carefully curated selection of premium Nigerian
              coffee beans, each with its unique flavor profile and character.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coffeeProducts.map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-200"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-amber-800 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-amber-700">
                        {product.price}
                      </span>
                      <Button
                        size="sm"
                        className="bg-amber-700 hover:bg-amber-800 text-white"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
              Why Choose Kim Coffee?
            </h2>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto">
              We are committed to delivering exceptional coffee experiences
              while supporting our local communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-amber-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Experience Nigerian Coffee Excellence?
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join thousands of coffee lovers who have discovered the rich,
            authentic taste of Kim Coffee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-amber-700 hover:bg-amber-50"
              >
                Order Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-700"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
