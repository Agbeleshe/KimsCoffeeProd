"use client";


import { Package, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currencyFormatter } from "../utils";
import { AdminOrder, Product } from "../types";


interface OverviewContentProps {
  products: Product[];
  orders: AdminOrder[];
  loadingProducts: boolean;
  loadingOrders: boolean;
}

export default function OverviewContent({
  products,
  orders,
  loadingProducts,
  loadingOrders,
}: OverviewContentProps) {
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.deliveryStatus === "pending").length;
  const processingOrders = orders.filter(order => order.deliveryStatus === "processing").length;
  const deliveredOrders = orders.filter(order => order.deliveryStatus === "delivered").length;

  if (loadingProducts || loadingOrders) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-amber-100 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-8 bg-amber-100 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-amber-100 bg-white/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{products.length}</div>
            <p className="text-xs text-amber-500">Active products in store</p>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-white/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">
              Total Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{orders.length}</div>
            <p className="text-xs text-amber-500">All-time orders</p>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-white/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">
              Total Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">
              {currencyFormatter.format(totalRevenue)}
            </div>
            <p className="text-xs text-amber-500">From all orders</p>
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-white/95 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">
              Delivery Status
            </CardTitle>
            <Users className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">
              {deliveredOrders}/{orders.length}
            </div>
            <p className="text-xs text-amber-500">
              {pendingOrders} pending • {processingOrders} processing
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-amber-100 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-amber-900">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-amber-500 text-center py-4">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-amber-100 bg-amber-50/50"
                  >
                    <div>
                      <p className="font-medium text-amber-900">
                        {order.customerInfo.fullName}
                      </p>
                      <p className="text-sm text-amber-500">
                        {order.createdAtLabel}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-amber-900">
                        {currencyFormatter.format(order.totalAmount)}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.deliveryStatus === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.deliveryStatus === "processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.deliveryStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-amber-100 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-amber-900">Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-amber-500 text-center py-4">No products yet</p>
            ) : (
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-amber-100 bg-amber-50/50"
                  >
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-amber-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-amber-500">
                        {currencyFormatter.format(parseFloat(product.price))}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.inStock === "available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.inStock}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}