// import Link from 'next/link'
import clsx from "clsx";
import { useState, useEffect } from "react";
import Sparkles from "./Sparkles";
import { motion } from "framer-motion";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
};

const variantStyles = {
  solid: {
    slate:
      "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 ",
    blue: "bg-mypurple text-white hover:text-slate-100 hover:bg-indigo-600 active:bg-mypurple active:text-blue-100 ",
    orange:
      "bg-orange-500 text-white hover:text-slate-100 hover:bg-orange-600 active:bg-orange active:text-orange-100 ",
    white:
      "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 ",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 ",
  },
};

const disabledStyles = {
  solid:
    "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300 hover:text-gray-500 active:bg-gray-300 active:text-gray-500",
  outline:
    "text-gray-300 ring-gray-300 cursor-not-allowed hover:text-gray-300 hover:ring-gray-300 active:text-gray-300 active:ring-gray-300",
};

export function Button({
  variant = "solid",
  color = "slate",
  className,
  disabled = false,
  href,
  ...props
}: {
  variant?: keyof typeof variantStyles;
  color?:
    | keyof (typeof variantStyles)["outline"]
    | keyof (typeof variantStyles)["solid"];
  className?: string;
  href?: string;
  [key: string]: any;
}) {
  className = clsx(
    baseStyles[variant],

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    variantStyles[variant][color],
    className
  );

  if (disabled) {
    const disabledStyle = disabledStyles[variant];
    return (
      <button className={clsx(className, disabledStyle)} disabled {...props}>
        {props.children}
      </button>
    );
  }

  return href ? (
    <motion.a
      whileHover={{ scale: 1.1 }}
      href={href}
      className={className}
      {...props}
    />
  ) : (
    <button className={className} {...props} />
  );
}

// Modify the Button component
export function LoadingButton({
  variant = "solid",
  color = "slate",
  className,
  href,
  loading = false,
  disabled = false,
  onClick,
  ...props
}: {
  variant?: keyof typeof variantStyles;
  color?:
    | keyof (typeof variantStyles)["outline"]
    | keyof (typeof variantStyles)["solid"];
  className?: string;
  href?: string;
  loading?: boolean;
  [key: string]: any;
  onClick: () => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  className = clsx(
    baseStyles[variant],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    variantStyles[variant][color],
    className,
    { "opacity-50": isLoading }
  );

  // const content = isLoading ? (
  //   <div className="relative">
  //     <Sparkle />
  //     <span className="animate-pulse">Loading...</span>
  //   </div>
  // ) : (
  //   props.children
  // );
  const content = props.children;

  if (isLoading) {
    return (
      <button className={className} disabled {...props}>
        <Sparkles
          size={10}
          color="orange"
          count={30}
          style={{ width: "100px" }}
        >
          <div className="relative w-full">
            {/* <Sparkle 
            flicker={false}
            overflowPx={20}
            color={"blue"}
            fadeOutSpeed={10}
          /> */}
            <span className="animate-pulse">Loading...</span>
          </div>
        </Sparkles>
      </button>
    );
  }

  if (disabled) {
    const disabledStyle = disabledStyles[variant];
    return (
      <button className={clsx(className, disabledStyle)} disabled {...props}>
        {props.children}
      </button>
    );
  }

  return href ? (
    <a href={href} className={className} {...props}>
      {content}
    </a>
  ) : (
    <button
      className={className}
      disabled={isLoading}
      {...props}
      onClick={async () => {
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
      }}
    >
      {content}
    </button>
  );
}
