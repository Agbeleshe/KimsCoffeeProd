"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  customCategory?: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  image: string;
  charityProgram?: string;
  inStock: string;
  notes?: string;
  createdAt: any;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    try {
      // Create a query for products collection, ordered by creation date
      const productsQuery = query(
        collection(db, "products"),
        orderBy("createdAt", "desc")
      );

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        productsQuery,
        (snapshot) => {
          const productsData: Product[] = [];

          snapshot.forEach((doc) => {
            const data = doc.data();
            productsData.push({
              id: doc.id,
              name: data.name || "",
              slug: data.slug || "",
              category: data.category || "",
              customCategory: data.customCategory || "",
              price: typeof data.price === "number" ? data.price : 0,
              originalPrice: data.originalPrice || undefined,
              description: data.description || "",
              features: Array.isArray(data.features) ? data.features : [],
              image: data.image || "",
              charityProgram: data.charityProgram || undefined,
              inStock: data.inStock || "available",
              notes: data.notes || undefined,
              createdAt: data.createdAt,
            });
          });

          setProducts(productsData);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching products:", error);
          setError("Failed to load products. Please try again later.");
          setLoading(false);
        }
      );

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up products listener:", error);
      setError("Failed to connect to database.");
      setLoading(false);
    }
  }, []);

  const getProductsByCategory = (category: string) => {
    if (category === "all") return products;
    return products.filter((product) => product.category === category);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((product) => product.slug === slug);
  };
  return {
    products,
    loading,
    error,
    getProductsByCategory,
    getProductBySlug,
  };
};
