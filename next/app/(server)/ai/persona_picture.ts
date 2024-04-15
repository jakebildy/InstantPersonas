"use server";

import { ColorVariantMap } from "@/components/generative-ui/persona-avatar-popover";

export async function getRandomHeadshot(
  hair: string,
  glasses: string,
  clothing: string
) {
  let body = "";
  switch (clothing) {
    case "casual":
      body = "variant07";
      break;
    case "funky":
      body = "variant02";
      break;
    case "hoodie":
      body = "variant23";
      break;
    case "leather_jacket":
      body = "variant16";
      break;
    case "tie":
      body = "variant19";
      break;
    case "sweater_vest":
      body = "variant14";
      break;
    case "button_up":
      body = "variant21";
      break;
  }

  let hairType = "";
  switch (hair) {
    case "hat":
      hairType = "hat";
      break;
    case "short":
      hairType = "variant13";
      break;
    case "ponytail":
      hairType = "variant39";
      break;
    case "shoulder_length":
      hairType = "variant28";
      break;
    case "buzzcut":
      hairType = "variant60";
      break;
    case "long_hair_with_ribbon":
      hairType = "variant46";
      break;
  }

  // randomly pick a background color between these options
  const backgroundColorOptions = Object.values(ColorVariantMap).map((color) =>
    color.slice(1)
  );

  const randomIndex = Math.floor(Math.random() * backgroundColorOptions.length);
  const randomColor = backgroundColorOptions[randomIndex];

  if (glasses === "glasses") {
    return `https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant08&body=${body}&hair=${hairType}&backgroundColor=${randomColor}`;
  } else if (glasses === "sunglasses") {
    return `https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant01&body=${body}&hair=${hairType}&backgroundColor=${randomColor}`;
  } else if (glasses === "round_glasses") {
    return `https://api.dicebear.com/8.x/notionists/svg?glassesProbability=100&glasses=variant11&body=${body}&hair=${hairType}&backgroundColor=${randomColor}`;
  } else {
    return `https://api.dicebear.com/8.x/notionists/svg?body=${body}&hair=${hairType}&backgroundColor=${randomColor}`;
  }
}
