import { useEffect, useCallback, useRef } from "react";

// Constants
const DEFAULT_LINE_HEIGHT_MULTIPLIER = 1.2;

// Types
type StyleProperties = CSSStyleDeclaration;

export function useAutoAdjustTextArea(
  ref: React.RefObject<HTMLTextAreaElement> | undefined,
  value: string | undefined,
  maxHeight: number,
) {
  /**
   * Helper function to parse style properties
   */ const parseStyleProperty = (
    style: StyleProperties,
    property: string,
  ): number => {
    return parseFloat(style.getPropertyValue(property)) || 0;
  };

  /**
   * Helper function to calculate the adjusted height of the textarea
   */ const calculateAdjustedHeight = useCallback(
    (element: HTMLTextAreaElement): number => {
      const style = window.getComputedStyle(element);

      // Extracting necessary style properties
      const borderTopWidth = parseStyleProperty(style, "border-top-width");
      const borderBottomWidth = parseStyleProperty(
        style,
        "border-bottom-width",
      );
      const paddingTop = parseStyleProperty(style, "padding-top");
      const paddingBottom = parseStyleProperty(style, "padding-bottom");
      const fontSize = parseStyleProperty(style, "font-size");

      const lineHeightStyle = style.lineHeight;
      const effectiveLineHeight =
        lineHeightStyle === "normal"
          ? DEFAULT_LINE_HEIGHT_MULTIPLIER * fontSize
          : parseFloat(lineHeightStyle);

      // Calculating total height
      const totalHeight =
        effectiveLineHeight * element.rows +
        borderTopWidth +
        borderBottomWidth +
        paddingTop +
        paddingBottom;
      const naturalHeight =
        element.scrollHeight + borderTopWidth + borderBottomWidth;

      return Math.min(Math.max(totalHeight, naturalHeight), maxHeight);
    },
    [],
  );

  /**
   * Checks if the ref is valid, then resets and adjusts the height of the element
   */ const adjustElementHeight = useCallback(() => {
    if (!ref) return;
    if (!ref.current) return;
    const element = ref.current;
    if (element) {
      element.style.overflowY = "scroll";
      element.style.height = "0";
      element.style.height = `${calculateAdjustedHeight(element)}px`;
    }
  }, [calculateAdjustedHeight, ref]);

  // Effect hook
  useEffect(() => {
    adjustElementHeight();
  }, [adjustElementHeight, ref, value]);
}
