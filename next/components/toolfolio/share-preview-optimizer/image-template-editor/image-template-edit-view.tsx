"use client";
import {
  badgeVariants,
  ColorVariant,
  ColorVariantMap,
} from "@/components/variants";
import { ArrowDown, ArrowUp, EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadImage } from "@/components/toolfolio/share-preview-optimizer/upload-image-area";
import { Separator } from "@/components/ui/fcs/fcs-separator";
import { Button } from "@/components/ui/button";
import { IMAGE_TEMPLATES } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates";
import { DownloadIcon } from "@radix-ui/react-icons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TemplateEditViewProps {
  variant: ColorVariant;
  initialUrl: string;
  initialTitle: string;
  initialDescription: string;
  initialImage: string;
  setShowTemplateSelectModal: (value: boolean) => void;
  setVariant: (value: ColorVariant) => void;
  selectedTemplate: string;
}

export function TemplateEditView({
  variant,
  initialUrl,
  initialTitle,
  initialDescription,
  initialImage,
  setShowTemplateSelectModal,
  setVariant,
  selectedTemplate,
}: TemplateEditViewProps) {
  const [editTemplateSectionIsOpen, setEditTemplateSectionIsOpen] =
    useState<boolean>(false);

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [url, setUrl] = useState(initialUrl);
  const [image, setImage] = useState(initialImage);
  return (
    <div className="flex-1 p-2">
      {IMAGE_TEMPLATES.map((template, i) => {
        if (template.title === selectedTemplate) {
          return (
            <template.preview
              variant={variant}
              size="md"
              key={i}
              {...{
                url,
                title,
                description,
                image,
                setImage,
              }}
            />
          );
        }
      })}
      <form className="flex flex-col p-4 gap-2">
        <Collapsible
          open={editTemplateSectionIsOpen}
          onOpenChange={setEditTemplateSectionIsOpen}
        >
          <CollapsibleTrigger className="group">
            <div className="text-left flex gap-2 justify-between transition-colors duration-200">
              <div className="group-hover:animate-pulse">
                <h2 className="text-lg font-bold">Edit Template</h2>
                <p className="text-sm">
                  Customize how your content appears on search engines and
                  social platforms. Modify the title, description, and image to
                  optimize visibility and engagement.{" "}
                  <span className="text-blue-500 font-bold border-b  border-transparent group-hover:border-blue-500 inline-flex gap-2 items-center">
                    {editTemplateSectionIsOpen
                      ? "Click here to hide"
                      : "Click here to show"}
                    {!editTemplateSectionIsOpen ? (
                      <ArrowDown className="group-hover:animate-pulse size-3" />
                    ) : (
                      <ArrowUp className="group-hover:animate-pulse size-3" />
                    )}
                  </span>
                </p>
              </div>
              {!editTemplateSectionIsOpen ? (
                <EyeOffIcon className="group-hover:animate-pulse" />
              ) : (
                <EyeIcon className="group-hover:animate-pulse" />
              )}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="Title">Title</Label>
              <Input
                id="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="text-xs font-medium">
                Recommended: <span className="font-light">60 characters</span>
              </span>
            </div>
            <div>
              <Label htmlFor="Description">Description</Label>
              <Input
                id="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="text-xs font-medium">
                Recommended: <span className="font-light">160 characters</span>
              </span>
            </div>
            <ChangeColorSelect
              value={variant}
              onChange={(newVariant) => setVariant(newVariant as ColorVariant)}
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="Image">Image</Label>
                <span className="text-xs font-medium">
                  Recommended:{" "}
                  <span className="font-light">1200 x 630 pixels</span>
                </span>
              </div>
              <UploadImage
                currentImageUrl={image}
                onUpload={(newImageUrl) => setImage(newImageUrl)}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        <Separator className="py-2" />
        <Button
          variant="blue"
          className="flex gap-2 flex-1 peer group"
          onClick={() => setShowTemplateSelectModal(true)}
        >
          <DownloadIcon className="group-hover:text-slate-100 text-white size-4" />{" "}
          Download & Save Template
        </Button>
      </form>
    </div>
  );
}

function ChangeColorSelect({
  value = "blue",
  onChange,
}: {
  value?: ColorVariant;
  onChange: (value: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"secondary"}>Change Color</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="top">
        <DropdownMenuLabel>Select Archetype Color</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={onChange}
          className="flex flex-col items-center"
        >
          {Object.entries(ColorVariantMap).map(([color, hex]) => (
            <DropdownMenuRadioItem
              value={color}
              key={hex}
              className="w-full flex items-center justify-between group cursor-pointer data-[state=checked]:bg-slate-200 hover:bg-slate-100"
            >
              <div
                className={badgeVariants({
                  variant: color as ColorVariant,
                  className: "group-hover:animate-pulse",
                })}
              >
                {color}
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
