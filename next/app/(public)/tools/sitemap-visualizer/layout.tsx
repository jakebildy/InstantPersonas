import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import React from "react";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <main className="min-h-screen font-jost">
      <Header />
      {children}
      <Footer className=" bottom-0 w-full" />
    </main>
  );
}
