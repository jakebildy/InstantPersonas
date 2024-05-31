import { AIStateValidator } from "@/app/(server)/models/ai-state-type-validators";
import { PersonaWithID } from "@/app/(server)/models/persona_with_id.model";
import { PersonaChatType } from "@/app/(server)/models/personachat.model";

export function convertPersonaChatsToPersonaWithIDs(
  personaChats: PersonaChatType[]
): PersonaWithID[] {
  if (!personaChats) {
    return [];
  }

  const personaWithIDs = personaChats
    .map((personaChat) => {
      const state = AIStateValidator.safeParse(personaChat.aiState);
      if (!state.success) {
        return null; //? Early return if parsing fails
      }
      //? Return the result of the inner map directly
      return state.data.personas.map((persona) => {
        return { persona: persona, id: personaChat._id ?? "" };
      });
    })
    .flat()
    .filter((persona): persona is PersonaWithID => persona !== null);

  return personaWithIDs;
}


// The Flesch reading-ease test approximates the U.S. grade level needed to understand a text.
export function calculateReadability(totalWords: number, totalSentences: number, totalSyllables: number) {
  const wordsPerSentence = totalWords / totalSentences;
  const syllablesPerWord = totalSyllables / totalWords;

  const readability =
    206.835 -
    1.015 * wordsPerSentence -
    84.6 * syllablesPerWord;


    // return a string of the school level:
    // 100.00–90.00	5th grade	Very easy to read. Easily understood by an average 11-year-old student.
    // 90.0–80.0	6th grade	Easy to read. Conversational English for consumers.
    // 80.0–70.0	7th grade	Fairly easy to read.
    // 70.0–60.0	8th & 9th grade	Plain English. Easily understood by 13- to 15-year-old students.
    // 60.0–50.0	10th to 12th grade	Fairly difficult to read.
    // 50.0–30.0	College	Difficult to read.
    // 30.0–10.0	College graduate	Very difficult to read. Best understood by university graduates.
    // 10.0–0.0	Professional	Extremely difficult to read. Best understood by university graduates.

  if (readability >= 90) {
    return "5th grade";
  } else if (readability >= 80) {
    return "6th grade";
  }
  else if (readability >= 70) {
    return "7th grade";
  }
  else if (readability >= 60) {
    return "8th & 9th grade";
  }
  else if (readability >= 50) {
    return "10th to 12th grade";
  }
  else if (readability >= 30) {
    return "College";
  }
  else if (readability >= 10) {
    return "College graduate";
  }
  else {
    return "Professional";
  }
}

export const POWER_WORDS = [
  "Exclusive", "Revealed", "Secrets",
  "Ultimate", "Proven", "Essential",
  "Unleashed", "Discover", "Breakthrough",
  "Shocking", "Insider", "Elite",
  "Uncovered", "Powerful", "Guaranteed",
  "Transformative", "Instant", "Revolutionary",
  "Unbelievable", "Top", "Best",
  "Must-have", "Limited", "Special",
  "Rare", "Unique", "Unprecedented",
  "Premium", "Urgent", "Exclusive",
  "Today", "Now", "Latest",
  "New", "Free", "Bonus",
  "Offer", "Sensational", "Astonishing",
  "Incredible", "Jaw-dropping", "Unmissable",
  "Essential", "Critical", "Vital",
  "Pivotal", "Game-changer", "Spotlight",
  "Trending", "Hot", "Popular",
  "Featured", "Special", "Limited-time",
  "Hurry", "Last chance", "Countdown",
  "Zen", "Profound", "Awe-inspiring",
  "Extraordinary", "Thrive", "Victory",
  "Effortless", "Jubilant", "Brilliant",
  "Heartwarming", "Light", "Empower",
  "Healthy", "Cheer", "Legendary",
  "Astounding", "Blissful", "Inspiring",
  "Alive", "Wonderful", "Celebrate",
  "Bravery", "Amazing", "Playful",
  "Laugh", "Hilarious", "Fun",
  "Ridiculous", "Wild", "Absurd",
  "Ludicrous", "Farce", "Whimsical",
  "Funniest", "Hilarity", "Comical",
  "Amusement", "Silly", "Jokes",
  "Outlandish", "Luxurious", "Cultivated",
  "Expensive", "Glamorous", "Enchanting",
  "Crave", "Sophisticated", "Urbane",
  "Enthralling", "Members-only", "Desire",
  "Magnetic", "Hidden", "Private",
  "Refined", "Elite", "Thrilling",
  "Charismatic", "Allure", "Exclusive",
  "Suave", "Embrace", "Never-before-seen",
  "Worldly", "Captivating", "Undeniable",
  "Inexplicable", "Eventful", "Ageless",
  "Lasting", "Memorable", "Historic",
  "Unforgettable", "Forever", "Enduring",
  "Monumental", "Eternal", "Distinguished",
  "Timeless", "Illustrious", "Everlasting",
  "Significant", "Remarkable", "Miracle",
  "Introducing", "Wanted", "Magic",
  "Shocking", "Insider", "Revolutionary",
  "Suddenly", "Unusual", "Discover",
  "Life-changing", "Now", "Sensational",
  "Hurry", "Weird", "Latest",
  "Odd", "Announcing", "Spell-binding",
  "Gorgeous", "Heavenly", "Radiant",
  "Pleasing", "Swoon-worthy", "Beautiful",
  "Appealing", "Stunning", "Classy",
  "Dazzling", "Bewitching", "Graceful",
  "Handsome", "Breathtaking", "Tantalizing",
  "Marvelous", "Intoxicating", "Lovely",
  "Grand", "Sublime", "Results",
  "Endorsed", "Verified", "Privacy",
  "Legitimate", "Sample", "Fool-proof",
  "No-questions-asked", "Official", "Tested",
  "Risk-free", "Guaranteed", "Secure",
  "Ensured", "Authentic", "Unconditional",
  "Honesty", "Proven", "Trial",
  "Refund", "Expert", "Professional",
  "Certified", "Scientific", "Protected",
  "Worldwide", "Reliable", "Studies",
  "Recognized", "Best-selling", "Respected",
  "No-strings-attached", "Efficiency", "Cheat-sheet",
  "Minimal", "Tips", "Stress-free",
  "Hacks", "Step-by-step", "Accessible",
  "Cinch", "Easy", "Simple",
  "Painless", "No-hassle", "Tricks",
  "On-demand", "Straightforward", "Adventure",
  "Change", "Beyond", "Revive",
  "Win", "Master", "Tenacious",
  "Convert", "Defy", "After",
  "Renew", "Overcome", "Journey",
  "Fearless", "Complete", "Success",
  "Achieve", "Fix", "Confront",
  "Freedom", "Dominate", "Victory",
  "Fulfill", "Learn", "Triumph",
  "Courageous", "Validate", "Energetic",
  "Ignite", "Quick-start", "Blast",
  "Speed", "Contest", "Bolt",
  "Jumpstart", "Electrify", "Launch",
  "Kick-off", "Amp", "Supercharge",
  "Boost", "Dash"
];

export const removeFillerWords = (text: string) => {
  const fillerWords = /\b(the|a|an|in|on|at)\b/g;
  return text.toLowerCase().replace(fillerWords, "").replace(/\s+/g, " ").trim();
};