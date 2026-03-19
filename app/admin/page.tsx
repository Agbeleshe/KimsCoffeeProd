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
      {/* Mobile View Warning */}
      <div className="md:hidden bg-amber-50 border-b border-amber-100 px-4 py-3 mb-6 -mt-6 -mx-6 flex items-start gap-3">
        <div className="bg-amber-100 p-1.5 rounded-lg shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-700"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <p className="text-[11px] font-bold text-amber-900 leading-tight">
          NOTE: Use desktop view for better function. Admin features are optimized for larger screens.
        </p>
      </div>

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
