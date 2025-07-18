import { ColorVariant } from "@/components/variants";
import { OGPreviewMetadata } from "../../social-share-tool";
import { INSTANT_PERSONAS_BASIC_IMAGE_TEMPLATE_CONFIG } from "./instant-personas-basic";
import { GRADIENT_GRID_IMAGE_TEMPLATE_CONFIG } from "./gradient-grid";
import { BLACK_GRADIENT_BOTTOM_IMAGE_TEMPLATE_CONFIG } from "./black-gradient-bottom";
import { IMAGE_WINDOW_IMAGE_TEMPLATE_CONFIG } from "./image-window";
import { TWO_COLUMN_IMAGE_TEMPLATE_CONFIG } from "./two-column";
import { COLOR_GRADIENT_LEFT_IMAGE_TEMPLATE_CONFIG } from "./color-gradient-left";
import { FUN_SHAPES_IMAGE_TEMPLATE_CONFIG } from "./fun-shapes";
import { GIT_SIMPLE_IMAGE_TEMPLATE_CONFIG } from "./git-simple";
import { TITLE_SQUIGGLE_IMAGE_TEMPLATE_CONFIG } from "./title-squiggle";

export const IMAGE_TEMPLATES = [
  INSTANT_PERSONAS_BASIC_IMAGE_TEMPLATE_CONFIG,
  GRADIENT_GRID_IMAGE_TEMPLATE_CONFIG,
  BLACK_GRADIENT_BOTTOM_IMAGE_TEMPLATE_CONFIG,
  IMAGE_WINDOW_IMAGE_TEMPLATE_CONFIG,
  TWO_COLUMN_IMAGE_TEMPLATE_CONFIG,
  COLOR_GRADIENT_LEFT_IMAGE_TEMPLATE_CONFIG,
  FUN_SHAPES_IMAGE_TEMPLATE_CONFIG,
  GIT_SIMPLE_IMAGE_TEMPLATE_CONFIG,
  TITLE_SQUIGGLE_IMAGE_TEMPLATE_CONFIG,
] as const;

export type OpenGraphImageTemplateProps = OGPreviewMetadata & {
  variant?: ColorVariant;
};

export type OpenGraphImageTemplatePreviewProps = OpenGraphImageTemplateProps & {
  size: "sm" | "md";
};
