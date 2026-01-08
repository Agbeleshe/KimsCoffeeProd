"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import useCartStore from "@/lib/stores/cartStore";

const CartPage = () => {
  const items = useCartStore((state) => state.items);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const currencyFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });

  if (!items.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-amber-50 via-white to-orange-50">
        <div className="text-center space-y-4">
          <p className="text-2xl font-semibold text-amber-900">
            Your cart is empty
          </p>
          <p className="text-amber-600 max-w-xl">
            Add your favourite coffee blends to the cart and they will stay here
            even if you leave the page. Ready when you are.
          </p>
          <Link href="/products">
            <Button className="bg-gradient-to-r mt-3 from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-amber-900">Cart Details</h1>
          <p className="text-sm text-amber-600">
            Delivery usually takes <strong>12–24 hours</strong>, depending on
            your location.
          </p>
        </header>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <section className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-amber-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-lg font-semibold text-amber-900">
                      {item.name}
                    </p>
                    <p className="text-sm text-amber-500 uppercase tracking-wide">
                      {item.category}
                    </p>
                    <p className="text-md font-semibold text-amber-700">
                      {currencyFormatter.format(item.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 justify-between">
                  <div className="flex items-center rounded-full border border-amber-200 bg-amber-50">
                    <button
                      className="px-3 py-1 text-lg text-amber-700 hover:text-amber-900"
                      onClick={() => decrementQuantity(item.id)}
                      disabled={item.quantity === 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus />
                    </button>
                    <span className="px-4 font-semibold text-amber-900">
                      {item.quantity}
                    </span>
                    <button
                      className="px-3 py-1 text-lg text-amber-700 hover:text-amber-900"
                      onClick={() => incrementQuantity(item.id)}
                      aria-label="Increase quantity"
                    >
                      <Plus />
                    </button>
                  </div>

                  <p className="text-sm text-amber-600">
                    Item subtotal:{" "}
                    <strong className="text-amber-900">
                      {currencyFormatter.format(item.price * item.quantity)}
                    </strong>
                  </p>
                </div>
              </article>
            ))}

            <div className="flex justify-end">
              <Button
                variant="outline"
                className="text-amber-700 border-amber-200 hover:border-amber-300"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </section>

          <aside className="space-y-6 rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-xl">
            <div className="space-y-3">
              <p className="text-sm text-amber-500">Cart summary</p>
              <p className="text-4xl font-bold text-amber-900">
                {currencyFormatter.format(subtotal)}
              </p>
              <p className="text-sm text-amber-600">
                {items.reduce((acc, item) => acc + item.quantity, 0)} items
                added
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-amber-600">
                Delivery fee will be confirmed on checkout
              </p>
              <Button
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                asChild
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
