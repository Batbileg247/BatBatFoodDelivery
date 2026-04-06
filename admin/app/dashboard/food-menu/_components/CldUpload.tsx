"use client";

import { useState } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

const preset = "food-image";

type CldUploadProps = {
  onUpload: (url: string) => void;
};

export const CldUpload = ({ onUpload }: CldUploadProps) => {
  const [preview, setPreview] = useState("");

  const onUploadImage = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info;

    if (typeof info === "object" && typeof info.secure_url === "string") {
      setPreview(info.secure_url);
      onUpload(info.secure_url);
    }
  };

  return (
    <CldUploadWidget
      uploadPreset={preset}
      onSuccess={onUploadImage}
      options={{
        styles: {
          palette: { window: "#FFFFFF", tabIcon: "#EF4444", link: "#EF4444" },
        },
      }}
    >
      {({ open }) => (
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();

              document.body.style.pointerEvents = "";
              open();
            }}
            className="border border-dashed border-gray-300 rounded-md px-4 py-2 text-sm hover:border-red-500 hover:text-red-500 transition-colors"
          >
            Upload an Image
          </button>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="h-50 w-screen object-cover rounded-md"
            />
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};
