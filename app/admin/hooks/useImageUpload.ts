"use client";

import { useState } from "react";

interface ImgBBResponse {
  data: {
    url: string;
    id: string;
    title: string;
    display_url: string;
    delete_url: string;
    size: string;
    expiration: string;
  };
  success: boolean;
  status: number;
}

export const useImageUpload = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    if (!file) throw new Error("No file provided");

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/bmp",
    ];
    if (!validTypes.includes(file.type)) {
      throw new Error(
        "Please select a valid image file (JPEG, PNG, GIF, WEBP, BMP)"
      );
    }

    // Validate file size (Cloudinary free tier limit is generous, but let's keep a sane 10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error(
        "Image size exceeds 10MB limit. Please choose a smaller file."
      );
    }

    setUploadingImage(true);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

      if (!cloudName || !uploadPreset) {
        throw new Error(
          "Cloudinary configuration is missing. Check NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local"
        );
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Upload failed with status: ${response.status}`);
      }

      const result = await response.json();

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      return result.secure_url;
    } catch (error) {
      throw error;
    } finally {
      setUploadingImage(false);
    }
  };

  const clearImagePreview = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  return {
    uploadingImage,
    imagePreview,
    uploadImageToCloudinary, // Renamed but can keep alias for backward compatibility if needed
    uploadImageToImgBB: uploadImageToCloudinary, // Alias for compatibility
    clearImagePreview,
    setImagePreview,
  };
};
