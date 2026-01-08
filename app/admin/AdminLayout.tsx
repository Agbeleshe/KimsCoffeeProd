"use client";
import { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu, Package, ListOrdered, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminLayoutProps {
  children: ReactNode;
  email?: string;
  onSignOut?: () => void;
  productsCount?: number;
  ordersCount?: number;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminLayout({
  children,
  email = "",
  onSignOut = () => {},
  productsCount = 0,
  ordersCount = 0,
  activeTab,
  onTabChange,
}: AdminLayoutProps) {
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <ListOrdered className="h-4 w-4" />,
      count: ordersCount,
    },
    {
      id: "post-product",
      label: "Post Product",
      icon: <Package className="h-4 w-4" />,
      count: productsCount,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden sticky top-0 z-50 border-b bg-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-56">
                {tabs.map((tab) => (
                  <DropdownMenuItem
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className="flex items-center gap-3"
                  >
                    {tab.icon}
                    <span className="flex-1">{tab.label}</span>

                    {tab.count !== undefined && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                        {tab.count}
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>

          {email && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{email}</span>
              <Button variant="outline" size="sm" onClick={onSignOut}>
                Sign Out
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* ================= TABS WRAPPER ================= */}
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        orientation="vertical"
        className="flex"
      >
        {/* ================= DESKTOP SIDEBAR ================= */}
        <aside className="hidden lg:flex w-64 flex-col border-r bg-white min-h-screen sticky top-0">
          <div className="border-b p-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            {email && <p className="mt-2 text-sm text-gray-600">{email}</p>}
          </div>

          <div className="flex-1 p-4 mt-14">
            <TabsList className="flex flex-col items-start space-y-2">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "w-full justify-start px-4 py-3",
                    "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    {tab.icon}
                    <span>{tab.label}</span>

                    {tab.count !== undefined && (
                      <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs">
                        {tab.count}
                      </span>
                    )}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="border-t p-4">
            <Button variant="outline" className="w-full" onClick={onSignOut}>
              Sign Out
            </Button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 h-screen overflow-hidden p-6">
          <div className="h-full overflow-y-auto">
            <TabsContent value="overview" className="mt-0">
              {children}
            </TabsContent>

            <TabsContent value="orders" className="mt-0">
              <div className="rounded-lg border bg-white p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Orders Management
                </h2>
                {children}
              </div>
            </TabsContent>

            <TabsContent value="post-product" className="mt-0">
              <div className="rounded-lg border bg-white p-4">
                <h2 className="text-xl font-semibold mb-4">
                  Product Management
                </h2>
                {children}
              </div>
            </TabsContent>
          </div>
        </main>
      </Tabs>
    </div>
  );
}
