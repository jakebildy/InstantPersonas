import Header from "./header";
import Footer from "./footer";
import HeroSection from "./hero-section";
import VideoFeatureSection from "./video-feature-section";
import CallToActionSection from "./call-to-action-section";
import PricingSection from "./pricing-section";
import FaqSection from "./faq-section";
import ProductCarouselSection from "./product-carousel-section";
import FeaturesSection from "./features-section";

const LandingPage = {
  header: Header,

  hero: HeroSection,
  videoFeature: VideoFeatureSection,
  productCarousel: ProductCarouselSection,
  features: FeaturesSection,
  callToAction: CallToActionSection,
  pricing: PricingSection,
  faqs: FaqSection,

  footer: Footer,
};

export default LandingPage;
