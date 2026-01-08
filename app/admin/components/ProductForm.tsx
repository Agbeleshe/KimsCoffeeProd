"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Package, Upload } from "lucide-react";
import ImageUpload from "./ImageUpload";

const whitePanel =
  "bg-white/95 border border-amber-100 shadow-xl rounded-2xl p-6 backdrop-blur-sm";

// Constants for dropdown options
const stockOptions = [
  { value: "available", label: "Available" },
  { value: "running-low", label: "Running low" },
  { value: "sold-out", label: "Sold out" },
];

const charityOptions = [
  { value: "", label: "Non-promotional" },
  { value: "coffee-for-peace", label: "Coffee for Peace" },
  { value: "farmers-support", label: "Farmers Support Program" },
  { value: "community-outreach", label: "Community Outreach" },
];

// Category options with "other" option
const categoryOptions = [
  { value: "arabica", label: "Arabica" },
  { value: "robusta", label: "Robusta" },
  { value: "signature-blends", label: "Signature Blends" },
  { value: "ground-coffee", label: "Ground Coffee" },
  { value: "instant-coffee", label: "Instant Coffee" },
  { value: "promotional", label: "Promotional (e.g., t-shirts, cups)" },
  { value: "other", label: "Other (custom)" },
];

interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  customCategory: string;
  price: string;
  originalPrice: string;
  inStock: string;
  description: string;
  features: string;
  image: string;
  charityProgram: string;
}

interface ProductFormProps {
  form: ProductFormData;
  updateField: (field: keyof ProductFormData, value: string) => void;
  onSubmit: (event: FormEvent) => Promise<void>;
  loading: boolean;
  imagePreview: string | null;
  uploadingImage: boolean;
  onImageUpload: (file: File) => Promise<void>;
  onRemoveImage: () => void;
  isAuthenticated: boolean;
}

export default function ProductForm({
  form,
  updateField,
  onSubmit,
  loading,
  imagePreview,
  uploadingImage,
  onImageUpload,
  onRemoveImage,
  isAuthenticated,
}: ProductFormProps) {
  // Helper function to handle category changes
  const handleCategoryChange = (value: string) => {
    updateField("category", value);
    // Clear custom category when switching away from "other"
    if (value !== "other") {
      updateField("customCategory", "");
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      await onImageUpload(file);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isAuthenticated) {
      toast.error(
        "Authentication required. Please sign in to submit products."
      );
      return;
    }

    if (!form.image) {
      toast.info("Please upload an image before submitting");
      return;
    }

    // Validate custom category if "other" is selected
    if (form.category === "other" && !form.customCategory.trim()) {
      toast.error("Please enter a custom category name");
      return;
    }

    await onSubmit(event);
  };

  // Determine the final category value to save
  const getFinalCategory = () => {
    if (form.category === "other") {
      return form.customCategory.trim();
    }
    return form.category;
  };

  return (
    <form className={`${whitePanel} grid gap-6`} onSubmit={handleSubmit}>
      <div className="border-b border-amber-200 pb-4">
        <h2 className="text-2xl font-semibold text-amber-900 flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Package className="h-5 w-5 text-amber-700" />
          </div>
          Product Details
        </h2>
        <p className="text-amber-700 mt-1">
          Fill in the details below to add or update a coffee product
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="product-name" className="text-amber-800 font-medium">
          Product Name
        </Label>
        <Input
          id="product-name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Premium Arabica Coffee Beans"
          className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* <div className="flex flex-col gap-1">
          <Label htmlFor="product-slug" className="text-amber-800 font-medium">
            Slug (URL Identifier)
          </Label>
          <Input
            id="product-slug"
            value={form.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="premium-arabica"
            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
            required
          />
          <p className="text-xs text-amber-600 mt-1">
            Used in URLs (lowercase, hyphens)
          </p>
        </div> */}

        <div className="flex flex-col gap-1">
          <SelectField
            id="category"
            label="Category"
            value={form.category}
            onChange={handleCategoryChange}
            options={categoryOptions}
            required
          />
        </div>

        {/* Custom category input field - only shown when "other" is selected */}
        {form.category === "other" && (
          <div className="flex flex-col gap-1">
            <Label
              htmlFor="custom-category"
              className="text-amber-800 font-medium mb-3"
            >
              Custom Category Name
            </Label>
            <Input
              id="custom-category"
              value={form.customCategory || ""}
              onChange={(event) =>
                updateField("customCategory", event.target.value)
              }
              placeholder="Enter your custom category (e.g., Decaf, Espresso, Tea, etc.)"
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              required
            />
            <p className="text-xs text-amber-600 mt-1">
              This will be saved as the product category
            </p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <InputField
          label="Price (₦)"
          id="price"
          value={form.price}
          onChange={(value) => updateField("price", value)}
          placeholder="₦5,500"
          required
        />
        <InputField
          label="Original Price (optional)"
          id="original-price"
          value={form.originalPrice}
          onChange={(value) => updateField("originalPrice", value)}
          placeholder="₦6,000"
        />
        <SelectField
          label="Stock Status"
          id="in-stock"
          value={form.inStock}
          onChange={(value) => updateField("inStock", value)}
          options={stockOptions}
          required
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="description" className="text-amber-800 font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Describe tasting notes, origin, roast level, and unique characteristics..."
            rows={4}
            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="features" className="text-amber-800 font-medium">
            Features (comma-separated)
          </Label>
          <Textarea
            id="features"
            value={form.features}
            onChange={(event) => updateField("features", event.target.value)}
            placeholder="Single Origin, Light Roast, Floral Notes, Ethically Sourced"
            rows={4}
            className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
            required
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ImageUpload
          imageUrl={form.image}
          imagePreview={imagePreview}
          uploadingImage={uploadingImage}
          onImageUpload={handleImageUpload}
          onRemoveImage={onRemoveImage}
        />

        <div className="flex flex-col gap-1">
          <SelectField
            id="charity"
            label="Charity Program"
            value={form.charityProgram}
            onChange={(value) => updateField("charityProgram", value)}
            options={charityOptions}
          />
          <p className="text-xs text-amber-600 mt-1">
            Select promotional campaigns where proceeds support specific causes
          </p>
        </div>
      </div>

      <SubmitButton
        loading={loading}
        disabled={!isAuthenticated || loading || !form.image}
      />
    </form>
  );
}

// Reusable Input Field Component
function InputField({
  label,
  id,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className="text-amber-800 font-medium mb-3">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
        required={required}
      />
    </div>
  );
}

// Reusable Select Field Component
function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className="text-amber-800 font-medium mb-3">
        {label}
      </Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border border-amber-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
        required={required}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Submit Button Component
function SubmitButton({
  loading,
  disabled,
}: {
  loading: boolean;
  disabled: boolean;
}) {
  return (
    <div className="border-t border-amber-200 pt-6">
      <Button
        type="submit"
        className="w-full h-14 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Publishing...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Upload className="h-5 w-5" />
            Publish Product to Store
          </span>
        )}
      </Button>
    </div>
  );
}
