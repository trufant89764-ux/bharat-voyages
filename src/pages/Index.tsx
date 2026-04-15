import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import Categories from "@/components/Categories";
import ExperiencesSection from "@/components/ExperiencesSection";
import FestivalsSection from "@/components/FestivalsSection";
import CraftsSection from "@/components/CraftsSection";
import GallerySection from "@/components/GallerySection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <div style={{ padding: "40px", background: "red", color: "white", fontSize: "24px" }}>
        DEBUG: If you see this, sections below should render too
      </div>
      <FeaturedDestinations />
      <Categories />
      <ExperiencesSection />
      <FestivalsSection />
      <CraftsSection />
      <GallerySection />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Index;
