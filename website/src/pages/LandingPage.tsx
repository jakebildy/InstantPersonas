import { Faqs } from "../components/LandingPage/Faqs";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/LandingPage/Hero";
import { CallToAction } from "../components/LandingPage/CallToAction";
import { PrimaryFeatures } from "../components/LandingPage/PrimaryFeatures";
import { Pricing } from "../components/LandingPage/Pricing";
import { useScrollToSection } from "../hooks/UseScrollToSection";

export default function LandingPage() {
  useScrollToSection();

  return (
    <>
      <Header isBlog={false} />
      <main style={{ fontFamily: "Jost" }}>
        <Hero />
        <PrimaryFeatures />
        <CallToAction />
        {/* <Testimonials /> */}
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
