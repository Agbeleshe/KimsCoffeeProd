"use client";
import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Menu, 
  Package, 
  ListOrdered, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  ChevronRight,
  Coffee,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "../../public/logo.png";
import Image from "next/image";

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
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      id: "complaints",
      label: "Complaints",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#FDFCFB]">
      {/* ================= TABS WRAPPER ================= */}
      <Tabs
        value={activeTab}
        onValueChange={onTabChange}
        orientation="vertical"
        className="flex h-full w-full"
      >
        {/* ================= DESKTOP SIDEBAR ================= */}
        <aside className="hidden lg:flex w-72 flex-col bg-[#0F0A05] text-white h-full z-40 shrink-0">
          <div className="p-8 space-y-8">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                <Image 
                  src={Logo} 
                  alt="Kim's Coffee" 
                  width={28} 
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-black uppercase tracking-tighter">
                  Kim<span className="text-amber-500">Coffee</span>
                </h1>
                <p className="text-[10px] font-bold tracking-[0.2em] text-amber-500/40 uppercase">
                  Admin Portal
                </p>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/40 mb-1">Authenticated as</p>
              <p className="text-sm font-semibold truncate text-amber-50/90">{email}</p>
            </div>
          </div>

          <div className="flex-1 px-4 space-y-2 mt-4">
            <TabsList className="flex flex-col items-start bg-transparent h-auto space-y-1 w-full">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "w-full justify-start px-4 py-3.5 rounded-xl text-white/50 transition-all duration-300 group",
                    "data-[state=active]:bg-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-amber-900/40"
                  )}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="transition-transform group-hover:scale-110 group-data-[state=active]:scale-110">
                      {tab.icon}
                    </span>
                    <span className="font-bold text-sm tracking-tight">{tab.label}</span>

                    {tab.count !== undefined && (
                      <span className={cn(
                        "ml-auto rounded-lg px-2 py-0.5 text-[10px] font-black",
                        activeTab === tab.id ? "bg-white/20 text-white" : "bg-amber-900/30 text-amber-500"
                      )}>
                        {tab.count}
                      </span>
                    )}
                    <ChevronRight className={cn(
                      "h-3 w-3 ml-2 opacity-0 -translate-x-2 transition-all",
                      activeTab === tab.id && "opacity-100 translate-x-0"
                    )} />
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="p-6 mt-auto">
            <Button 
              variant="ghost" 
              onClick={onSignOut}
              className="w-full justify-start gap-3 h-12 rounded-xl text-white/40 hover:text-white hover:bg-red-500/10 hover:border hover:border-red-500/20 transition-all font-bold"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* ================= MOBILE HEADER ================= */}
          <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-[#0F0A05] text-white border-b border-white/5">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="Logo" width={32} height={32} />
              <h1 className="font-black text-lg uppercase tracking-tight">Kim<span className="text-amber-500">Dash</span></h1>
            </div>

            <div className="flex items-center gap-2">
              <select 
                value={activeTab}
                onChange={(e) => onTabChange(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-amber-500 outline-none focus:ring-2 focus:ring-amber-600 appearance-none text-center min-w-[120px]"
              >
                {tabs.map(tab => (
                  <option key={tab.id} value={tab.id} className="bg-[#0F0A05]">{tab.label}</option>
                ))}
              </select>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onSignOut}
                className="text-white/40 hover:text-red-500"
              >
                <LogOut size={20} />
              </Button>
            </div>
          </header>

          {/* ================= SCROLLABLE CONTENT ================= */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Context Header */}
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black text-[#0F0A05] capitalize tracking-tight">
                  {activeTab.replace("-", " ")}
                </h2>
                <div className="flex items-center gap-2 text-sm font-bold text-amber-600/60 uppercase tracking-widest">
                  <span className="w-8 h-[2px] bg-amber-600/30" />
                  Dashboard Control
                </div>
              </div>

              {/* Tab Contents */}
              <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                <TabsContent value="overview" className="mt-0 outline-none">
                  {children}
                </TabsContent>

                <TabsContent value="orders" className="mt-0 outline-none">
                  <div className="space-y-6">
                    {children}
                  </div>
                </TabsContent>

                <TabsContent value="post-product" className="mt-0 outline-none">
                  <div className="space-y-6">
                    {children}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-0 outline-none">
                  <div className="space-y-6">
                    {children}
                  </div>
                </TabsContent>

                <TabsContent value="complaints" className="mt-0 outline-none">
                  <div className="space-y-6">
                    {children}
                  </div>
                </TabsContent>
              </div>
            </div>
            
            {/* Bottom Spacer/Footer */}
            <div className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
              <p>&copy; 2024 Kim's Coffee Admin</p>
              <div className="flex gap-4">
                <span>V 2.1.0</span>
                <span>Protected Portal</span>
              </div>
            </div>
          </main>
        </div>
      </Tabs>
    </div>
  );
}
