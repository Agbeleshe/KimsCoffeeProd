"use client";

import { Product } from "../types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  Trash2,
  Eye,
  Package,
  Tag,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export default function ProductList({
  products,
  loading,
  onEdit,
  onDelete,
}: ProductListProps) {
  const getStockBadge = (status: string) => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Available
          </Badge>
        );
      case "running-low":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Running Low
          </Badge>
        );
      case "sold-out":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Sold Out
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(numPrice);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
        <p className="mt-4 text-amber-700">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
            <Package className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-amber-800 mb-2">
            No Products Yet
          </h3>
          <p className="text-amber-600 mb-6">
            Get started by adding your first coffee product to the store.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Mobile Card View
  const MobileProductCard = ({ product }: { product: Product }) => (
    <Card className="border-amber-200 hover:border-amber-300 transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-amber-200 flex-shrink-0">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                <Package className="h-8 w-8 text-amber-400" />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-amber-900 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="border-amber-300 text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {product.category}
                  </Badge>
                  {getStockBadge(product.inStock)}
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-1 mb-3">
              <p className="font-bold text-lg text-amber-700">
                {formatPrice(product.price)}
              </p>
              {product.originalPrice &&
                parseFloat(product.originalPrice.replace(/[^0-9.]/g, "")) >
                  0 && (
                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-3 border-t border-amber-100">
              {/* <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(`/product/${product.slug}`, "_blank")
                }
                className="flex-1 border-amber-300 hover:bg-amber-50 text-amber-700"
              >
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button> */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(product)}
                className="flex-1 border-amber-300 hover:bg-amber-50 text-amber-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(product.id)}
                className="flex-1 border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Trash
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Desktop Table View
  const DesktopTableView = () => (
    <div className="rounded-lg border border-amber-200 bg-white overflow-hidden">
      <Table>
        <TableHeader className="bg-amber-50">
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-amber-50/50">
              <TableCell>
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-amber-200">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="w-full h-full bg-amber-100 flex items-center justify-center">
                      <Package className="h-6 w-6 text-amber-400" />
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium text-amber-900">{product.name}</p>
                  <p className="text-sm text-amber-600">{product.slug}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="border-amber-300">
                  <Tag className="h-3 w-3 mr-1" />
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell>
                <p className="font-semibold text-amber-700">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice &&
                  parseFloat(product.originalPrice.replace(/[^0-9.]/g, "")) >
                    0 && (
                    <p className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </p>
                  )}
              </TableCell>
              <TableCell className="text-center">
                {getStockBadge(product.inStock)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      window.open(`/product/${product.slug}`, "_blank")
                    }
                    className="border-amber-300 hover:bg-amber-50 text-amber-700"
                  >
                    <Eye className="h-4 w-4" />
                  </Button> */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(product)}
                    className="border-amber-300 hover:bg-amber-50 text-amber-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                    className="border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {products.map((product) => (
          <MobileProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden md:block">
        <DesktopTableView />
      </div>

      <div className="text-center text-sm text-amber-600">
        Showing {products.length} product{products.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
