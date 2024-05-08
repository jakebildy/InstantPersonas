import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero-section";
import VideoFeatureSection from "@/components/landing-page/video-feature-section";
import CallToActionSection from "@/components/landing-page/call-to-action-section";
import PricingSection from "@/components/landing-page/pricing-section";
import FaqSection from "@/components/landing-page/faq-section";
import ProductCarouselSection from "./product-carousel-section";

const LandingPage = {
  header: Header,

  hero: HeroSection,
  videoFeature: VideoFeatureSection,
  productCarousel: ProductCarouselSection,
  callToAction: CallToActionSection,
  pricing: PricingSection,
  faqs: FaqSection,

  footer: Footer,
};

export default LandingPage;
