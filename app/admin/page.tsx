"use client";

import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import SignInForm from "./components/SignInForm";
import AdminLayout from "./AdminLayout";
import OrdersContent from "./components/OrcderContent"; 
import OverviewContent from "./components/OverviewContent";
import PostProductContent from "./components/PostProductContent";
import SettingsContent from "./components/SettingsContent";
import ComplaintsContent from "./components/ComplaintsContent";
import { useAdminData } from "./hooks/useAdminData";

export default function AdminPage() {
  const {
    authUser,
    authInitialized,
    isLoading: authLoading,
    authError,
    handleSignIn,
    handleSignOut,
  } = useAuth();

  const {
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
    activeTab: postProductTab,
    editingProduct,
    message,
    isSavingFee,
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
    setActiveTab: setPostProductTab,
    resetForm,
    clearImagePreview,
    setImagePreview,
    setMessage,
    soundEnabled,
    handleToggleSound,
    complaints,
    loadingComplaints,
    handleToggleComplaintStatus,
  } = useAdminData(authUser);

  const [activeTab, setActiveTab] = useState("overview");

  // Show sign-in form if not authenticated
  if (authInitialized && !authUser) {
    return (
      <SignInForm
        onSignIn={handleSignIn}
        isLoading={authLoading}
        error={authError}
      />
    );
  }

  return (
    <AdminLayout
      email={authUser?.email || ""}
      onSignOut={handleSignOut}
      productsCount={products.length}
      ordersCount={orders.length}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === "overview" && (
        <OverviewContent
          products={products}
          orders={orders}
          loadingProducts={loadingProducts}
          loadingOrders={loadingOrders}
        />
      )}

      {activeTab === "orders" && (
        <OrdersContent
          orders={orders}
          loadingOrders={loadingOrders}
          onOrderStatusChange={handleOrderStatusChange}
          onOrderDeliveryFeeInputChange={handleDeliveryFeeInputChange} // <-- Fixed prop name
          onConfirmOrderDeliveryFee={handleConfirmOrderDeliveryFee}
          orderDeliveryFees={orderDeliveryFees}
          savingOrderFeeIds={savingOrderFeeIds}
          updatingStatusIds={updatingStatusIds}
          orderStatusSelections={orderStatusSelections}
          deliveryStatusOptions={["pending", "processing", "delivered"]}
          deliveryFeeValue={deliveryFeeValue}
          deliveryFeeInput={deliveryFeeInput}
          onDeliveryFeeInputChange={setDeliveryFeeInput} // <-- This is for the default fee input
          onSaveDeliveryFee={handleSaveDeliveryFee}
          isSavingFee={isSavingFee}
          loadingDeliveryFee={loadingDeliveryFee}
        />
      )}

      {activeTab === "post-product" && (
        <PostProductContent
          form={form}
          updateField={updateField as (field: string, value: string) => void}
          onSubmit={handleSubmit}
          loading={formLoading}
          imagePreview={imagePreview}
          uploadingImage={uploadingImage}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
          isAuthenticated={!!authUser}
          products={products}
          loadingProducts={loadingProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          activeTab={postProductTab}
          setActiveTab={setPostProductTab}
          editingProduct={editingProduct}
          onCreateNew={handleCreateNew}
        />
      )}

      {activeTab === "settings" && (
        <SettingsContent 
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}

      {activeTab === "complaints" && (
        <ComplaintsContent 
          complaints={complaints}
          loading={loadingComplaints}
          onToggleStatus={handleToggleComplaintStatus}
        />
      )}
    </AdminLayout>
  );
}
