"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Shield, Upload } from "lucide-react";

const whitePanel = "bg-white/95 border border-amber-100 shadow-xl rounded-2xl p-6 backdrop-blur-sm";

export default function SetupInstructions() {
  return (
    <Card className={`${whitePanel} border-amber-200`}>
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-semibold text-amber-900">Setup Instructions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <EnvironmentSetup />
          <ImageUploadDetails />
        </div>
      </CardContent>
    </Card>
  );
}

function EnvironmentSetup() {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-amber-800 flex items-center gap-2">
        <Shield className="h-4 w-4" />
        Environment Setup
      </h3>
      <ul className="space-y-2 text-sm text-amber-700">
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">1.</span>
          <span>
            Get your ImgBB API key from{" "}
            <a
              href="https://api.imgbb.com/"
              className="text-amber-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              api.imgbb.com
            </a>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">2.</span>
          <span>
            Add to{" "}
            <code className="bg-amber-100 px-1 rounded">.env.local</code>:
          </span>
        </li>
        <li className="pl-6">
          <code className="text-xs bg-amber-100 p-1 rounded block">
            NEXT_PUBLIC_IMGBB_API_KEY=your_api_key_here
          </code>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">3.</span>
          <span>Restart your development server</span>
        </li>
      </ul>
    </div>
  );
}

function ImageUploadDetails() {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-amber-800 flex items-center gap-2">
        <Upload className="h-4 w-4" />
        Image Upload Details
      </h3>
      <ul className="space-y-2 text-sm text-amber-700">
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">•</span>
          <span>
            Images auto-delete from ImgBB after 10 minutes (600 seconds)
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">•</span>
          <span>Max file size: 32MB for free accounts</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">•</span>
          <span>Supported formats: JPG, PNG, GIF, WEBP, BMP</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-amber-500 mt-0.5">•</span>
          <span>The URL is automatically saved to Firestore</span>
        </li>
      </ul>
    </div>
  );
}