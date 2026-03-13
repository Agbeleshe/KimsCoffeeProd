"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCard } from "@/app/products/components/ProductCard";
import { Product } from "@/app/products/hooks/useProducts";
import { ArrowRight } from "lucide-react";

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  isLoading?: boolean;
}

export default function ProductSection({
  title,
  subtitle,
  products,
  isLoading = false,
}: ProductSectionProps) {
  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-br from-amber-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-amber-800 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        {!isLoading && products.length > 0 && (
          <div className="mt-16 text-center">
            <Link href="/products" prefetch={true}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group font-semibold text-lg"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
