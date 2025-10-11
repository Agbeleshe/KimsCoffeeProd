"use client";

import { useState, useEffect } from "react";
import { Coffee, Award, Users, Truck } from "lucide-react";
import { products } from "./components/staticProducts";
import { ProductCard } from "./components/ProductCard";
import { FilterSection } from "./components/FilterSection";
import { HeaderSection } from "@/components/reuseables/HeaderSection";

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

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}

      <HeaderSection
        title="Premium Nigerian Coffee Collection"
        subtitle="Discover our carefully curated selection of premium coffee beans,
              each with its unique flavor profile and story."
      />

      {/* ✅ Filter Section */}
      <FilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        title="Explore Our Coffee Range"
        subtitle="Choose from a variety of blends and origins to suit your taste."
      />

      {/* Products Grid */}
      <section id="products-grid" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <div className=" justify-center flex gap-5 flex-wrap ">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
    </div>
  );
}
