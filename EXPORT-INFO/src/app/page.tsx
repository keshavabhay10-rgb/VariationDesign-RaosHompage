import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import SizzlerSection from "@/components/home/SizzlerSection";
import MenuHighlights from "@/components/home/MenuHighlights";
import ReviewsSection from "@/components/home/ReviewsSection";
import EventsTeaser from "@/components/home/EventsTeaser";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <SizzlerSection />
      <MenuHighlights />
      <ReviewsSection />
      <EventsTeaser />
      <ContactSection />
    </>
  );
}
