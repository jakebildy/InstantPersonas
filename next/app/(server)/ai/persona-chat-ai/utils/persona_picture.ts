"use server";

import { ColorVariantMap } from "@/components/variants";
import {
  getBodyVariant,
  getHairVariant,
  getGlassesVariant,
} from "./persona-picture-components-config";

/**
 * Function to get a random background color
 * @returns {string} - A random background color from the ColorVariantMap
 */
function getRandomBackgroundColor() {
  const backgroundColorOptions = Object.values(ColorVariantMap).map((color) =>
    color.slice(1)
  );
  const randomIndex = Math.floor(Math.random() * backgroundColorOptions.length);
  return backgroundColorOptions[randomIndex];
}

/**
 * Function to generate the URL for the random headshot
 * @param {string} hair - The hair type
 * @param {string} glasses - The glasses type
 * @param {string} clothing - The clothing type
 * @returns {string} - The URL of the generated headshot
 */
export async function getRandomHeadshot(
  hair: string,
  glasses: string,
  clothing: string
) {
  const body = getBodyVariant(clothing);
  const hairType = getHairVariant(hair);
  const backgroundColor = getRandomBackgroundColor();
  const glassesType = getGlassesVariant(glasses);

  const baseUrl = "https://api.dicebear.com/8.x/notionists/svg";
  let url = `${baseUrl}?body=${body}&hair=${hairType}&backgroundColor=${backgroundColor}`;

  if (glassesType) {
    url += `&glassesProbability=100&glasses=${glassesType}`;
  }

  return url;
}
