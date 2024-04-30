import type { Metadata } from "next";
import { Inter, Jost } from "next/font/google";
import StytchContext from "@/components/auth/stytch-context";
import "./globals.css";
import { PHProvider } from "@/components/post-hog-context";

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
      <PHProvider>
        <body className={inter.className}>
          <StytchContext>{children}</StytchContext>
        </body>
      </PHProvider>
    </html>
  );
}
