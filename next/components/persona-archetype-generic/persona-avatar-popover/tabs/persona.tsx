"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { DownloadButton } from "@/components/download/download-btn";
import { avatarVariants, gradientVariants } from "@/components/variants";
import { PersonaAvatarPopoverProps } from "../persona-popover";
import TemplatePreviewSelect from "../templates/template-preview-select";

export function PersonaTab({ variant, archetype }: PersonaAvatarPopoverProps) {
  const { archetype_name, persona_components, insights } = archetype;
  const avatarFallbackName = archetype_name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");

  const [isDownloading, setIsDownloading] = useState(false);
  const [showTemplateSelectModal, setShowTemplateSelectModal] = useState(false);

  const handleResolvedDownload = () => {
    setShowTemplateSelectModal(false);
    setIsDownloading(false);
  };

  return (
    <div>
      <div className="flex gap-2 border-b">
        <Avatar
          className={avatarVariants({
            variant,
            size: "xl",
            interactive: false,
          })}
        >
          <AvatarImage
            src={archetype.pictureURL}
            alt={[archetype_name.toLocaleLowerCase(), "persona avatar"].join(
              " ",
            )}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="my-6 flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-muted-foreground">
              Archetype
            </span>
            <span className="font-bold">{archetype_name}</span>
          </div>

          <DownloadButton
            variant={variant}
            onClick={() => setShowTemplateSelectModal(true)}
            onCancel={handleResolvedDownload}
            loading={isDownloading}
            selectingTemplate={showTemplateSelectModal}
          />
        </div>
      </div>
      {showTemplateSelectModal ? (
        <TemplatePreviewSelect
          archetype={archetype}
          variant={variant}
          isLoading={isDownloading}
          onLoadingChange={setIsDownloading}
          onSuccess={handleResolvedDownload}
          onError={handleResolvedDownload}
        />
      ) : (
        <div
          className={gradientVariants({
            variant,
            className: "m-2 flex gap-2 overflow-auto rounded-lg p-4",
          })}
        >
          <ul>
            {Object.entries(persona_components).map(([key, value]) => (
              <li key={key} className="mb-4 flex flex-col gap-1">
                <span className="text-sm font-semibold text-muted-foreground">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="text-sm font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
