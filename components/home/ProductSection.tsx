"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Product {
  name: string;
  description: string;
  image: string;
  price: string;
}

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
}

export default function ProductSection({
  title,
  subtitle,
  products,
}: ProductSectionProps) {
  // ✅ Replace with your official business WhatsApp number
  const whatsappNumber = "2348069569863";

  // Function to handle redirect
  const handleOrder = (productName: string, price: string) => {
    const message = `Hello Kim Coffee, I’d like to order ${productName} priced at ${price}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white border-amber-200"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={200}
                    width={800}
                    className="!w-full !h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-amber-800 mb-4 min-h-[55px]">
                    {product.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-amber-700">
                      {product.price}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleOrder(product.name, product.price)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Order via WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
