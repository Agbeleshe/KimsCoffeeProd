"use client";

import { Card, CardContent } from "@/components/ui/card";

export const ProductCardSkeleton = () => {
  return (
    <Card className="group relative w-[320px] overflow-hidden border-0 bg-gradient-to-br from-white via-amber-50/30 to-white animate-pulse">
      {/* Decorative corner accent skeleton */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-200 to-transparent rounded-bl-full" />

      <CardContent className="p-0 relative">
        {/* Image Section Skeleton */}
        <div className="relative overflow-hidden h-56 bg-gradient-to-b from-gray-200 to-gray-100">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-300/20 via-transparent to-transparent" />

          {/* Sale badge skeleton */}
          <div className="absolute top-3 right-3">
            <div className="bg-gray-300 text-gray-300 px-3 py-1.5 rounded-lg transform -rotate-3">
              <span className="text-xs">-0%</span>
            </div>
          </div>

          {/* Quality badge skeleton */}
          <div className="absolute top-3 left-3">
            <div className="bg-gray-300 p-2 rounded-full">
              <div className="w-4 h-4"></div>
            </div>
          </div>
        </div>

        {/* Content Section Skeleton */}
        <div className="p-5 space-y-3">
          {/* Category and Stock Status */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 bg-gray-200 rounded-full" />
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
          </div>

          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>

          {/* Rating Skeleton */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded-sm" />
              ))}
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          {/* Features Skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
          </div>

          {/* Divider Skeleton */}
          <div className="h-px bg-gray-200" />

          {/* Price and CTA Skeleton */}
          <div className="flex items-end justify-between pt-2">
            {/* Price Skeleton */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-baseline gap-2">
                <div className="h-8 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
              </div>
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>

            {/* CTA Button Skeleton */}
            <div className="h-10 w-28 bg-gray-300 rounded-lg" />
          </div>

          {/* Charity Program Skeleton */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </CardContent>

      {/* Bottom accent line skeleton */}
      <div className="h-1 bg-gray-200" />
    </Card>
  );
};
