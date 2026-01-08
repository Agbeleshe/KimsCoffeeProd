"use client";

import { Button } from "@/components/ui/button";
import {
  Grid,
  LogOut,
  Package,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { AdminOrder } from "../types";


interface AdminHeaderProps {
  email: string;
  products: number;
  order: AdminOrder[];
  onSignOut: () => void;
}

export default function AdminHeader({
  email,
  onSignOut,
  products,
  order,
}: AdminHeaderProps) {
  const whitePanel =
    "bg-white/95 border border-amber-100 shadow-xl rounded-2xl p-6 backdrop-blur-sm";

  return (
    <div className={whitePanel}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2 flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Image src={logo} alt="Admin Icon" width={24} height={24} />
            </div>
            Admin Panel
          </h1>
          <p className="text-amber-700">
            Welcome back, <span className="font-semibold">{email}</span>
          </p>
        </div>
        <Button
          onClick={onSignOut}
          variant="outline"
          className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>

      <StatusDashboard products={products} order={order} />
    </div>
  );
}

function StatusDashboard({
  products,
  order,
}: {
  products: number;
  order: AdminOrder[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
      <StatusItem
        icon={<Package className="h-5 w-5 text-amber-600" />}
        label="Total Products"
        value={products}
      />
      <StatusItem
        icon={<ShoppingBasket className="h-5 w-5 text-amber-600" />}
        label="Pending Orders"
        value={order.filter((o) => o.deliveryStatus === "pending").length}
      />
      <StatusItem
        icon={<Grid className="h-5 w-5 text-amber-600" />}
        label="Total Orders"
        value={order.length}
      />
    </div>
  );
}

function StatusItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white rounded-lg border border-amber-200">
        {icon}
      </div>
      <div>
        <p className="text-sm text-amber-600">{label}</p>
        <p className="font-semibold text-amber-800">{value}</p>
      </div>
    </div>
  );
}
