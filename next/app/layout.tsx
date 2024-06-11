import type { Metadata } from "next";

import "./globals.css";
import {
  PHProvider,
  PostHogPageview,
} from "@/components/context/analytics/post-hog-context";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { jost, inter } from "@/lib/fonts";
import { ClarityScript } from "@/components/context/analytics/clarity-script";
import { AuthContextProvider } from "@/components/context/auth/auth-provider";
import { AIContextProvider } from "@/components/context/persona/ai-context-provider";

export const metadata: Metadata = {
  title: "InstantPersonas | Get Started",
  description:
    "Save hours understanding your customers with our User Persona generator.",
};

export const maxDuration = 300;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} font-sans`}>
      <head>
        <ClarityScript />
      </head>
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body className={inter.className}>
          <AuthContextProvider>
            <AIContextProvider>
              {children}
              <Toaster />
            </AIContextProvider>
          </AuthContextProvider>
        </body>
      </PHProvider>
    </html>
  );
}
