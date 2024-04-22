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
  }
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
