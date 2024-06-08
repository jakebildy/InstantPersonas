import Footer from "@/components/page-specific/landing-page/footer";
import Header from "@/components/page-specific/landing-page/header";
import React from "react";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      <Footer className="bottom-0 w-full" />
    </main>
  );
}
