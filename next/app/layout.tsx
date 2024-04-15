import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import posthog from "posthog-js";
import StytchContext from "@/components/auth/stytch-context";
import "./globals.css";

const env = process.env.NEXT_PUBLIC_ENV;
if (env && env === "dev" && typeof window !== "undefined") {
  posthog.init("phc_QxTf3l3deKC3s9gd21PXco5eBQIikFkZ8YEkl7kizrd", {
    api_host: "https://app.posthog.com",
  });
}

const inter = Inter({ subsets: ["latin"] });
const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Instant Personas | Get Started",
  description:
    "Save hours understanding your customers with our User Persona generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} font-sans`}>
      <body className={inter.className}>
        <StytchContext>{children}</StytchContext>
      </body>
    </html>
  );
}
