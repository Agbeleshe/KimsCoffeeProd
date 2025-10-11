"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-700 to-amber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to Join Our Coffee Journey?
        </h2>
        <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
          Experience the passion, quality, and community spirit that makes Kim
          Coffee special.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-amber-50 min-w-[250px]"
            >
              Explore Our Products
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className=" border-amber-900  hover:bg-amber-900 hover:text-white min-w-[250px]"
            >
              Get In Touch
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
