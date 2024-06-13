import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="pb-16 pt-20 text-center lg:pt-32">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mx-auto max-w-4xl font-display font-bold text-5xl tracking-tight text-slate-900 sm:text-7xl"
      >
        Understand your audience{" "}
        <span className="relative whitespace-nowrap text-green mt-4">
          {/* <svg
            aria-hidden="true"
            viewBox="0 0 418 42"
            className="absolute left-0 top-2/3 h-[0.58em] w-full fill-green-300/70"
            preserveAspectRatio="none"
          >
            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
          </svg> */}
          <span className="relative text-green-500">in minutes</span>
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mx-auto mt-10 max-w-2xl text-lg tracking-tight text-slate-700"
      >
        Stop writing content no one cares about. Join for{" "}
        <b className="text-green-600">free</b> and start saving hours.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-10 flex flex-row justify-center gap-x-4"
      >
        <img src="https://i.imgur.com/rboSNI5.png" className="h-10" />
        <Button
          variant={"slate"}
          className="bg-green-500 p-6 text-lg hover:bg-green-700 mt-2"
          size="rounded"
          asChild
        >
          <Link href="/register">Get Started</Link>
        </Button>

        {/* flip horizontally */}
        <img
          src="https://i.imgur.com/rboSNI5.png"
          className="h-10 transform scale-x-[-1]"
        />
      </motion.div>
      <br></br>
      <span className="font-jost">
        Join <b className="text-green-500">4,640+</b> Marketers and Business
        Owners Saving Hours
      </span>
      <div className="mt-36 lg:mt-44" />
    </div>
  );
}
