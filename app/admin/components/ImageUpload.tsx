"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon, X } from "lucide-react";

interface ImageUploadProps {
  imageUrl: string;
  imagePreview: string | null;
  uploadingImage: boolean;
  onImageUpload: (file: File) => Promise<void>;
  onRemoveImage: () => void;
  error?: string;
}

export default function ImageUpload({
  imageUrl,
  imagePreview,
  uploadingImage,
  onImageUpload,
  onRemoveImage,
  error,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await onImageUpload(file);
  };

  const handleClick = () => {
    if (!uploadingImage) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Label className="text-amber-800 font-medium">Product Image</Label>

      {imagePreview || imageUrl ? (
        <div className="relative mt-2">
          <div className="border-2 border-dashed border-amber-200 rounded-lg p-4 bg-amber-50">
            <div className="flex flex-col items-center justify-center">
              <div className="relative mb-4">
                <img
                  src={imagePreview || imageUrl}
                  alt="Preview"
                  className="max-h-48 rounded-lg object-contain"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={onRemoveImage}
                  disabled={uploadingImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-amber-700 text-center break-all">
                {imageUrl}
              </p>
              <p className="text-xs text-amber-600 mt-2">
                Image uploaded successfully!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-amber-300 rounded-lg p-8 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer mt-2"
          onClick={handleClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={uploadingImage}
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            {uploadingImage ? (
              <>
                <div className="h-12 w-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-amber-700 font-medium">Uploading image...</p>
              </>
            ) : (
              <>
                <div className="p-3 bg-amber-100 rounded-full">
                  <ImageIcon className="h-8 w-8 text-amber-600" />
                </div>
                <div className="text-center">
                  <p className="text-amber-800 font-medium">
                    Click to upload image
                  </p>
                  <p className="text-sm text-amber-600 mt-1">
                    Supports JPG, PNG, GIF, WEBP, BMP
                  </p>
                  <p className="text-xs text-amber-500 mt-1">Max size: 32MB</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="border-amber-300 text-amber-700"
                  onClick={handleClick}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}

      <UploadTips />
    </div>
  );
}

function UploadTips() {
  return (
    <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
      <p className="text-xs text-amber-700">
        💡 <strong>Upload tip:</strong> Images are uploaded to ImgBB and
        automatically stored in Firestore. No need to copy URLs manually! The
        image will be automatically deleted from ImgBB after 10 minutes unless
        you upgrade your account.
      </p>
    </div>
  );
}
