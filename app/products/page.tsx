"use client";

import { useState, useEffect } from "react";
import {
  Coffee,
  Award,
  Users,
  Truck,
  Star,
  ShoppingCart,
  Filter,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Products() {

  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "arabica", name: "Arabica" },
    { id: "robusta", name: "Robusta" },
    { id: "blends", name: "Signature Blends" },
    { id: "ground", name: "Ground Coffee" },
    { id: "instant", name: "Instant Coffee" },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Arabica Single Origin",
      category: "arabica",
      description:
        "Hand-picked beans from the highlands of Plateau State, offering a smooth, mild flavor with floral notes.",
      image:
        "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦5,500",
      originalPrice: "₦6,000",
      rating: 4.9,
      reviews: 127,
      inStock: true,
      features: ["Single Origin", "Light Roast", "Floral Notes", "Fair Trade"],
    },
    {
      id: 2,
      name: "Robusta Bold Blend",
      category: "robusta",
      description:
        "Rich, full-bodied coffee with chocolate undertones and a strong caffeine kick. Perfect for espresso.",
      image:
        "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦4,200",
      originalPrice: "₦4,800",
      rating: 4.7,
      reviews: 89,
      inStock: true,
      features: [
        "High Caffeine",
        "Dark Roast",
        "Chocolate Notes",
        "Espresso Perfect",
      ],
    },
    {
      id: 3,
      name: "Espresso Supreme",
      category: "blends",
      description:
        "Our signature espresso blend combining the best of Arabica and Robusta for the perfect shot.",
      image:
        "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦6,800",
      originalPrice: "₦7,500",
      rating: 4.8,
      reviews: 203,
      inStock: true,
      features: ["Signature Blend", "Medium Roast", "Balanced", "Crema Rich"],
    },
    {
      id: 4,
      name: "Morning Glory Ground",
      category: "ground",
      description:
        "Pre-ground coffee perfect for drip brewing. A balanced blend to start your day right.",
      image:
        "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦3,800",
      originalPrice: "₦4,200",
      rating: 4.6,
      reviews: 156,
      inStock: true,
      features: ["Pre-Ground", "Medium Roast", "Drip Perfect", "Morning Blend"],
    },
    {
      id: 5,
      name: "Heritage Instant Coffee",
      category: "instant",
      description:
        "Premium instant coffee that doesn't compromise on taste. Perfect for busy mornings.",
      image:
        "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦2,500",
      originalPrice: "₦3,000",
      rating: 4.4,
      reviews: 78,
      inStock: true,
      features: ["Instant", "Quick Dissolve", "Rich Flavor", "Convenient"],
    },
    {
      id: 6,
      name: "Plateau Gold Arabica",
      category: "arabica",
      description:
        "Premium Arabica from Nigeria's coffee heartland with honey and citrus notes.",
      image:
        "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦7,200",
      originalPrice: "₦8,000",
      rating: 4.9,
      reviews: 94,
      inStock: false,
      features: [
        "Premium Grade",
        "Light Roast",
        "Citrus Notes",
        "Limited Edition",
      ],
    },
    {
      id: 7,
      name: "Nigerian Sunrise Blend",
      category: "blends",
      description:
        "A unique blend celebrating Nigerian coffee diversity with notes of caramel and nuts.",
      image:
        "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦5,800",
      originalPrice: "₦6,500",
      rating: 4.7,
      reviews: 112,
      inStock: true,
      features: [
        "Signature Blend",
        "Medium Roast",
        "Caramel Notes",
        "Nigerian Pride",
      ],
    },
    {
      id: 8,
      name: "Decaf Delight",
      category: "ground",
      description:
        "Decaffeinated coffee that retains full flavor. Perfect for evening enjoyment.",
      image:
        "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=400",
      price: "₦4,500",
      originalPrice: "₦5,000",
      rating: 4.3,
      reviews: 67,
      inStock: true,
      features: [
        "Decaffeinated",
        "Full Flavor",
        "Evening Perfect",
        "Swiss Water Process",
      ],
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight mb-6">
              Premium
              <span className="text-amber-700"> Nigerian Coffee</span>
              <br />
              Collection
            </h1>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto mb-8">
              Discover our carefully curated selection of premium coffee beans,
              each with its unique flavor profile and story. From single-origin
              Arabica to signature blends.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-amber-700 text-white"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <Button
                variant="outline"
                className="border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-200"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      {product.originalPrice && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          SALE
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-amber-800 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-amber-700 ml-2">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-amber-700">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className={`${
                          product.inStock
                            ? "bg-amber-700 hover:bg-amber-800 text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
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
              Why Choose Our Coffee?
            </h2>
            <p className="text-lg text-amber-800 max-w-3xl mx-auto">
              Every product in our collection meets the highest standards of
              quality and sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Award className="w-8 h-8 text-amber-600" />,
                title: "Premium Quality",
                description:
                  "Hand-selected beans from the finest Nigerian coffee farms",
              },
              {
                icon: <Users className="w-8 h-8 text-amber-600" />,
                title: "Fair Trade",
                description:
                  "Supporting local farmers with fair compensation and sustainable practices",
              },
              {
                icon: <Truck className="w-8 h-8 text-amber-600" />,
                title: "Fast Delivery",
                description:
                  "Fresh coffee delivered nationwide within 24-48 hours",
              },
              {
                icon: <Coffee className="w-8 h-8 text-amber-600" />,
                title: "Expert Roasting",
                description:
                  "Masterfully roasted in small batches for optimal flavor",
              },
            ].map((feature, index) => (
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
      {/* <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Cant Decide? Try Our Coffee Sampler
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Get a taste of our best-selling coffees with our curated sampler
            pack. Perfect for discovering your new favorite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50"
            >
              Order Sampler Pack - ₦12,500
            </Button>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-amber-700"
              >
                Need Help Choosing?
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
}
