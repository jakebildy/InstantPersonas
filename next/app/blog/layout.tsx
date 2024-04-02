import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import React from "react";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
