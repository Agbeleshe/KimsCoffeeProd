"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  doc,
  onSnapshot,
  collection,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useCartStore from "@/lib/stores/cartStore";
import { db } from "@/lib/firebase/client";
import FormInput from "@/components/ui/FormInput";
import LocationDropdowns from "@/components/checkout/LocationDropdown";
import { Minus, Plus, CheckCircle2, Copy, ShoppingCart, CreditCard, Truck, AlertCircle, Info, Loader2 } from "lucide-react";
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

    await setDoc(doc(db, "orders", customerInfo.orderId), orderPayload);
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
          title: "Kim's Coffee Order",
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState("");

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
      const currentOrderId = customerInfo.orderId;

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
      }

      setGeneratedOrderId(currentOrderId);
      setShowSuccessModal(true);
      clearCart();
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
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md animate-in zoom-in-95 duration-300 bg-white rounded-3xl p-8 text-center shadow-2xl relative">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-amber-900 mb-2">Order Successful!</h2>
            <p className="text-stone-500 mb-6">
              Thank you for your purchase. We will contact you shortly on your provided phone number.
            </p>
            
            <div className="bg-amber-50 rounded-2xl p-4 mb-6 border border-amber-100">
              <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Your Tracking ID</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-xl font-mono font-bold text-amber-900">{generatedOrderId}</code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedOrderId);
                    toast.success("Copied to clipboard!");
                  }}
                  className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => router.push("/track")}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold h-12 rounded-xl"
              >
                Track Purchase
              </Button>
              <Button 
                variant="ghost"
                onClick={() => router.push("/")}
                className="w-full text-stone-500 hover:text-amber-900 h-12 rounded-xl"
              >
                Back to Home
              </Button>
            </div>
            
            <p className="mt-6 text-xs text-stone-400 italic">
              A copy of this ID has been sent to your email.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2 text-center">
          <p className="text-sm text-amber-500">Fast, secure checkout</p>
          <h1 className="text-4xl font-black text-amber-900">Checkout</h1>
          <p className="text-sm text-amber-600">
            A tracking ID will be sent to your email. Please ensure your phone number is correct as we will contact you via phone.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <form
            className="space-y-6 rounded-2xl border border-amber-100 bg-white/90 p-8 shadow-xl"
            onSubmit={handleSubmit}
          >
            <section className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-amber-900 border-l-4 border-amber-500 pl-2">
                  Customer Information
                </p>
                <span className="text-[10px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">* Required</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  label="Full name"
                  id="fullName"
                  placeholder="John Doe"
                  value={customerInfo.fullName}
                  onChange={handleChange("fullName")}
                  required
                />
                <FormInput
                  label="Phone number"
                  id="phoneNumber"
                  type="tel"
                  placeholder="080..."
                  value={customerInfo.phoneNumber}
                  onChange={handleChange("phoneNumber")}
                  required
                />
                <FormInput
                  label="Optional Phone number"
                  id="optionalPhoneNumber"
                  type="tel"
                  placeholder="Another number"
                  value={customerInfo.optionalPhoneNumber}
                  onChange={handleChange("optionalPhoneNumber")}
                />
                <FormInput
                  label="Valid Email"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
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
                  placeholder="Street name, house number"
                  value={customerInfo.houseAddress}
                  onChange={handleChange("houseAddress")}
                  required
                />
                <FormInput
                  label="Major landmark"
                  id="majorLandmark"
                  placeholder="E.g. Near the big tree"
                  value={customerInfo.majorLandmark}
                  onChange={handleChange("majorLandmark")}
                  required
                />
                <FormInput
                  label="Social handle (optional)"
                  id="socialHandle"
                  placeholder="Instagram/Twitter"
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

            <section className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-amber-900 border-l-4 border-amber-500 pl-2">
                  Payment Method
                </p>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Choose one</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={`relative group transition-all rounded-3xl border-2 p-5 cursor-pointer ${paymentMethod === "flutterwave" ? "border-amber-500 bg-amber-50/50 shadow-md ring-4 ring-amber-500/5" : "border-stone-100 bg-white hover:border-amber-200"}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "flutterwave"}
                    onChange={() => setPaymentMethod("flutterwave")}
                    className="absolute top-4 right-4 accent-amber-600 w-4 h-4"
                  />
                  <CreditCard className={`w-8 h-8 mb-3 ${paymentMethod === "flutterwave" ? "text-amber-600" : "text-stone-300"}`} />
                  <p className="font-bold text-amber-900">Pay Online</p>
                  <p className="text-xs text-amber-600 mt-1">
                    Secure Flutterwave checkout.
                  </p>
                </label>
                {customerInfo.country === "Nigeria" && (
                  <label className={`relative group transition-all rounded-3xl border-2 p-5 cursor-pointer ${paymentMethod === "cod" ? "border-amber-500 bg-amber-50/50 shadow-md ring-4 ring-amber-500/5" : "border-stone-100 bg-white hover:border-amber-200"}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="absolute top-4 right-4 accent-amber-600 w-4 h-4"
                    />
                    <Truck className={`w-8 h-8 mb-3 ${paymentMethod === "cod" ? "text-amber-600" : "text-stone-300"}`} />
                    <p className="font-bold text-amber-900">Pay on Delivery</p>
                    <p className="text-xs text-amber-600 mt-1">
                      Pay when the courier arrives.
                    </p>
                  </label>
                )}
              </div>
            </section>

            <div className="pt-6 space-y-4">
              <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 leading-relaxed font-medium">
                  By clicking "Confirm & Pay", you agree that we will contact you via your phone number to confirm your order and actual location details.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white rounded-2xl shadow-xl shadow-amber-900/20 active:scale-[0.98] transition-all"
                disabled={isSubmitting || loadingDeliveryFee || subtotal === 0}
              >
                {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : "Confirm Order"}
              </Button>
            </div>
          </form>

          <aside className="space-y-8 sticky top-24 h-fit">
            <div className="rounded-3xl border border-amber-100 bg-white/90 p-8 shadow-xl">
              <h2 className="text-xl font-black text-amber-900 mb-6 border-b border-stone-50 pb-4 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-amber-600" />
                Order Summary
              </h2>
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-amber-900">{item.name}</p>
                      <p className="text-xs font-semibold text-amber-500 mt-1">
                        {item.quantity} × {currencyFormatter.format(item.price)}
                      </p>
                      <div className="flex mt-3 items-center rounded-xl border border-stone-100 bg-white shadow-sm w-fit overflow-hidden">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-stone-400 hover:text-amber-900 hover:bg-stone-50 transition-colors"
                          onClick={() => decrementQuantity(item.id)}
                          disabled={item.quantity === 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 font-black text-amber-900 border-x border-stone-50 min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-stone-400 hover:text-amber-900 hover:bg-stone-50 transition-colors"
                          onClick={() => incrementQuantity(item.id)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="font-bold text-amber-900">
                      {currencyFormatter.format(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3 pt-6 border-t border-stone-100">
                <div className="flex items-center justify-between text-sm font-medium text-stone-500">
                  <span>Cart Subtotal</span>
                  <span>{currencyFormatter.format(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-stone-500">
                  <span className="flex items-center gap-1.5 italic">
                    Estimated Delivery <Info className="w-3 h-3" />
                  </span>
                  <span>
                    {loadingDeliveryFee
                      ? "..."
                      : currencyFormatter.format(deliveryFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-2xl font-black text-amber-900 pt-3">
                  <span>Total</span>
                  <span>{currencyFormatter.format(finalTotal)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <p className="text-[10px] text-stone-400 leading-relaxed italic">
                  <strong>Please note:</strong> Delivery fees are estimates and can increase based on your specific location and accessibility.
                </p>
              </div>
            </div>
            
            <p className="text-center text-xs text-stone-400 font-medium">
              Secure Checkout • Encrypted SSL
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
