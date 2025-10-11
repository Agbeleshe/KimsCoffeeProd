"use client";

import { Star, MessageCircle, ShoppingBag, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ProductCard = ({ product }: { product: any }) => {
  const handleWhatsAppRedirect = () => {
    const phone = "2348069569863";
    const message = encodeURIComponent(
      `Hello I'm interested in buying "${product.name}".`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((parseFloat(product.originalPrice.replace(/[^0-9.]/g, "")) -
          parseFloat(product.price.replace(/[^0-9.]/g, ""))) /
          parseFloat(product.originalPrice.replace(/[^0-9.]/g, ""))) *
          100
      )
    : 0;

  return (
    <Card className="group relative w-[320px] overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white via-amber-50/30 to-white">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-bl-full transform translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />

      <CardContent className="p-0 relative">
        {/* Image Section */}
        <div className="relative overflow-hidden h-56 bg-gradient-to-b from-amber-100 to-amber-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-700"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Stock overlay */}
          {!product.inStock && (
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
          {product.originalPrice && product.inStock && (
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

          {/* Quality badge */}
          {product.rating >= 4.5 && (
            <div className="absolute top-3 left-3">
              <div className="bg-gradient-to-br from-amber-400 to-yellow-500 text-white p-2 rounded-full shadow-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          {/* Title */}
          <h3 className="text-xl font-bold text-amber-900 leading-tight group-hover:text-amber-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-amber-800/80 text-sm leading-relaxed line-clamp-2 min-h-[40px]">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-all duration-200 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-amber-700">
              {product.rating}{" "}
              <span className="text-gray-400">({product.reviews})</span>
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {product.features
              .slice(0, 2)
              .map((feature: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-gradient-to-r from-amber-100 to-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-medium border border-amber-200/50 hover:border-amber-300 transition-colors"
                >
                  {feature}
                </span>
              ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

          {/* Price and CTA */}
          <div className="flex items-end justify-between pt-2">
            {/* Price */}
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through font-medium">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <span className="text-xs text-green-600 font-semibold">
                  Save {discountPercentage}%
                </span>
              )}
            </div>

            {/* CTA Button */}
            <Button
              size="sm"
              onClick={handleWhatsAppRedirect}
              disabled={!product.inStock}
              className={`relative overflow-hidden group/btn shadow-lg transition-all duration-300 ${
                product.inStock
                  ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-xl hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {product.inStock && (
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
              )}
              <span className="relative flex items-center gap-1.5">
                {product.inStock ? (
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
        </div>
      </CardContent>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  );
};
