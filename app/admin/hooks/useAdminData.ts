"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAdminStore } from "@/lib/stores/adminStore";
import { useImageUpload } from "./useImageUpload";
import { toast } from "sonner";
import { Product, AdminOrder, DeliveryStatus } from "../types";

const deliveryStatusOptions: DeliveryStatus[] = [
  "pending",
  "processing",
  "delivered",
];

export function useAdminData(authUser: any) {
  // From existing stores
  const {
    form,
    updateField,
    resetForm,
    loading: formLoading,
    setLoading,
    setMessage,
    message,
  } = useAdminStore();

  const {
    uploadingImage,
    imagePreview,
    uploadImageToImgBB,
    clearImagePreview,
    setImagePreview,
  } = useImageUpload();

  // State from original component
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [deliveryFeeValue, setDeliveryFeeValue] = useState(0);
  const [deliveryFeeInput, setDeliveryFeeInput] = useState("0");
  const [loadingDeliveryFee, setLoadingDeliveryFee] = useState(true);
  const [isSavingFee, setIsSavingFee] = useState(false);
  const [orderDeliveryFees, setOrderDeliveryFees] = useState<
    Record<string, string>
  >({});
  const [savingOrderFeeIds, setSavingOrderFeeIds] = useState<string[]>([]);
  const [updatingStatusIds, setUpdatingStatusIds] = useState<string[]>([]);
  const [orderStatusSelections, setOrderStatusSelections] = useState<
    Record<string, DeliveryStatus>
  >({});
  const [activeTab, setActiveTab] = useState("list");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch products from Firebase
  useEffect(() => {
    if (!authUser) return;

    setLoadingProducts(true);
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const productsList: Product[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          productsList.push({
            id: doc.id,
            name: data.name || "",
            slug: data.slug || "",
            category: data.category || "",
            customCategory: data.customCategory || "",
            price: data.price?.toString() || "0",
            originalPrice: data.originalPrice?.toString() || "0",
            inStock: data.inStock || "available",
            description: data.description || "",
            features: Array.isArray(data.features)
              ? data.features.join(", ")
              : data.features || "",
            image: data.image || "",
            charityProgram: data.charityProgram || "",
            notes: data.notes || "",
            createdAt: data.createdAt,
            createdBy: data.createdBy || "",
          });
        });
        setProducts(productsList);
        setLoadingProducts(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setLoadingProducts(false);
      }
    );

    return () => unsubscribe();
  }, [authUser]);

  const handleSaveDeliveryFee = async () => {
    const parsedValue = parseFloat(deliveryFeeInput);
    if (Number.isNaN(parsedValue)) {
      toast.error("Enter a valid delivery fee amount.");
      return;
    }

    setIsSavingFee(true);
    try {
      await setDoc(doc(db, "settings", "deliveryFee"), { amount: parsedValue });
      toast.success("Default delivery fee updated.");
    } catch (error) {
      console.error("Error saving delivery fee:", error);
      toast.error("Unable to save delivery fee.");
    } finally {
      setIsSavingFee(false);
    }
  };

  const handleDeliveryFeeInputChange = (orderId: string, value: string) => {
    setOrderDeliveryFees((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleConfirmOrderDeliveryFee = async (order: AdminOrder) => {
    const rawValue = orderDeliveryFees[order.id];
    const parsedValue = parseFloat(rawValue ?? "");
    if (Number.isNaN(parsedValue)) {
      toast.error("Enter a valid delivery fee for the order.");
      return;
    }

    setSavingOrderFeeIds((prev) => [...prev, order.id]);
    try {
      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, {
        deliveryFee: parsedValue,
        totalAmount: order.cartSubtotal + parsedValue,
        deliveryFeeConfirmed: parsedValue,
      });
      toast.success("Order delivery fee confirmed.");
    } catch (error) {
      console.error("Error updating order delivery fee:", error);
      toast.error("Could not confirm delivery fee.");
    } finally {
      setSavingOrderFeeIds((prev) => prev.filter((id) => id !== order.id));
    }
  };

  const handleOrderStatusChange = async (
    orderId: string,
    newStatus: DeliveryStatus
  ) => {
    setOrderStatusSelections((prev) => ({ ...prev, [orderId]: newStatus }));
    setUpdatingStatusIds((prev) => [...prev, orderId]);
    try {
      await updateDoc(doc(db, "orders", orderId), {
        deliveryStatus: newStatus,
      });
      toast.success("Delivery status updated.");
    } catch (error) {
      console.error("Error updating delivery status:", error);
      toast.error("Failed to update delivery status.");
    } finally {
      setUpdatingStatusIds((prev) => prev.filter((id) => id !== orderId));
    }
  };

  useEffect(() => {
    setOrderDeliveryFees((prev) => {
      const next = { ...prev };
      let hasChanges = false;
      orders.forEach((order) => {
        if (!(order.id in next)) {
          next[order.id] = order.deliveryFee.toString();
          hasChanges = true;
        }
      });
      return hasChanges ? next : prev;
    });

    setOrderStatusSelections((prev) => {
      const next = { ...prev };
      let hasChanges = false;
      orders.forEach((order) => {
        if (!(order.id in next)) {
          next[order.id] = order.deliveryStatus;
          hasChanges = true;
        }
      });
      return hasChanges ? next : prev;
    });
  }, [orders]);

  useEffect(() => {
    if (!authUser) return;

    const feeRef = doc(db, "settings", "deliveryFee");
    const unsubscribe = onSnapshot(
      feeRef,
      (snapshot) => {
        const amountValue = snapshot.exists() ? snapshot.data()?.amount : 0;
        const parsedAmount =
          typeof amountValue === "number"
            ? amountValue
            : Number(amountValue) || 0;
        setDeliveryFeeValue(parsedAmount);
        setDeliveryFeeInput(parsedAmount.toString());
        setLoadingDeliveryFee(false);
      },
      (error) => {
        console.error("Error fetching delivery fee:", error);
        toast.error("Unable to read delivery fee settings.");
        setLoadingDeliveryFee(false);
      }
    );

    return () => unsubscribe();
  }, [authUser]);

  useEffect(() => {
    if (!authUser) return;

    setLoadingOrders(true);
    const ordersRef = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      ordersRef,
      (snapshot) => {
        const orderList: AdminOrder[] = [];
        snapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data();
          const createdAtValue =
            data.createdAt?.toDate?.() ??
            new Date(data.createdAt ?? Date.now());

          const customerInfo = {
            fullName: data.customerInfo?.fullName || "Unknown customer",
            phoneNumber: data.customerInfo?.phoneNumber || "",
            city: data.customerInfo?.city || "",
            state: data.customerInfo?.state || "",
            country: data.customerInfo?.country || "",
            houseAddress: data.customerInfo?.houseAddress || "",
            majorLandmark: data.customerInfo?.majorLandmark || "",
            socialHandle: data.customerInfo?.socialHandle,
            alternativeAddress: data.customerInfo?.alternativeAddress,
            zipCode: data.customerInfo?.zipCode,
          };

          const productsData = Array.isArray(data.products)
            ? data.products.map((product: any) => ({
                id: product.id,
                name: product.name,
                category: product.category,
                price: Number(product.price) || 0,
                quantity: product.quantity,
              }))
            : [];

          const deliveryStatusCandidate =
            data.deliveryStatus &&
            deliveryStatusOptions.includes(data.deliveryStatus)
              ? data.deliveryStatus
              : "pending";

          orderList.push({
            id: docSnapshot.id,
            products: productsData,
            cartSubtotal: Number(data.cartSubtotal) || 0,
            deliveryFee: Number(data.deliveryFee) || 0,
            totalAmount: Number(data.totalAmount) || 0,
            paymentMethod: data.paymentMethod || "unknown",
            paymentStatus: data.paymentStatus || "pending",
            deliveryStatus: deliveryStatusCandidate,
            customerInfo,
            createdAtLabel: new Intl.DateTimeFormat("en-NG", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(createdAtValue),
          });
        });
        setOrders(orderList);
        setLoadingOrders(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        toast.error("Cannot load orders right now.");
        setLoadingOrders(false);
      }
    );

    return () => unsubscribe();
  }, [authUser]);

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImageToImgBB(file);
      updateField("image", imageUrl);
      setMessage("✅ Image uploaded successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to upload image. Please try again.";
      setMessage(`❌ ${errorMessage}`);
    }
  };

  const handleRemoveImage = () => {
    updateField("image", "");
    clearImagePreview();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!authUser) return;

    if (!form.image) {
      setMessage("❌ Please upload an image before submitting");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const productData = {
        ...form,
        price: parseFloat(form.price.replace(/[^0-9.]/g, "")) || 0,
        originalPrice:
          parseFloat(form.originalPrice.replace(/[^0-9.]/g, "")) || 0,
        features: form.features
          .split(",")
          .map((feature: string) => feature.trim())
          .filter(Boolean),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: authUser?.uid ?? "admin",
      };

      if (editingProduct) {
        // Update existing product
        const productRef = doc(db, "products", editingProduct.id);
        await updateDoc(productRef, productData);
        setMessage("✅ Product updated successfully!");
      } else {
        // Create new product
        await addDoc(collection(db, "products"), productData);
        setMessage("✅ Product published successfully!");
      }

      resetForm();
      clearImagePreview();
      setEditingProduct(null);
      setActiveTab("list");
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage(
        "❌ Unable to save product. Check Firebase rules and network."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);

    // Populate form with product data
    updateField("name", product.name);
    updateField("slug", product.slug);
    updateField("category", product.category);
    updateField("customCategory", product.customCategory);
    updateField("price", product.price);
    updateField("originalPrice", product.originalPrice);
    updateField("inStock", product.inStock);
    updateField("description", product.description);
    updateField("features", product.features);
    updateField("image", product.image);
    updateField("charityProgram", product.charityProgram);
    updateField("notes", product.notes);

    setImagePreview(product.image || null);
    setActiveTab("form");
    setMessage("");
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteDoc(doc(db, "products", productId));
      setMessage("✅ Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("❌ Failed to delete product");
    }
  };

  const handleCreateNew = () => {
    resetForm();
    clearImagePreview();
    setEditingProduct(null);
    setActiveTab("form");
    setMessage("");
  };

  return {
    // Data
    products,
    orders,
    form,
    // Loading states
    loadingProducts,
    loadingOrders,
    loadingDeliveryFee,
    formLoading,
    uploadingImage,
    // State values
    deliveryFeeValue,
    deliveryFeeInput,
    orderDeliveryFees,
    savingOrderFeeIds,
    updatingStatusIds,
    orderStatusSelections,
    imagePreview,
    activeTab,
    editingProduct,
    message,
    // Functions
    handleSaveDeliveryFee,
    handleDeliveryFeeInputChange,
    handleConfirmOrderDeliveryFee,
    handleOrderStatusChange,
    setDeliveryFeeInput,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    updateField,
    handleEdit,
    handleDelete,
    handleCreateNew,
    setActiveTab,
    resetForm,
    clearImagePreview,
    setImagePreview,
    setMessage,
    isSavingFee,
  };
}
