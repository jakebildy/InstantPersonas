import LandingHeader from "@/components/landing-page/header";
import LandingFooter from "@/components/landing-page//footer";
import HeroSection from "@/components/landing-page/hero-section";
import VideoFeatureSection from "@/components/landing-page/video-feature-section";
import CallToActionSection from "@/components/landing-page/call-to-action-section";
import PricingSection from "@/components/landing-page/pricing-section";
import FaqSection from "@/components/landing-page/faq-section";

const LandingPage = {
  header: LandingHeader,

  hero: HeroSection,
  videoFeature: VideoFeatureSection,
  callToAction: CallToActionSection,
  pricing: PricingSection,
  faqs: FaqSection,

  footer: LandingFooter,
};

export default LandingPage;
