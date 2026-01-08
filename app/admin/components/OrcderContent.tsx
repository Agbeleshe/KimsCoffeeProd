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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-amber-900">Orders</h3>
          <p className="text-sm text-amber-500">
            Use this panel to confirm delivery fees and advance delivery status.
          </p>
        </div>

        {loadingOrders ? (
          <p className="py-6 text-center text-amber-600">
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
          <p className="py-6 text-center text-amber-500">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
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
        )}
      </div>
    </div>
  );
}