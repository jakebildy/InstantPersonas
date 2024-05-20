import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import StytchContext from "@/components/context/auth/stytch-context";
import "./globals.css";
import {
  PHProvider,
  PostHogPageview,
} from "@/components/context/analytics/post-hog-context";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { InstantPersonasUserProvider } from "@/components/context/auth/user-context";

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
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body className={inter.className}>
          <StytchContext>
            <InstantPersonasUserProvider>
              {children}
              <Toaster />
            </InstantPersonasUserProvider>
          </StytchContext>
        </body>
      </PHProvider>
    </html>
  );
}
