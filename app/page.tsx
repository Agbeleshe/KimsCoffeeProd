"use client";

import { Award, Users, Truck, Coffee } from "lucide-react";
import Hero from "@/components/home/Hero";
import CompanyValues from "@/components/home/CompanyValues";
import About from "@/components/home/About";
import ProductSection from "@/components/home/ProductSection";
import { useProducts } from "@/app/products/hooks/useProducts";

export default function Home() {
  const { products, loading } = useProducts();

  // Get first 3 products for the home page selection
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Hero />
      <About />
      <CompanyValues />
      <ProductSection
        title="Our Premium Coffee Selection"
        subtitle="Discover our carefully curated selection of premium Nigerian coffee beans, each with its unique flavor profile and character."
        products={featuredProducts}
        isLoading={loading}
      />
    </div>
  );
}
