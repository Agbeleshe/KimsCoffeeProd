 "use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProducts } from "../hooks/useProducts";
import {
  ShoppingBag,
  Heart,
  Share2,
  Truck,
  Shield,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import useCartStore from "@/lib/stores/cartStore";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { getProductBySlug, loading, error } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);

  const product = getProductBySlug(slug as string);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCardSkeleton />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-amber-900 mb-4">
              {error ? "Error Loading Product" : "Product Not Found"}
            </h1>
            <p className="text-gray-600 mb-8">
              {error || "The product you're looking for doesn't exist."}
            </p>
            <Link href="/products">
              <Button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const totalPrice = product.price * quantity;
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        category: product.category,
        inStock: product.inStock,
        charityProgram: product.charityProgram,
      },
      quantity
    );
    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-amber-700">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-amber-700">
                Products
              </Link>
            </li>
            <li>/</li>
            <li className="text-amber-700 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Left Column - Images */}
            <div>
              <div className="relative h-96 rounded-xl overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Tags */}
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm bg-amber-100 text-amber-800 rounded-full font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              {/* Category and Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-amber-600 font-medium uppercase">
                  {product.category}
                </span>
                <span
                  className={`px-3 py-1.5 text-sm rounded-full font-medium ${
                    product.inStock === "available"
                      ? "bg-green-100 text-green-800"
                      : product.inStock === "running-low"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.inStock === "available"
                    ? "In Stock"
                    : product.inStock === "running-low"
                    ? "Low Stock"
                    : "Sold Out"}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Charity Program */}
              {product.charityProgram && (
                <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600">🌍</span>
                    <h3 className="font-semibold text-blue-800">
                      Charity Program
                    </h3>
                  </div>
                  <p className="text-blue-700 text-sm">
                    Proceeds from this product support:{" "}
                    <strong>{product.charityProgram}</strong>
                  </p>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 font-semibold rounded-full">
                        Save{" "}
                        {formatPrice(product.originalPrice - product.price)}!
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-gray-300 font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-lg font-semibold text-amber-700">
                    Total: {formatPrice(totalPrice)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 text-lg"
                  disabled={product.inStock === "sold-out"}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {product.inStock === "sold-out" ? "Sold Out" : "Order Now"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart
                    className={`w-5 h-5 mr-2 ${
                      isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {isLiked ? "Saved" : "Save for Later"}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Truck className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Free Shipping
                    </p>
                    <p className="text-xs text-gray-600">Nationwide</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Quality Guarantee
                    </p>
                    <p className="text-xs text-gray-600">30-Day Return</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Coffee className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Freshness
                    </p>
                    <p className="text-xs text-gray-600">Recent Roast</p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Share:</span>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Product
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          {product.notes && (
            <div className="border-t border-gray-200 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Additional Information
              </h3>
              <div className="prose max-w-none">
                <p className="text-gray-600">{product.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
