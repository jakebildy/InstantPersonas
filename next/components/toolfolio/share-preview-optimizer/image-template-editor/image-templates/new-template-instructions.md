# New Template Instructions

## Introduction

This document provides instructions for developers to add a new template to the Instant Personas OG Blog Image Template system. Following these guidelines ensures consistency and maintainability across the project.

## System Intent

The OG Image Template system generates visually appealing Open Graph images for blog posts. These images are customizable based on different themes (variants) and adaptable to various screen sizes.

## Abstract Architecture

### Existing Template Structure

The ImageTemplate system comprises the following key components:

1. **Template Component**: Defines the main structure and styling for the Open Graph image. _1200x600px_
2. **Preview Component**: Provides a smaller, preview version of the template for quick visualization. (_sm & md sizes_)
3. **Config Object**: Holds the configuration details for the template, including the title, description, image, and references to the template and preview components.

## Adding a New Template

To add a new template, follow these steps:

### Step 1: Define the Template Component

Create a new functional component that adheres to the structure of the existing template. This component should:

- Accept properties `variant`, `url`, `title`, `description`, and `image` from `OpenGraphImageTemplateProps`.
- Utilize the `class-variance-authority` library for conditional styling based on the `variant` prop.
- Have absolute dimensions of `1200x600px`
- Gracefully handle case where `props` are missing or invalid.
- Image should have aspect ratio of `2:1` and be `object-cover` with `fill` prop set to `true`.

#### Template Example

```tsx
import { OpenGraphImageTemplateProps } from ".";
import Image from "next/image";

export function NewTemplate({
  variant = "blue",
  url,
  title,
  description,
  image,
}: OpenGraphImageTemplateProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="relative grid h-[600px] w-[1200px] place-items-center rounded-lg border bg-white p-4 shadow-md">
      <div
        className={cx(
          gradientVariants({
            variant,
            className:
              "relative h-full w-full overflow-hidden rounded-lg border",
          }),
          shadowVariants({
            variant,
          }),
        )}
      >
        <Image
          src={image}
          alt={title}
          fill={true}
          className="object-cover opacity-30 blur-xl"
          priority
        />
        <div
          className={textColorVariants({
            variant,
            className:
              "absolute left-1/2 top-1/2 grid w-full -translate-x-1/2 -translate-y-1/2 place-items-center gap-4 p-4 text-center",
          })}
        >
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-2xl">{description}</p>
          <span
            className={textColorVariants({
              variant,
              className:
                "my-4 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-6 py-1.5 text-2xl font-medium text-foreground shadow-lg",
            })}
          >
            {domain}
          </span>
        </div>
      </div>
    </div>
  );
}
```

### Step 2: Define the Preview Component

Create a smaller, preview version of the new template. This component should mirror the main template but adapted for a smaller display.

- `size` prop should be used to determine the size of the preview (`sm` or `md`).
- `sm` size used in `image-template-gallery` component.
- `md` size used in `image-template-edit-view` component.

#### Template Preview Example

```tsx
import { OpenGraphImageTemplatePreviewProps } from ".";
import Image from "next/image";

export function NewTemplatePreview({
  variant = "blue",
  url,
  title,
  description,
  image,
  size,
}: OpenGraphImageTemplatePreviewProps) {
  const domain = GetDomainFromString(url);

  return (
    <div className="relative grid aspect-[2/1] h-full w-full place-items-center rounded-md border bg-white p-1 shadow-sm">
      <div
        className={cx(
          gradientVariants({
            variant,
            className:
              "relative h-full w-full overflow-hidden rounded-md border",
          }),
          shadowVariants({
            variant,
            className: "shadow-sm",
          }),
        )}
      >
        <Image
          src={image}
          alt={title}
          fill={true}
          className="object-cover opacity-50 blur-md"
          priority
        />
        <div
          className={textColorVariants({
            variant,
            className:
              "absolute left-1/2 top-1/2 grid w-full -translate-x-1/2 -translate-y-1/2 place-items-center gap-1 p-2 text-center",
          })}
        >
          <h1
            className={
              size === "sm" ? "text-xs font-semibold" : "text-lg font-bold"
            }
          >
            {title}
          </h1>
          <p className={size === "sm" ? "text-[6px]" : "text-sm"}>
            {description}
          </p>
          <span
            className={textColorVariants({
              variant,
              className: `my-2 inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white font-medium text-foreground shadow-md ${
                size === "sm" ? "px-4 py-1 text-[6px]" : "px-6 py-1.5 text-sm"
              }`,
            })}
          >
            {domain}
          </span>
        </div>
      </div>
    </div>
  );
}
```

### Step 3: Update the Configuration

Add a new entry in the configuration object to include the new template and its preview component.

Example:

```tsx
import * as NewTemplateImage from "./new-template-preview.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export const NEW_TEMPLATE_CONFIG = {
  title: "New Template",
  description: "OG Image Template for the New Template",
  image: NewTemplateImage as StaticImport,
  imageTemplate: NewTemplate,
  preview: NewTemplatePreview,
} as const;
```

### Step 4: Add the Template `IMAGE_TEMPLATES`

Add the new template configuration to the `IMAGE_TEMPLATES` array in the `index.ts` file.

### Step 5: Ensure Compliance with Naming Conventions

Ensure all components and files follow the naming conventions specified in the FCS Naming Conventions document:

- Use kebab-case for filenames and folder names.
- Use camelCase for function names, hooks, and utility functions.
- Use PascalCase for component names and TypeScript interfaces or types.
- Use SCREAMING_SNAKE_CASE for constant variables.

### Conclusion

Following these steps will ensure the new template is integrated smoothly into the existing system while adhering to project conventions and maintaining high code quality. Regularly update and maintain the documentation to reflect any changes in the template or related components.
