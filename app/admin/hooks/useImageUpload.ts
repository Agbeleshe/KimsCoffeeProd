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

  const uploadImageToImgBB = async (file: File): Promise<string> => {
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

    // Validate file size (32MB limit for free tier)
    if (file.size > 32 * 1024 * 1024) {
      throw new Error(
        "Image size exceeds 32MB limit. Please choose a smaller file."
      );
    }

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error(
          "ImgBB API key is not configured. Add NEXT_PUBLIC_IMGBB_API_KEY to .env.local"
        );
      }

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const result: ImgBBResponse = await response.json();

      if (!result.success) {
        throw new Error("ImgBB API returned an error");
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      return result.data.url;
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
    uploadImageToImgBB,
    clearImagePreview,
    setImagePreview,
  };
};
