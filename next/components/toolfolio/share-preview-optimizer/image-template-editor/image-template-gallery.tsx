import React from "react";
import { IMAGE_TEMPLATES } from "./image-templates";
import { ColorVariant } from "@/components/variants";

interface TemplateSelectionGalleryProps {
  variant: ColorVariant;
  handleTemplateSelect: (templateTitle: string) => void;
  url: string;
  title: string;
  description: string;
  image: string;
}

export function TemplateSelectionGallery({
  variant,
  handleTemplateSelect,
  url,
  title,
  description,
  image,
}: TemplateSelectionGalleryProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {IMAGE_TEMPLATES.map((template, i) => (
        <button
          key={i}
          className="flex max-w-full flex-col overflow-hidden rounded-md border bg-white p-1 transition-colors duration-200 hover:bg-gray-200"
          onClick={() => handleTemplateSelect(template.title)}
          tabIndex={0}
        >
          <div className="relative h-36 w-full">
            <template.preview
              size="sm"
              variant={variant}
              url={url}
              title={title}
              description={description}
              image={image}
            />
          </div>
          <div className="flex items-center space-x-4 p-1">
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="truncate text-sm font-medium">{template.title}</p>
              <p className="text-base-500 text-xs text-gray-400">
                {template.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
