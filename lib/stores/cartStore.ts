"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  inStock?: string;
  charityProgram?: string;
  quantity: number;
};

export type CartProductInput = Omit<CartItem, "quantity">;

type CartState = {
  items: CartItem[];
  addItem: (product: CartProductInput, quantity?: number) => void;
  removeItem: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              { ...product, quantity: Math.max(1, quantity) },
            ],
          };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },
      incrementQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },
      decrementQuantity: (productId) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "kimcoffee-cart",
      storage:
        typeof window === "undefined"
          ? undefined
          : createJSONStorage(() => window.localStorage),
    }
  )
);

export default useCartStore;
