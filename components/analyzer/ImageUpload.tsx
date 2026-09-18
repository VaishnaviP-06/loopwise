"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  imagePreviewUrl: string | null;
  onImageSelected: (file: File) => void;
  onImageRemoved: () => void;
}

export default function ImageUpload({
  imagePreviewUrl,
  onImageSelected,
  onImageRemoved,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (file && file.type.startsWith("image/")) {
        onImageSelected(file);
      }
    },
    [onImageSelected]
  );

  return (
    <div>
      <label className="block text-sm font-medium text-loop-text">
        Upload a photo
      </label>
      <p className="mt-1 text-sm text-loop-muted">
        Show the item as clearly as possible.
      </p>

      {imagePreviewUrl ? (
        <div className="mt-4 overflow-hidden rounded-2xl border border-loop-border bg-loop-card">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={imagePreviewUrl}
              alt="Uploaded item preview"
              fill
              className="object-contain bg-loop-light"
            />
          </div>

          <div className="flex items-center justify-between border-t border-loop-border px-4 py-3">
            <span className="text-xs text-loop-muted">Photo added</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="text-xs font-medium text-loop-dark underline-offset-2 hover:underline"
              >
                Change
              </button>
              <button
                type="button"
                onClick={onImageRemoved}
                className="text-xs font-medium text-loop-muted underline-offset-2 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFiles(event.dataTransfer.files);
          }}
          aria-label="Upload a photo of your item"
          className={`mt-4 flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-colors duration-200 ${
            isDragging
              ? "border-loop-primary bg-loop-light"
              : "border-loop-border bg-loop-card hover:border-loop-secondary"
          }`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-loop-light text-loop-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 16V4m0 0L7 9m5-5 5 5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <span className="text-sm font-medium text-loop-text">
            Drag and drop a photo, or click to browse
          </span>
          <span className="text-xs text-loop-muted">
            PNG or JPG, one photo at a time
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </div>
  );
}
