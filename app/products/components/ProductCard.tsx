 "use client";

import { Star, MessageCircle, ShoppingBag, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "../hooks/useProducts";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "@/lib/stores/cartStore";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [currentProduct, setCurrentProduct] = useState({
    ...product,
    // Ensure features is an array
    features: Array.isArray(product.features) ? product.features : [],
    // Set defaults for optional fields
    originalPrice: product.originalPrice || 0,
    inStock: product.inStock || "available",
    // Mock rating and reviews for now (you can add these to your Firestore schema)
    rating: 4.8,
    reviews: 128,
  });

  // Update when product changes
  useEffect(() => {
    setCurrentProduct({
      ...product,
      features: Array.isArray(product.features) ? product.features : [],
      originalPrice: product.originalPrice || 0,
      inStock: product.inStock || "available",
      rating: 4.8,
      reviews: 128,
    });
  }, [product]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock,
      charityProgram: product.charityProgram,
    });

    router.push("/checkout");
  };

  // Format price with Naira symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate discount percentage
  const discountPercentage =
    currentProduct.originalPrice && currentProduct.originalPrice > 0
      ? Math.round(
          ((currentProduct.originalPrice - currentProduct.price) /
            currentProduct.originalPrice) *
            100
        )
      : 0;

  // Check if product is in stock
  const isInStock = currentProduct.inStock !== "sold-out";
  const isRunningLow = currentProduct.inStock === "running-low";

  return (
    <Card className="group relative w-[320px] overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-amber-50/30 to-white">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />

      <CardContent className="p-0 relative">
        {/* Image Section */}
        <div className="relative overflow-hidden h-56 bg-gradient-to-b from-amber-100 to-amber-50">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Stock overlay */}
          {!isInStock && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <span className="text-white font-bold text-lg block mb-1">
                  Out of Stock
                </span>
                <span className="text-gray-300 text-sm">Coming Soon</span>
              </div>
            </div>
          )}

          {/* Sale badge */}
          {currentProduct.originalPrice &&
            currentProduct.originalPrice > currentProduct.price &&
            isInStock && (
              <div className="absolute top-3 right-3">
                <div className="relative">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <span className="text-xs font-bold">
                      -{discountPercentage}%
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-red-400 rounded-lg blur-md opacity-50 -z-10" />
                </div>
              </div>
            )}

          {/* Quality badge - Show for premium products */}
          {currentProduct.rating >= 4.5 && (
            <div className="absolute top-3 left-3">
              <div className="bg-gradient-to-br from-amber-400 to-yellow-500 text-white p-2 rounded-full shadow-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
          )}

          {/* Running low badge */}
          {isRunningLow && (
            <div className="absolute top-3 left-12">
              <div className="relative">
                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-lg shadow-lg text-xs font-bold">
                  Low Stock
                </div>
              </div>
            </div>
          )}

          {/* Charity badge */}
          {currentProduct.charityProgram && (
            <div className="absolute bottom-3 left-3">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-2 py-1 rounded-lg shadow-lg text-xs font-bold flex items-center gap-1">
                  <span>🌍</span>
                  <span>Charity</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          {/* Category */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">
              {currentProduct.category === "other"
                ? currentProduct.customCategory
                : currentProduct.category}
            </span>
            {/* Stock status indicator */}
            <div
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                isInStock
                  ? isRunningLow
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {isInStock
                ? isRunningLow
                  ? "Low Stock"
                  : "In Stock"
                : "Sold Out"}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-amber-900 leading-tight group-hover:text-amber-700 transition-colors line-clamp-2 min-h-[56px]">
            {currentProduct.name}
          </h3>

          {/* Description */}
          <p className="text-amber-800/80 text-sm leading-relaxed line-clamp-2 min-h-[40px]">
            {currentProduct.description}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all duration-200 ${
                    i < Math.floor(currentProduct.rating)
                      ? "text-yellow-400 fill-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-amber-700">
              {currentProduct.rating.toFixed(1)}{" "}
              <span className="text-gray-400">({currentProduct.reviews})</span>
            </span>
          </div>

          {/* Features */}
          {currentProduct.features && currentProduct.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {currentProduct.features
                .slice(0, 3)
                .map((feature: string, idx: number) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-medium border border-amber-200/50 hover:border-amber-300 transition-colors"
                  >
                    {feature}
                  </span>
                ))}
              {currentProduct.features.length > 3 && (
                <span className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-medium border border-amber-200/50">
                  +{currentProduct.features.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

          {/* Price and CTA */}
          <div className="flex items-end justify-between pt-2">
            {/* Price */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  {formatPrice(currentProduct.price)}
                </span>
                {currentProduct.originalPrice &&
                  currentProduct.originalPrice > currentProduct.price && (
                    <span className="text-sm text-gray-400 line-through font-medium">
                      {formatPrice(currentProduct.originalPrice)}
                    </span>
                  )}
              </div>
              {currentProduct.originalPrice &&
                currentProduct.originalPrice > currentProduct.price && (
                  <span className="text-xs text-green-600 font-semibold">
                    Save{" "}
                    {formatPrice(
                      currentProduct.originalPrice - currentProduct.price
                    )}{" "}
                    ({discountPercentage}%)
                  </span>
                )}
            </div>

            {/* CTA Button */}
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={`relative overflow-hidden group/btn shadow-lg transition-all duration-300 ${
                isInStock
                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-xl hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isInStock && (
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              )}
              <span className="relative flex items-center gap-1.5">
                {isInStock ? (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Order Now
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    Unavailable
                  </>
                )}
              </span>
            </Button>
          </div>

          {/* Charity Program Info */}
          {currentProduct.charityProgram && (
            <div className="mt-3 pt-3 border-t border-amber-200/50">
              <div className="flex items-center gap-2 text-xs text-blue-600">
                <span>🌍</span>
                <span className="font-medium">Supports: </span>
                <span>{currentProduct.charityProgram}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
};
