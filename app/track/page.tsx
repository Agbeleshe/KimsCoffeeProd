"use client";

import React, { useState } from "react";
import { db } from "@/lib/firebase/client";
import { doc, getDoc, collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Search, Loader2, Package, Truck, CheckCircle, AlertCircle, MessageSquare, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OrderProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface TrackedOrder {
  id: string;
  customerInfo: {
    fullName: string;
    email: string;
    phoneNumber: string;
    houseAddress: string;
    city: string;
    state: string;
  };
  deliveryStatus: "pending" | "processing" | "delivered";
  cartSubtotal: number;
  deliveryFee: number;
  totalAmount: number;
  products: OrderProduct[];
}

export default function TrackPage() {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState("");
  
  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    houseAddress: "",
  });
  const [savingEdit, setSavingEdit] = useState(false);

  // Complaint state
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [complaintText, setComplaintText] = useState("");
  const [submittingComplaint, setSubmittingComplaint] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError("");
    setOrder(null);
    setShowComplaintForm(false);
    setIsEditing(false);

    try {
      const docRef = doc(db, "orders", orderId.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const trackedOrder: TrackedOrder = {
          id: docSnap.id,
          customerInfo: {
            fullName: data.customerInfo?.fullName || "",
            email: data.customerInfo?.email || "",
            phoneNumber: data.customerInfo?.phoneNumber || "",
            houseAddress: data.customerInfo?.houseAddress || "",
            city: data.customerInfo?.city || "",
            state: data.customerInfo?.state || "",
          },
          deliveryStatus: data.deliveryStatus || "pending",
          cartSubtotal: data.cartSubtotal || 0,
          deliveryFee: data.deliveryFee || 0,
          totalAmount: data.totalAmount,
          products: data.products || [],
        };
        setOrder(trackedOrder);
        setEditForm({
          fullName: trackedOrder.customerInfo.fullName,
          email: trackedOrder.customerInfo.email,
          phoneNumber: trackedOrder.customerInfo.phoneNumber,
          houseAddress: trackedOrder.customerInfo.houseAddress,
        });
      } else {
        setError("Order not found. Please check your ID and try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching your order.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    setSavingEdit(true);
    try {
      const docRef = doc(db, "orders", order.id);
      await updateDoc(docRef, {
        "customerInfo.fullName": editForm.fullName,
        "customerInfo.email": editForm.email,
        "customerInfo.phoneNumber": editForm.phoneNumber,
        "customerInfo.houseAddress": editForm.houseAddress,
      });

      setOrder({
        ...order,
        customerInfo: {
          ...order.customerInfo,
          ...editForm,
        },
      });
      setIsEditing(false);
      toast.success("Information updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update information.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order || !complaintText.trim()) return;

    setSubmittingComplaint(true);
    try {
      // Check existing complaints count for this order
      const { collection, query, where, getDocs } = await import("firebase/firestore");
      const complaintsRef = collection(db, "complaints");
      const q = query(complaintsRef, where("orderId", "==", order.id));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.size >= 5) {
        toast.error("Maximum of 5 complaints allowed per order. Please contact support directly if you need more help.");
        setSubmittingComplaint(false);
        return;
      }

      await addDoc(collection(db, "complaints"), {
        orderId: order.id,
        customerName: order.customerInfo.fullName,
        complaintText: complaintText.trim(),
        status: "open",
        createdAt: serverTimestamp(),
      });
      toast.success("Complaint submitted successfully! We'll look into it.");
      setComplaintText("");
      setShowComplaintForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit complaint. Please try again.");
    } finally {
      setSubmittingComplaint(false);
    }
  };

  const statusSteps = [
    { key: "pending", label: "Pending", icon: Package },
    { key: "processing", label: "Processing", icon: Truck },
    { key: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === order?.deliveryStatus);
  const canEdit = order?.deliveryStatus === "pending";

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-amber-900 tracking-tight">Track Your Purchase</h1>
          <p className="mt-2 text-stone-600">Enter your Product ID to see real-time updates.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrack} className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your Order ID (e.g. ZOV-9087-322P)"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-amber-100 bg-white shadow-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-50 Transition-all outline-none text-lg text-amber-900 font-medium"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-300 w-6 h-6" />
            <Button 
              type="submit" 
              disabled={loading || !orderId.trim()}
              className="absolute right-2 top-2 bottom-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white px-6 font-bold"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Track"}
            </Button>
          </div>
        </form>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        {order && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Status Visualizer */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl shadow-amber-900/5">
              <h2 className="text-xl font-bold text-amber-900 mb-8 flex items-center gap-2">
                Order Status: <span className="uppercase text-amber-600">{order.deliveryStatus}</span>
              </h2>
              
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-5 left-8 right-8 h-1 bg-stone-100 -z-1" />
                <div 
                  className="absolute top-5 left-8 h-1 bg-amber-500 transition-all duration-1000 ease-out" 
                  style={{ width: currentStepIndex === 0 ? '0%' : currentStepIndex === 1 ? '45%' : '88% ' }}
                />
                
                <div className="flex justify-between relative">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    
                    return (
                      <div key={step.key} className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                          isActive 
                            ? "bg-amber-500 border-amber-200 text-white" 
                            : "bg-white border-stone-100 text-stone-300"
                        } ${isCurrent ? "scale-110 shadow-lg shadow-amber-500/30 ring-4 ring-amber-500/10" : ""}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`mt-3 text-sm font-bold ${isActive ? "text-amber-900" : "text-stone-300"}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {!canEdit && (
                <div className="mt-8 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-2 text-amber-800 text-xs font-medium">
                  <Info className="w-4 h-4" />
                  Your order is already being processed and details can no longer be changed.
                </div>
              )}
            </div>

            {/* Customer Information Section */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl shadow-amber-900/5">
              <div className="flex justify-between items-center mb-6 border-b border-stone-50 pb-4">
                <h3 className="text-lg font-bold text-amber-900">Your Information</h3>
                {canEdit && !isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="text-amber-600 hover:text-amber-700 font-bold text-sm flex items-center gap-1"
                  >
                    Edit Details
                  </button>
                )}
              </div>

              {!isEditing ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Full Name</p>
                    <p className="font-bold text-stone-800">{order.customerInfo.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Email Address</p>
                    <p className="font-bold text-stone-800">{order.customerInfo.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Phone Number</p>
                    <p className="font-bold text-stone-800">{order.customerInfo.phoneNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Delivery Address</p>
                    <p className="font-bold text-stone-800">
                      {order.customerInfo.houseAddress}, {order.customerInfo.city}, {order.customerInfo.state}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateInfo} className="space-y-4 animate-in fade-in zoom-in-95">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-amber-600 uppercase">Full Name</label>
                      <input 
                        type="text"
                        required
                        value={editForm.fullName}
                        onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                        className="w-full p-3 rounded-xl border border-neutral-200 focus:border-amber-500 outline-none text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-amber-600 uppercase">Email</label>
                      <input 
                        type="email"
                        required
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                        className="w-full p-3 rounded-xl border border-neutral-200 focus:border-amber-500 outline-none text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-amber-600 uppercase">Phone</label>
                      <input 
                        type="tel"
                        required
                        value={editForm.phoneNumber}
                        onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
                        className="w-full p-3 rounded-xl border border-neutral-200 focus:border-amber-500 outline-none text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-amber-600 uppercase">Delivery Address</label>
                      <input 
                        type="text"
                        required
                        value={editForm.houseAddress}
                        onChange={(e) => setEditForm({...editForm, houseAddress: e.target.value})}
                        className="w-full p-3 rounded-xl border border-neutral-200 focus:border-amber-500 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      type="submit" 
                      disabled={savingEdit}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
                    >
                      {savingEdit ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-3xl p-8 border border-neutral-100 shadow-xl shadow-amber-900/5">
              <h3 className="text-lg font-bold text-amber-900 mb-4 border-b border-stone-50 pb-4">Order Summary</h3>
              <div className="space-y-3">
                {order.products.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2">
                    <div>
                      <p className="font-bold text-stone-800">{item.name}</p>
                      <p className="text-sm text-stone-500">{item.quantity} x ₦{item.price.toLocaleString()}</p>
                    </div>
                    <p className="font-bold text-amber-700">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}

                <div className="pt-4 border-t border-stone-100 space-y-2">
                  <div className="flex justify-between items-center text-stone-500 font-medium text-sm">
                    <span>Subtotal</span>
                    <span>₦{(order.cartSubtotal || (order.totalAmount - order.deliveryFee)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-stone-500 font-medium text-sm">
                    <span>Delivery Fee</span>
                    <span>₦{order.deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-50">
                    <span className="text-stone-500 font-bold uppercase tracking-wider text-xs">Total Amount Paid</span>
                    <span className="text-2xl font-black text-amber-900">₦{order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Complaint Trigger */}
              <div className="mt-8">
                {!showComplaintForm ? (
                  <button 
                    onClick={() => setShowComplaintForm(true)}
                    className="flex items-center gap-2 text-stone-400 hover:text-amber-600 transition-colors text-sm font-bold mx-auto"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Problem with your order? File a complaint
                  </button>
                ) : (
                  <form onSubmit={handleSubmitComplaint} className="mt-4 p-6 bg-amber-50 rounded-2xl border border-amber-100 animate-in zoom-in-95">
                    <h4 className="font-bold text-amber-900 mb-2">File a Complaint</h4>
                    <p className="text-xs text-amber-700 mb-4">Tell us what's wrong (e.g. taking too long) and we'll get back to you.</p>
                    <textarea 
                      required
                      value={complaintText}
                      onChange={(e) => setComplaintText(e.target.value)}
                      placeholder="Descriptions of the issue..."
                      className="w-full p-4 rounded-xl border border-amber-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none text-sm min-h-[100px]"
                    />
                    <div className="flex gap-2 mt-4">
                      <Button 
                        type="submit" 
                        disabled={submittingComplaint}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
                      >
                        {submittingComplaint ? "Submitting..." : "Submit Complaint"}
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost"
                        onClick={() => setShowComplaintForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
