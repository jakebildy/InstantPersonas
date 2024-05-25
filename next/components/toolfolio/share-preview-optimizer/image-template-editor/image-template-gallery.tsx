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
          className="flex flex-col border rounded-md overflow-hidden max-w-full p-1 bg-white hover:bg-gray-200 transition-colors duration-200"
          onClick={() => handleTemplateSelect(template.title)}
          tabIndex={0}
        >
          <div className="relative w-full h-36">
            <template.preview
              size="sm"
              variant={variant}
              url={url}
              title={title}
              description={description}
              image={image}
            />
          </div>
          <div className="flex p-1 items-center space-x-4">
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{template.title}</p>
              <p className="text-xs text-base-500 text-gray-400">
                {template.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
