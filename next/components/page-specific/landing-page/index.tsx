import Header from "./header";
import Footer from "./footer";
import HeroSection from "./hero-section";
import VideoFeatureSection from "./video-feature-section";
import CallToActionSection from "./call-to-action-section";
import PricingSection from "./pricing-section";
import FaqSection from "./faq-section";
import ProductCarouselSection from "./product-carousel-section";
import FeaturesSection from "./features-section";
import { TestimonialSection } from "./testimonials";
import ShowcaseHeroSection from "./showcase-hero-section";
import DocumentFeatureSection from "./document-feature-section";

const LandingPage = {
  header: Header,

  hero: HeroSection,
  showcaseHero: ShowcaseHeroSection,
  videoFeature: VideoFeatureSection,
  productCarousel: ProductCarouselSection,
  features: FeaturesSection,
  documentFeature: DocumentFeatureSection,
  callToAction: CallToActionSection,
  pricing: PricingSection,
  faqs: FaqSection,

  testimonials: TestimonialSection,

  footer: Footer,
};

export default LandingPage;
