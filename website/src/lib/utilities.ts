import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pascalCaseToNormalText(input: string): string {
  // Use regular expression to split words in PascalCase
  const words = input.split(/(?=[A-Z])/);

  // Capitalize the first letter of the first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();

  // Join the words with spaces to create normal text
  return words.join(" ");
}

export function getRandomUniqueValues<T>(list: T[], maxRandom = 15): T[] {
  const uniqueList = Array.from(new Set(list));
  const randomIndexSet = new Set<number>();
  const uniqueValues: T[] = [];

  while (randomIndexSet.size < maxRandom) {
    const randomIndex = Math.floor(Math.random() * uniqueList.length);
    randomIndexSet.add(randomIndex);
  }

  randomIndexSet.forEach((index) => {
    uniqueValues.push(uniqueList[index]);
  });

  return uniqueValues;
}

export interface Step {
  delay: number;
  progress: number;
}

export function generateBezierSteps(
  timeframe = 1000,
  endValue = 1,
  controlPoints: number[] = [0.95, 0.05, 0.795, 0.035]
): Step[] {
  const numSteps = Math.ceil(timeframe / 100); // Assuming 100ms intervals for steps
  const steps = [];

  for (let i = 0; i <= numSteps; i++) {
    const t = i / numSteps;
    const x = cubicBezier(
      controlPoints[0],
      controlPoints[1],
      controlPoints[2],
      controlPoints[3],
      t
    );
    const progress = x * endValue;

    steps.push({ delay: i * 100, progress });
  }

  return steps;
}

// Cubic Bezier function
function cubicBezier(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const p = uuu * p0;
  const q = 3 * uu * t * p1;
  const r = 3 * u * tt * p2;
  const s = tt * t * p3;
  return p + q + r + s;
}
