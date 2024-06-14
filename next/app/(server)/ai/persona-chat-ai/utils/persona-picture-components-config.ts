export const PERSONA_PICTURE_COMPONENTS_CONFIG = {
  clothing: {
    casual: "variant07",
    funky: "variant02",
    hoodie: "variant23",
    leather_jacket: "variant16",
    tie: "variant19",
    sweater_vest: "variant14",
    button_up: "variant21",
  },
  hair: {
    hat: "hat",
    short: "variant13",
    ponytail: "variant39",
    shoulder_length: "variant28",
    buzzcut: "variant60",
    long_hair_with_ribbon: "variant46",
  },
  glasses: {
    glasses: "variant08",
    sunglasses: "variant01",
    round_glasses: "variant11",
    no_glasses: "",
  },
} as const;

//? This is used as a zod default fallback in case the persona picture is not found and is un-validated by our API
export const DEFAULT_PERSONA_PICTURE =
  "https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=variant21&hair=variant13&backgroundColor=d9cbfc";

//? This is a workaround to avoid typescript error on incompatible types string -> readonly string[]
const LOCAL_PERSONA_PICTURE_COMPONENTS_CONFIG: {
  [key: string]: {
    [key: string]: string;
  };
} = PERSONA_PICTURE_COMPONENTS_CONFIG;

/**
 * Function to get the body variant based on clothing
 * @param {string} clothing - The type of clothing
 * @returns {string} - The corresponding body variant
 */
export function getBodyVariant(clothing: string) {
  return LOCAL_PERSONA_PICTURE_COMPONENTS_CONFIG.clothing[clothing] || "";
}

/**
 * Function to get the hair variant based on hair type
 * @param {string} hair - The type of hair
 * @returns {string} - The corresponding hair variant
 */
export function getHairVariant(hair: string) {
  return LOCAL_PERSONA_PICTURE_COMPONENTS_CONFIG.hair[hair] || "";
}

/**
 * Function to get the glasses variant based on glasses type
 * @param {string} glasses - The type of glasses
 * @returns {string} - The corresponding glasses variant
 */
export function getGlassesVariant(glasses: string) {
  return LOCAL_PERSONA_PICTURE_COMPONENTS_CONFIG.glasses[glasses] || "";
}
