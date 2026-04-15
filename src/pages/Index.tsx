import { Component, ReactNode } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import Categories from "@/components/Categories";
import ExperiencesSection from "@/components/ExperiencesSection";
import FestivalsSection from "@/components/FestivalsSection";
import CraftsSection from "@/components/CraftsSection";
import GallerySection from "@/components/GallerySection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

class SectionBoundary extends Component<{ name: string; children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null };
  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  componentDidCatch(error: Error) {
    console.error(`[SectionBoundary] ${this.props.name} crashed:`, error);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="p-8 bg-destructive/10 text-destructive text-center">
          <p className="font-bold">Section "{this.props.name}" failed to render</p>
          <p className="text-sm mt-2">{this.state.error}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const Index = () => (
  <>
    <SectionBoundary name="HeroSection"><HeroSection /></SectionBoundary>
    <SectionBoundary name="FeaturedDestinations"><FeaturedDestinations /></SectionBoundary>
    <SectionBoundary name="Categories"><Categories /></SectionBoundary>
    <SectionBoundary name="ExperiencesSection"><ExperiencesSection /></SectionBoundary>
    <SectionBoundary name="FestivalsSection"><FestivalsSection /></SectionBoundary>
    <SectionBoundary name="CraftsSection"><CraftsSection /></SectionBoundary>
    <SectionBoundary name="GallerySection"><GallerySection /></SectionBoundary>
    <SectionBoundary name="Testimonials"><Testimonials /></SectionBoundary>
    <SectionBoundary name="CTASection"><CTASection /></SectionBoundary>
  </>
);

export default Index;
