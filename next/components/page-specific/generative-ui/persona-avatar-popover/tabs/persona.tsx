"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PersonaAvatarPopoverProps } from "..";
import { useState } from "react";
import { DownloadButton } from "@/components/download/download-btn";
import TemplatePreviewSelect from "../templates/template-preview-select";
import { avatarVariants, gradientVariants } from "@/components/variants";

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
              " "
            )}
          />
          <AvatarFallback>{avatarFallbackName}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col my-6 gap-2">
          <div className="flex flex-col">
            <span className="text-muted-foreground font-semibold text-sm">
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
            className: "flex gap-2 p-4 overflow-auto rounded-lg m-2",
          })}
        >
          <ul>
            {Object.entries(persona_components).map(([key, value]) => (
              <li key={key} className="flex flex-col gap-1 mb-4">
                <span className="text-muted-foreground font-semibold text-sm">
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
