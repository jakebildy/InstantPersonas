"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorVariant, gradientLightVariants } from "@/components/variants";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMAGE_TEMPLATES } from "@/components/toolfolio/share-preview-optimizer/image-template-editor/image-templates";
import TemplatePreviewSelect from "@/components/download/template-preview-select";
import { b64toBlob } from "@/components/toolfolio/share-preview-optimizer/utils";
import { OGPreviewMetadata } from "../social-share-tool";
import { TemplateEditView } from "./image-template-edit-view";
import { TemplateSelectionGallery } from "./image-template-gallery";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, LoaderIcon } from "lucide-react";

interface ImageTemplateEditorDialogProps
  extends OGPreviewMetadata,
    OGPreviewMetadataSetStates {
  trigger: JSX.Element;
}

type OGPreviewMetadataSetStates = {
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setUrl: (url: string) => void;
  setImage: (image: string) => void;
};

export function ImageTemplateEditorDialog({
  trigger,
  url,
  title,
  description,
  image,
  setImage,
  setTitle,
  setDescription,
  setUrl,
}: ImageTemplateEditorDialogProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);
  const [variant, setVariant] = useState<ColorVariant>("blue");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleResolvedDownload = () => {
    setShowTemplateSelectModal(false);
    setIsDownloading(false);
  };

  const handleTemplateSelect = (templateTitle: string) => {
    setSelectedTemplate(templateTitle);
  };

  /**
   * Helper function to render components based on template selection and downloading states.
   */
  const renderTemplateState = ({
    templateSelectedState,
    noSelectionState,
    downloadingState,
  }: {
    templateSelectedState: React.ReactNode;
    noSelectionState: React.ReactNode;
    downloadingState: React.ReactNode;
  }): React.ReactNode => {
    if (selectedTemplate) {
      return showTemplateSelectModal ? downloadingState : templateSelectedState;
    }
    return noSelectionState;
  };

  return (
    <Dialog>
      <DialogTrigger onClick={() => setSelectedTemplate("")} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent
        className={gradientLightVariants({
          variant,
          className: "flex h-full max-h-[90vh] w-full max-w-4xl flex-col p-4",
        })}
      >
        <DialogHeader>
          <DialogTitle>
            {renderTemplateState({
              noSelectionState: <span>Choose Template</span>,
              templateSelectedState: (
                <Button
                  variant={"outline"}
                  onClick={() => {
                    setSelectedTemplate("");
                    setShowTemplateSelectModal(false);
                  }}
                  className="flex items-center gap-2 text-lg font-semibold leading-none tracking-tight"
                >
                  <ArrowLeftIcon /> Choose Template
                </Button>
              ),
              downloadingState: (
                <span className="flex items-center gap-2">
                  <LoaderIcon className="animate-spin" />
                  Saving Template
                </span>
              ),
            })}
          </DialogTitle>
          <DialogDescription>
            {renderTemplateState({
              noSelectionState: (
                <span>
                  Select a template to use as the image for your social preview.
                </span>
              ),
              templateSelectedState: (
                <span>
                  Click to navigate back to the template selection gallery.
                </span>
              ),
              downloadingState: (
                <span>
                  Saving your template. Please wait while we generate your
                  image.
                </span>
              ),
            })}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-fit flex-1 overflow-hidden rounded-md bg-white shadow-lg">
          <ScrollArea className="h-full flex-1">
            {renderTemplateState({
              noSelectionState: (
                <TemplateSelectionGallery
                  variant={variant}
                  handleTemplateSelect={handleTemplateSelect}
                  url={url}
                  title={title}
                  description={description}
                  image={image}
                />
              ),
              templateSelectedState: (
                <TemplateEditView
                  variant={variant}
                  initialUrl={url}
                  initialTitle={title}
                  initialDescription={description}
                  initialImage={image}
                  selectedTemplate={selectedTemplate}
                  setShowTemplateSelectModal={setShowTemplateSelectModal}
                  setVariant={setVariant}
                />
              ),
              downloadingState: (
                <TemplatePreviewSelect
                  className="pt-20 text-center"
                  header="Choose a template to download your Topical Authority Map."
                  subHeader="CSV and PNG formats available."
                  variant="purple"
                  isLoading={isDownloading}
                  onLoadingChange={setIsDownloading}
                  onSuccess={(data) => {
                    handleResolvedDownload();
                    const newURL = URL.createObjectURL(
                      b64toBlob({
                        b64Data: data.split("base64,")[1],
                        contentType: "image/png",
                      }),
                    );
                    console.log("setImage", newURL);
                    setImage(newURL);
                  }}
                  onError={handleResolvedDownload}
                  downloadTemplateOptions={IMAGE_TEMPLATES.filter(
                    (template) => template.title === selectedTemplate,
                  ).map((template, i) => ({
                    type: "component",
                    img: {
                      src: template.image || "/forest.gif",
                      width: 800,
                      height: 285,
                    },
                    label: "1200 x 600",
                    width: 1200,
                    height: 600,
                    component: (
                      <template.imageTemplate
                        variant={variant}
                        key={i}
                        url={url}
                        title={title}
                        description={description}
                        image={image}
                      />
                    ),
                  }))}
                />
              ),
            })}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
