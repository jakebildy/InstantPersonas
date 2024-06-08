import { cva } from "class-variance-authority";

export const avatarVariants = cva(
  "ring-offset-transparent transition-all duration-500 ease shadow-md  ",
  {
    variants: {
      variant: {
        blue: "border-pastel-blue ring-pastel-blue/75 shadow-pastel-blue",
        purple:
          "border-pastel-purple ring-pastel-purple/75 shadow-pastel-purple",
        red: "border-pastel-red ring-pastel-red/75 shadow-pastel-red",
        yellow:
          "border-pastel-yellow ring-pastel-yellow/75 shadow-pastel-yellow",
        green: "border-pastel-green ring-pastel-green/75 shadow-pastel-green",
        brown: "border-pastel-brown ring-pastel-brown/75 shadow-pastel-brown",
        pink: "border-pastel-pink ring-pastel-pink/75 shadow-pastel-pink",
      },
      size: {
        xl: "border-2 h-24 w-24 m-4",
        default: "h-14 w-14 border-4 hover:border-6 ring-offset-4 m-2",
        sm: "h-10 w-10 border-2 hover:border-4 ring-offset-4 m-2",
        preview: "h-4 w-4 border-2 hover:border-3 ring-offset-4 m-2",
      },
      interactive: {
        true: "cursor-pointer hover:scale-110 hover:ring-1 hover:shadow-lg",
        false: "cursor-default",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "blue",
      size: "default",
      interactive: true,
    },
  },
);

export const tabTriggerVariants = cva("rounded-full py-1 px-4 ", {
  variants: {
    variant: {
      blue: "focus-visible:ring-pastel-blue ring-offset-pastel-blue/75",
      purple: "focus-visible:ring-pastel-purple ring-offset-pastel-purple/75",
      red: "focus-visible:ring-pastel-red ring-offset-pastel-red/75",
      yellow: "focus-visible:ring-pastel-yellow ring-offset-pastel-yellow/75",
      green: "focus-visible:ring-pastel-green ring-offset-pastel-green/75",
      brown: "focus-visible:ring-pastel-brown ring-offset-pastel-brown/75",
      pink: "focus-visible:ring-pastel-pink ring-offset-pastel-pink/75",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const badgeVariants = cva(
  "rounded-full py-1 px-4 border uppercase text-xs text-center",
  {
    variants: {
      variant: {
        blue: "focus-visible:ring-pastel-blue ring-offset-pastel-blue/75 bg-pastel-blue/50 text-blue-500 border-pastel-blue group-hover:bg-pastel-blue",
        purple:
          "focus-visible:ring-pastel-purple ring-offset-pastel-purple/75 bg-pastel-purple/50 text-purple-500 border-pastel-purple group-hover:bg-pastel-purple",
        red: "focus-visible:ring-pastel-red ring-offset-pastel-red/75 bg-pastel-red/50 text-red-500 border-pastel-red group-hover:bg-pastel-red",
        yellow:
          "focus-visible:ring-pastel-yellow ring-offset-pastel-yellow/75 bg-pastel-yellow/50 text-yellow-500 border-pastel-yellow group-hover:bg-pastel-yellow",
        green:
          "focus-visible:ring-pastel-green ring-offset-pastel-green/75 bg-pastel-green/50 text-green-500 border-pastel-green group-hover:bg-pastel-green",
        brown:
          "focus-visible:ring-pastel-brown ring-offset-pastel-brown/75 bg-pastel-brown/50 text-brown-500 border-pastel-brown group-hover:bg-pastel-brown",
        pink: "focus-visible:ring-pastel-pink ring-offset-pastel-pink/75 bg-pastel-pink/50 text-pink-500 border-pastel-pink group-hover:bg-pastel-pink",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

export const gradientLightVariants = cva("bg-gradient-to-b ", {
  variants: {
    variant: {
      blue: "from-pastel-blue/25 to-pastel-blue/5",
      purple: "from-pastel-purple/25 to-pastel-purple/5",
      red: "from-pastel-red/25 to-pastel-red/5",
      yellow: "from-pastel-yellow/25 to-pastel-yellow/5",
      green: "from-pastel-green/25 to-pastel-green/5",
      brown: "from-pastel-brown/25 to-pastel-brown/5",
      pink: "from-pastel-pink/25 to-pastel-pink/5",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const gradientVariants = cva("bg-gradient-to-b ", {
  variants: {
    variant: {
      blue: "from-pastel-blue to-pastel-blue/25",
      purple: "from-pastel-purple to-pastel-purple/25",
      red: "from-pastel-red to-pastel-red/25",
      yellow: "from-pastel-yellow to-pastel-yellow/25",
      green: "from-pastel-green to-pastel-green/25",
      brown: "from-pastel-brown to-pastel-brown/25",
      pink: "from-pastel-pink to-pastel-pink/25",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const gradientDarkVariants = cva("bg-gradient-to-b ", {
  variants: {
    variant: {
      blue: "from-blue-900 to-blue-900/25",
      purple: "from-purple-900 to-purple-900/25",
      red: "from-red-900 to-red-900/25",
      yellow: "from-yellow-900 to-yellow-900/25",
      green: "from-green-900 to-green-900/25",
      brown: "from-brown-900 to-brown-900/25",
      pink: "from-pink-900 to-pink-900/25",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const shadowVariants = cva("shadow-md", {
  variants: {
    variant: {
      blue: "shadow-pastel-blue/50",
      purple: "shadow-pastel-purple/50",
      red: "shadow-pastel-red/50",
      yellow: "shadow-pastel-yellow/50",
      green: "shadow-pastel-green/50",
      brown: "shadow-pastel-brown/50",
      pink: "shadow-pastel-pink/50",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const textPastelColorVariants = cva("", {
  variants: {
    variant: {
      blue: "text-pastel-blue",
      purple: "text-pastel-purple",
      red: "text-pastel-red",
      yellow: "text-pastel-yellow",
      green: "text-pastel-green",
      brown: "text-pastel-brown",
      pink: "text-pastel-pink",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const textLightColorVariants = cva("", {
  variants: {
    variant: {
      blue: "text-blue-400",
      purple: "text-purple-400",
      red: "text-red-400",
      yellow: "text-yellow-400",
      green: "text-green-400",
      brown: "text-brown-400",
      pink: "text-pink-400",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const textColorVariants = cva("", {
  variants: {
    variant: {
      blue: "text-blue-900",
      purple: "text-purple-900",
      red: "text-red-900",
      yellow: "text-yellow-900",
      green: "text-green-900",
      brown: "text-brown-900",
      pink: "text-pink-900",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const SurveyCardBackGroundElementRing = cva(
  "border  size-[300px] rounded-full absolute -left-[50px] top-[100px] tilt-backward-left",
  {
    variants: {
      variant: {
        blue: "border-blue-600",
        purple: "border-purple-600",
        red: "border-red-600",
        yellow: "border-yellow-600",
        green: "border-green-600",
        brown: "border-brown-600",
        pink: "border-pink-600",
      },
      blur: {
        true: "blur-[1px]",
      },
    },
    defaultVariants: {
      variant: "blue",
      blur: false,
    },
  },
);

export const SurveyCardBackGroundElementCircle = cva(
  "size-[250px] rounded-full absolute -right-[25px] top-[50px] blur-2xl",
  {
    variants: {
      variant: {
        blue: "bg-blue-500",
        purple: "bg-purple-500",
        red: "bg-red-500",
        yellow: "bg-yellow-500",
        green: "bg-green-500",
        brown: "bg-brown-500",
        pink: "bg-pink-500",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

export const ButtonInnerHover = cva(
  "whitespace-nowrap rounded-full px-4 border border-input h-10 p-2 hover:text-white transition-colors duration-300 ease-out font-semibold text-muted-foreground",
  {
    variants: {
      variant: {
        blue: "hover:bg-blue-500 ",
        purple: "hover:bg-purple-500",
        red: "hover:bg-red-500",
        yellow: "hover:bg-yellow-500",
        green: "hover:bg-green-500",
        brown: "hover:bg-brown-500",
        pink: "hover:bg-pink-500",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

export const Border600 = cva("border", {
  variants: {
    variant: {
      blue: "border-blue-600",
      purple: "border-purple-600",
      red: "border-red-600",
      yellow: "border-yellow-600",
      green: "border-green-600",
      brown: "border-brown-600",
      pink: "border-pink-600",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const background600 = cva("", {
  variants: {
    variant: {
      blue: "bg-blue-600",
      purple: "bg-purple-600",
      red: "bg-red-600",
      yellow: "bg-yellow-600",
      green: "bg-green-600",
      brown: "bg-brown-600",
      pink: "bg-pink-600",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const SVG600 = cva("", {
  variants: {
    variant: {
      blue: "fill-blue-600/70 stroke-blue-600",
      purple: "fill-purple-600/70 stroke-purple-600",
      red: "fill-red-600/70 stroke-red-600",
      yellow: "fill-yellow-600/70 stroke-yellow-600",
      green: "fill-green-600/70 stroke-green-600",
      brown: "fill-brown-600/70 stroke-brown-600",
      pink: "fill-pink-600/70 stroke-pink-600",
    },
  },
  defaultVariants: {
    variant: "blue",
  },
});

export const gradientGridTitleTextVariants = cva(
  "bg-gradient-to-b bg-clip-text text-center text-7xl font-bold tracking-tighter text-transparent",
  {
    variants: {
      variant: {
        blue: "from-pastel-blue via-[#475a78] to-[#4c435b]",
        purple: "from-[#3f00f4] to-[#ee6cf5]",
        red: "from-[#EE5A24] to-[#EA2027]",
        yellow: "from-[#ffd319] to-[#ff2975]",
        green: "from-[#A2D240] to-[#1B8B00]",
        brown: "from-[#210D10] to-[#802201]",
        pink: " from-[#FF1053]  to-[#EE5166] ",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

export const gradientGridTextVariants = cva(
  "text-center text-4xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ",
  {
    variants: {
      variant: {
        blue: "from-black to-gray-500",
        purple: "from-black to-[#ee6cf5]",
        red: "from-[#210D10] to-[#EA2027]",
        yellow: "from-yellow-900 to-[#ff2975]",
        green: "from-green-900 to-[#1B8B00]",
        brown: "from-[#210D10] to-[#802201]",
        pink: "from-black to-[#FF1053]",
      },
    },
    defaultVariants: {
      variant: "blue",
    },
  },
);

export const ColorVariantMap = {
  blue: "#c7eaf1",
  purple: "#d9cbfc",
  red: "#ef9796",
  yellow: "#fbe8b1",
  green: "#c2e4bc",
  brown: "#e6d3d0",
  pink: "#eaa9c1",
} as const;

export const ColorVariants = Object.keys(ColorVariantMap) as ColorVariant[];

export type ColorVariant = keyof typeof ColorVariantMap;
