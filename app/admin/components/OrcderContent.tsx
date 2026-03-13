"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

import { AdminOrder, DeliveryStatus } from "../types";
import { currencyFormatter } from "../utils";

interface OrdersContentProps {
  orders: AdminOrder[];
  loadingOrders: boolean;
  onOrderStatusChange: (orderId: string, newStatus: DeliveryStatus) => Promise<void>;
  onOrderDeliveryFeeInputChange: (orderId: string, value: string) => void;
  onConfirmOrderDeliveryFee: (order: AdminOrder) => Promise<void>;
  orderDeliveryFees: Record<string, string>;
  savingOrderFeeIds: string[];
  updatingStatusIds: string[];
  orderStatusSelections: Record<string, DeliveryStatus>;
  deliveryStatusOptions: DeliveryStatus[];
  deliveryFeeValue: number;
  deliveryFeeInput: string;
  onDeliveryFeeInputChange: (value: string) => void;
  onSaveDeliveryFee: () => Promise<void>;
  isSavingFee: boolean;
  loadingDeliveryFee: boolean;
}

export default function OrdersContent({
  orders,
  loadingOrders,
  onOrderStatusChange,
  onOrderDeliveryFeeInputChange,
  onConfirmOrderDeliveryFee,
  orderDeliveryFees,
  savingOrderFeeIds,
  updatingStatusIds,
  orderStatusSelections,
  deliveryStatusOptions,
  deliveryFeeValue,
  deliveryFeeInput,
  onDeliveryFeeInputChange,
  onSaveDeliveryFee,
  isSavingFee,
  loadingDeliveryFee,
}: OrdersContentProps) {
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<string>("");

  const filteredOrders = orders.filter((order) => {
    // Status filter
    if (statusFilter !== "all" && order.deliveryStatus !== statusFilter) {
      return false;
    }
    // Date filter
    if (dateFilter) {
      const dateStr = order.createdAtLabel.toLowerCase();
      if (!dateStr.includes(dateFilter.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Default Delivery Fee Section */}
      <div className="rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-600">
              Default delivery fee
            </p>
            <p className="text-xs text-amber-400">
              This value is used in the checkout before order-level confirmation.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="number"
              min={0}
              step="0.01"
              value={deliveryFeeInput}
              onChange={(e) => onDeliveryFeeInputChange(e.target.value)}
              className="w-32 rounded-lg border border-amber-200 px-3 py-2 text-sm font-semibold text-amber-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
            <Button
              onClick={onSaveDeliveryFee}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
              disabled={isSavingFee}
            >
              {isSavingFee ? "Saving..." : "Save default fee"}
            </Button>
          </div>
        </div>
        {!loadingDeliveryFee && (
          <p className="mt-3 text-xs text-amber-500">
            Current saved value:{" "}
            <strong>{currencyFormatter.format(deliveryFeeValue)}</strong>
          </p>
        )}
      </div>

      {/* Orders Section */}
      <div className="rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-amber-900">Orders</h3>
            <p className="text-sm text-amber-500">
              Manage status and confirm delivery fees.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-amber-600 uppercase ml-1">Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Date Search Filter */}
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-amber-600 uppercase ml-1">Search/Date</label>
              <input 
                type="text"
                placeholder="Search date..."
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 placeholder:text-amber-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
              />
            </div>
          </div>
        </div>

        {loadingOrders ? (
          <p className="py-6 text-center text-amber-600">
            Loading orders...
          </p>
        ) : filteredOrders.length === 0 ? (
          <p className="py-6 text-center text-amber-500">No orders match your filters.</p>
        ) : (
          <div className="space-y-4">
            {/* Mobile Card View (Hidden on Desktop) */}
            <div className="md:hidden space-y-4">
              {filteredOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 shadow-sm space-y-3 backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-amber-500">
                        Order ID: {order.id}
                      </p>
                      <p className="text-xs text-amber-400">
                        {order.createdAtLabel}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus.toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold text-amber-900">
                        Total: {currencyFormatter.format(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 rounded-2xl border border-amber-200 bg-white p-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-amber-500">
                      <span>Payment: {order.paymentMethod}</span>
                      <span>Delivery status:</span>
                      <select
                        value={
                          orderStatusSelections[order.id] ??
                          order.deliveryStatus
                        }
                        onChange={(event) =>
                          onOrderStatusChange(
                            order.id,
                            event.target.value as DeliveryStatus
                          )
                        }
                        disabled={updatingStatusIds.includes(order.id)}
                        className="rounded-xl border border-amber-200 bg-amber-100 px-3 py-1 text-xs text-amber-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                      >
                        {deliveryStatusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="text-sm text-amber-600">
                        <p className="font-semibold text-amber-800">
                          Customer
                        </p>
                        <p>{order.customerInfo.fullName}</p>
                        <p>{order.customerInfo.phoneNumber}</p>
                        <p>
                          {order.customerInfo.city},{" "}
                          {order.customerInfo.state}
                        </p>
                      </div>
                      <div className="text-sm text-amber-600">
                        <p className="font-semibold text-amber-800">
                          Delivery
                        </p>
                        <p>{order.customerInfo.houseAddress}</p>
                        <p>{order.customerInfo.majorLandmark}</p>
                        {order.customerInfo.socialHandle && (
                          <p>Social: {order.customerInfo.socialHandle}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-amber-800">
                        Items
                      </p>
                      {order.products.map((product) => (
                        <div
                          key={`${order.id}-${product.id}`}
                          className="flex flex-col gap-1 text-sm text-amber-600"
                        >
                          <span className="font-medium text-amber-900">
                            {product.name}
                          </span>
                          <span>
                            {product.quantity} ×{" "}
                            {currencyFormatter.format(product.price)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50/50 p-3">
                      <div className="flex items-center justify-between text-sm text-amber-600">
                        <span>Subtotal</span>
                        <span>
                          {currencyFormatter.format(order.cartSubtotal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-amber-600">
                        <span>Delivery fee</span>
                        <span>
                          {currencyFormatter.format(order.deliveryFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm font-semibold text-amber-900">
                        <span>Final total</span>
                        <span>
                          {currencyFormatter.format(order.totalAmount)}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 rounded-xl border border-amber-200 bg-white p-3">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          value={
                            orderDeliveryFees[order.id] ??
                            order.deliveryFee.toString()
                          }
                          onChange={(event) =>
                            onOrderDeliveryFeeInputChange(
                              order.id,
                              event.target.value
                            )
                          }
                          className="rounded-xl border border-amber-200 px-3 py-2 text-sm text-amber-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                        />
                        <Button
                          onClick={() => onConfirmOrderDeliveryFee(order)}
                          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          disabled={savingOrderFeeIds.includes(order.id)}
                        >
                          {savingOrderFeeIds.includes(order.id)
                            ? "Confirming..."
                            : "Confirm delivery fee"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop Table View (Hidden on Mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-4">
                <thead className="text-left text-sm font-semibold text-amber-900">
                  <tr>
                    <th className="pb-2 pl-4">Order Details</th>
                    <th className="pb-2">Customer</th>
                    <th className="pb-2 text-center">Items</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Delivery Fee</th>
                    <th className="pb-2 pr-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="group">
                      {/* Order info */}
                      <td className="rounded-l-2xl border-y border-l border-amber-100 bg-amber-50/60 p-4 align-top backdrop-blur-sm group-hover:bg-amber-100/60 transition-colors">
                        <div className="space-y-1">
                          <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                            {order.id}
                          </p>
                          <p className="text-xs text-amber-400">
                            {order.createdAtLabel}
                          </p>
                          <div className="mt-2 flex items-center gap-2">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                                order.paymentStatus === "paid"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                            <span className="text-[10px] text-amber-500 font-medium">
                              via {order.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Customer info */}
                      <td className="border-y border-amber-100 bg-amber-50/60 p-4 align-top backdrop-blur-sm group-hover:bg-amber-100/60 transition-colors">
                        <div className="text-sm">
                          <p className="font-semibold text-amber-800">
                            {order.customerInfo.fullName}
                          </p>
                          <p className="text-xs text-amber-600">
                            {order.customerInfo.phoneNumber}
                          </p>
                          <p className="text-xs text-amber-400 mt-1 line-clamp-1 italic">
                            {order.customerInfo.houseAddress}, {order.customerInfo.city}
                          </p>
                        </div>
                      </td>

                      {/* Item count/list */}
                      <td className="border-y border-amber-100 bg-amber-50/60 p-4 align-top text-center backdrop-blur-sm group-hover:bg-amber-100/60 transition-colors">
                        <div className="relative group/items inline-block">
                          <span className="cursor-help rounded-full bg-amber-200/50 px-2 py-1 text-xs font-medium text-amber-700">
                            {order.products.reduce((acc, p) => acc + p.quantity, 0)} items
                          </span>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/items:block w-48 rounded-xl border border-amber-100 bg-white p-3 shadow-xl z-10 text-left">
                             <p className="text-[10px] font-bold text-amber-900 uppercase mb-2 border-b border-amber-50 pb-1">Order Items</p>
                             <div className="space-y-2">
                               {order.products.map(p => (
                                 <div key={p.id} className="flex justify-between text-[11px] gap-2">
                                   <span className="text-amber-700 line-clamp-1">{p.name}</span>
                                   <span className="text-amber-900 font-medium whitespace-nowrap">x{p.quantity}</span>
                                 </div>
                               ))}
                             </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="border-y border-amber-100 bg-amber-50/60 p-4 align-top backdrop-blur-sm group-hover:bg-amber-100/60 transition-colors">
                        <select
                          value={
                            orderStatusSelections[order.id] ??
                            order.deliveryStatus
                          }
                          onChange={(event) =>
                            onOrderStatusChange(
                              order.id,
                              event.target.value as DeliveryStatus
                            )
                          }
                          disabled={updatingStatusIds.includes(order.id)}
                          className="w-full rounded-xl border border-amber-200 bg-white/50 px-3 py-1.5 text-xs text-amber-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                        >
                          {deliveryStatusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Delivery Fee Adjustment */}
                      <td className="border-y border-amber-100 bg-amber-50/60 p-4 align-top backdrop-blur-sm group-hover:bg-amber-100/60 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-amber-400 text-[10px]">₦</span>
                            <input
                              type="number"
                              min={0}
                              step="0.01"
                              value={
                                orderDeliveryFees[order.id] ??
                                order.deliveryFee.toString()
                              }
                              onChange={(event) =>
                                onOrderDeliveryFeeInputChange(
                                  order.id,
                                  event.target.value
                                )
                              }
                              className="w-20 rounded-xl border border-amber-200 bg-white/50 pl-5 pr-2 py-1.5 text-xs text-amber-900 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                            />
                          </div>
                          <Button
                            onClick={() => onConfirmOrderDeliveryFee(order)}
                            className="h-8 w-8 rounded-xl p-0 bg-green-500 hover:bg-green-600 text-white shrink-0"
                            disabled={savingOrderFeeIds.includes(order.id)}
                          >
                            {savingOrderFeeIds.includes(order.id) ? (
                              <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            )}
                          </Button>
                        </div>
                      </td>

                      {/* Total */}
                      <td className="rounded-r-2xl border-y border-r border-amber-100 bg-amber-50/60 p-4 align-top text-right backdrop-blur-sm group-hover:bg-amber-100/60 transition-colors">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-amber-900">
                             {currencyFormatter.format(order.totalAmount)}
                          </p>
                          <p className="text-[10px] text-amber-400">
                            Sub: {currencyFormatter.format(order.cartSubtotal)}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}