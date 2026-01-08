"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  doc,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useCartStore from "@/lib/stores/cartStore";
import { db } from "@/lib/firebase/client";
import FormInput from "@/components/ui/FormInput";
import LocationDropdowns from "@/components/checkout/LocationDropdown";
import { Minus, Plus } from "lucide-react";
import { generateOrderId } from "@/utils/generateOrderId";

declare global {
  interface Window {
    FlutterwaveCheckout?: any;
  }
}

const userOrderId = generateOrderId();

const createInitialCustomerInfo = (orderId: string) => ({
  fullName: "",
  phoneNumber: "",
  city: "",
  state: "",
  country: "",
  houseAddress: "",
  majorLandmark: "",
  socialHandle: "",
  alternativeAddress: "",
  zipCode: "",
  email: "",
  optionalPhoneNumber: "",
  orderId,
});

type CustomerInfo = ReturnType<typeof createInitialCustomerInfo>;

const loadFlutterwaveScript = () => {
  return new Promise<(options: any) => void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(
        new Error("Flutterwave checkout is only available in the browser.")
      );
      return;
    }

    if (window.FlutterwaveCheckout) {
      resolve(window.FlutterwaveCheckout);
      return;
    }

    const scriptId = "flutterwave-js";
    if (document.getElementById(scriptId)) {
      const existing = document.getElementById(scriptId) as HTMLScriptElement;
      existing.addEventListener("load", () =>
        resolve(window.FlutterwaveCheckout)
      );
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Flutterwave script."))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.id = scriptId;
    script.async = true;
    script.onload = () => {
      if (window.FlutterwaveCheckout) {
        resolve(window.FlutterwaveCheckout);
      } else {
        reject(
          new Error("Flutterwave script loaded, but checkout is unavailable.")
        );
      }
    };
    script.onerror = () =>
      reject(new Error("Failed to load Flutterwave script."));
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderId] = useState(() => generateOrderId());

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() =>
    createInitialCustomerInfo(orderId)
  );

  const [paymentMethod, setPaymentMethod] = useState<"flutterwave" | "cod">(
    "flutterwave"
  );
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [loadingDeliveryFee, setLoadingDeliveryFee] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const finalTotal = subtotal + deliveryFee;

  useEffect(() => {
    const docRef = doc(db, "settings", "deliveryFee");
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          setDeliveryFee(0);
          setLoadingDeliveryFee(false);
          return;
        }

        const data = snapshot.data();
        setDeliveryFee(typeof data.amount === "number" ? data.amount : 0);
        setLoadingDeliveryFee(false);
      },
      (error) => {
        console.error("Error reading delivery fee:", error);
        toast.error("Could not retrieve delivery fee yet.");
        setLoadingDeliveryFee(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleChange =
    (field: keyof CustomerInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustomerInfo((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const requiredFields: (keyof CustomerInfo)[] = [
    "fullName",
    "phoneNumber",
    "city",
    "state",
    "country",
    "houseAddress",
    "majorLandmark",
    "email",
  ];

  const validateRequiredFields = () => {
    for (const field of requiredFields) {
      if (!customerInfo[field].trim()) {
        toast.error("Please fill out all required customer fields.");
        return false;
      }
    }
    return true;
  };

  const createOrderRecord = async (
    paymentStatus: string,
    reference?: string
  ) => {
    const orderPayload = {
      products: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
      })),
      cartSubtotal: subtotal,
      deliveryFee,
      totalAmount: finalTotal,
      paymentMethod:
        paymentMethod === "flutterwave" ? "flutterwave" : "pay-on-delivery",
      paymentStatus,
      deliveryFeeConfirmed: deliveryFee,
      deliveryStatus: "pending",
      paymentReference: reference || null,
      customerInfo,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(collection(db, "orders"), orderPayload);
  };

  const handleFlutterwavePayment = async () => {
    const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;
    if (!publicKey) {
      throw new Error("Flutterwave key is missing in environment.");
    }

    const FlutterwaveCheckout = await loadFlutterwaveScript();

    return new Promise<{ transaction_id: string }>((resolve, reject) => {
      const txRef = `kimcoffee-${Date.now()}`;

      const callback = (response: any) => {
        if (response.status === "successful") {
          resolve(response);
        } else {
          reject(new Error("Payment was not successful."));
        }
      };

      const onClose = () => {
        reject(new Error("Flutterwave payment was closed before completion."));
      };

      FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: txRef,
        amount: finalTotal,
        currency: "NGN",
        payment_options: "card,ussd,account,banktransfer",
        customer: {
          email: `${customerInfo.fullName.replace(/\s+/g, ".")}@example.com`,
          phone_number: customerInfo.phoneNumber,
          name: customerInfo.fullName,
        },
        customizations: {
          title: "Kim Coffee Order",
          description: "Premium Nigerian coffee order",
          logo: `${window.location.origin}/logo.png`,
        },
        callback,
        onclose: onClose,
      });
    });
  };

  // In your page.tsx - update the sendOrderEmail function
  const sendOrderEmail = async () => {
    console.log("🔄 Attempting to send email...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // ← Important: Tell server we want JSON
        },
        body: JSON.stringify({
          email: customerInfo.email,
          fullName: customerInfo.fullName,
          orderId: customerInfo.orderId,
          amount: finalTotal,
        }),
      });

      console.log("📡 Response status:", response.status);
      console.log(
        "📡 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // First check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("❌ Server returned non-JSON:", text.substring(0, 200));
        throw new Error(
          `Server returned ${response.status}: ${text.substring(0, 100)}...`
        );
      }

      const result = await response.json();
      console.log("✅ Email API response:", result);

      if (!response.ok) {
        throw new Error(
          result.error || `Request failed with status ${response.status}`
        );
      }

      return result;
    } catch (error) {
      console.error("❌ Email sending failed:", error);
      throw error; // Re-throw so handleSubmit knows it failed
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) {
      toast("Add items to the cart first.");
      return;
    }

    if (!validateRequiredFields()) {
      return;
    }

    setIsSubmitting(true);

    try {
      let paymentReference = null;

      if (paymentMethod === "flutterwave") {
        const response = await handleFlutterwavePayment();
        paymentReference = response.transaction_id;
        await createOrderRecord("paid", paymentReference);
        toast.success("Payment successful!");
      } else {
        await createOrderRecord("pending");
        toast.success("Order recorded. Pay on delivery when it arrives.");
      }

      // Try to send email but don't fail the whole order if it fails
      try {
        await sendOrderEmail();
        console.log("Order confirmation email sent");
      } catch (emailError) {
        console.error("Email failed but order saved:", emailError);
        // Don't show error to user, just log it
      }

      clearCart();
      router.push("/products");
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error?.message ?? "Checkout failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const currencyFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });

  const handleLocationChange = useCallback(
    (location: { country: string; state: string; city: string }): void => {
      setCustomerInfo((prev) => ({
        ...prev,
        country: location.country,
        state: location.state,
        city: location.city,
      }));
    },
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2 text-center">
          <p className="text-sm text-amber-500">Fast, secure checkout</p>
          <h1 className="text-3xl font-bold text-amber-900">Checkout</h1>
          <p className="text-sm text-amber-600">
            Delivery fee is configured by the admin and included before payment.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <form
            className="space-y-6 rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-xl"
            onSubmit={handleSubmit}
          >
            <section className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-amber-600">
                  Customer Info
                </p>
                <span className="text-xs text-red-500">* Required</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  label="Full name"
                  id="fullName"
                  value={customerInfo.fullName}
                  onChange={handleChange("fullName")}
                  required
                />
                <FormInput
                  label="Phone number"
                  id="phoneNumber"
                  type="tel"
                  value={customerInfo.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  required
                />
                <FormInput
                  label=" Optional Phone number"
                  id="optionalPhoneNumber"
                  type="tel"
                  value={customerInfo.optionalPhoneNumber}
                  onChange={handleChange("optionalPhoneNumber")}
                />
                <FormInput
                  label=" Valid Email"
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={handleChange("email")}
                  required
                />

                <LocationDropdowns
                  onLocationChange={handleLocationChange}
                  initialValues={{
                    country: customerInfo.country,
                    state: customerInfo.state,
                    city: customerInfo.city,
                  }}
                />

                <FormInput
                  label="House address"
                  id="houseAddress"
                  value={customerInfo.houseAddress}
                  onChange={handleChange("houseAddress")}
                  required
                />
                <FormInput
                  label="Major landmark"
                  id="majorLandmark"
                  value={customerInfo.majorLandmark}
                  onChange={handleChange("majorLandmark")}
                  required
                />
                <FormInput
                  label="Social handle (optional)"
                  id="socialHandle"
                  value={customerInfo.socialHandle}
                  onChange={handleChange("socialHandle")}
                />
                <FormInput
                  label="Alternative address (optional)"
                  id="alternativeAddress"
                  value={customerInfo.alternativeAddress}
                  onChange={handleChange("alternativeAddress")}
                />
                <FormInput
                  label="Zip code (optional)"
                  id="zipCode"
                  value={customerInfo.zipCode}
                  onChange={handleChange("zipCode")}
                />
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-amber-600">
                  Payment method
                </p>
                <span className="text-xs text-amber-400">Choose one</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="space-y-1 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "flutterwave"}
                    onChange={() => setPaymentMethod("flutterwave")}
                    className="mr-2"
                  />
                  <p className="text-sm font-semibold text-amber-900">
                    Pay Online
                  </p>
                  <p className="text-xs text-amber-500">
                    Secure Flutterwave checkout (recommended).
                  </p>
                </label>
                {customerInfo.country === "Nigeria" && (
                  <label className="space-y-1 rounded-2xl border border-amber-200 bg-white p-4 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mr-2"
                    />
                    <p className="text-sm font-semibold text-amber-900">
                      Pay on Delivery
                    </p>
                    <p className="text-xs text-amber-500">
                      Pay when the courier arrives. You can still complete
                      Flutterwave payment beforehand.
                    </p>
                  </label>
                )}
              </div>
            </section>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
              disabled={isSubmitting || loadingDeliveryFee || subtotal === 0}
            >
              {isSubmitting ? "Processing..." : "Confirm & Pay"}
            </Button>
          </form>

          <aside className="space-y-6 rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-amber-900">
              Order summary
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-amber-900">{item.name}</p>
                    <p className="text-sm text-amber-500">
                      {item.quantity} × {currencyFormatter.format(item.price)}
                    </p>
                    <div className="flex mt-3 items-center rounded-full border border-amber-200 bg-amber-50">
                      <button
                        className="px-3 py-1 text-sm text-amber-700 hover:text-amber-900"
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
                        className="px-3 py-1 text-sm text-amber-700 hover:text-amber-900"
                        onClick={() => incrementQuantity(item.id)}
                        aria-label="Increase quantity"
                      >
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold text-amber-900">
                    {currencyFormatter.format(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-amber-600">
                <span>Cart total</span>
                <span>{currencyFormatter.format(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-amber-600">
                <span>Delivery fee</span>
                <span>
                  {loadingDeliveryFee
                    ? "Loading..."
                    : currencyFormatter.format(deliveryFee)}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold text-amber-900">
                <span>Total</span>
                <span>{currencyFormatter.format(finalTotal)}</span>
              </div>
            </div>

            <p className="text-xs text-amber-500">
              Delivery fee is confirmed by admin in the{" "}
              <strong>Admin panel</strong>.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
