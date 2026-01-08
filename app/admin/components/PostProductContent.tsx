"use client";

import { FormEvent, useState } from "react";

import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { Product } from "../types";

interface PostProductContentProps {
  // Form props
  form: any;
  updateField: (field: string, value: string) => void;
  onSubmit: (event: FormEvent) => Promise<void>;
  loading: boolean;
  imagePreview: string | null;
  uploadingImage: boolean;
  onImageUpload: (file: File) => Promise<void>;
  onRemoveImage: () => void;
  isAuthenticated: boolean;

  // Product list props
  products: Product[];
  loadingProducts: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;

  // State management
  activeTab: string;
  setActiveTab: (tab: string) => void;
  editingProduct: Product | null;
  onCreateNew: () => void;
}

export default function PostProductContent({
  form,
  updateField,
  onSubmit,
  loading,
  imagePreview,
  uploadingImage,
  onImageUpload,
  onRemoveImage,
  isAuthenticated,
  products,
  loadingProducts,
  onEdit,
  onDelete,
  activeTab,
  setActiveTab,
  editingProduct,
  onCreateNew,
}: PostProductContentProps) {
  return (
    <div className="bg-white/95 border border-amber-100 shadow-xl rounded-2xl p-6 backdrop-blur-sm">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList className="bg-amber-50">
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-amber-100"
            >
              <Package className="h-4 w-4 mr-2" />
              Product List ({products.length})
            </TabsTrigger>
            <TabsTrigger
              value="form"
              className="data-[state=active]:bg-amber-100"
            >
              {editingProduct ? "Edit Product" : "Add Product"}
            </TabsTrigger>
          </TabsList>

          {activeTab === "list" && (
            <Button
              onClick={onCreateNew}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Product
            </Button>
          )}
        </div>

        <TabsContent value="list" className="space-y-6">
          <ProductList
            products={products}
            loading={loadingProducts}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TabsContent>

        <TabsContent value="form">
          <ProductForm
            form={form}
            updateField={updateField}
            onSubmit={onSubmit}
            loading={loading}
            imagePreview={imagePreview}
            uploadingImage={uploadingImage}
            onImageUpload={onImageUpload}
            onRemoveImage={onRemoveImage}
            isAuthenticated={isAuthenticated}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
