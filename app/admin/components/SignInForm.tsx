"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { toast } from "sonner";

interface SignInFormProps {
  onSignIn: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export default function SignInForm({
  onSignIn,
  isLoading,
  error,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignIn(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center  bg-amber-50  px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* Logo/Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
            <Image src={logo} alt="Kim's Coffee Logo" width={64} height={64} />
          </div>
        </div>

        {/* Sign In Card */}
        <Card className="border-amber-200  md:w-[400px]  shadow-2xl overflow-hidden">
          <div className="bg-amber-900 p-4">
            <div className="flex items-center justify-center space-x-3">
              <h2 className="text-xl font-semibold text-white">
                Welcome Back Admin
              </h2>
            </div>
          </div>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-gray-700 flex items-center gap-2"
                >
                  Admin Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="h-12 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-gray-700 flex items-center gap-2"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-12 border-amber-200 focus:border-amber-500 focus:ring-amber-500 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <span className="text-lg">⚠️</span> {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-500">
        Need help? Contact your system administrator
      </p>
    </div>
  );
}
