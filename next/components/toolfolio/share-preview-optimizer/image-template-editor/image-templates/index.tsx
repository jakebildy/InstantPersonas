import { ColorVariant } from "@/components/variants";
import { OGPreviewMetadata } from "../../social-share-tool";
import { INSTANT_PERSONAS_OG_BLOG_IMAGE_TEMPLATE_CONFIG } from "./instant-personas-blog";

export const IMAGE_TEMPLATES = [
  INSTANT_PERSONAS_OG_BLOG_IMAGE_TEMPLATE_CONFIG,
] as const;

export type OpenGraphImageTemplateProps = OGPreviewMetadata & {
  variant?: ColorVariant;
};

export type OpenGraphImageTemplatePreviewProps = OpenGraphImageTemplateProps & {
  size: "sm" | "md";
};
