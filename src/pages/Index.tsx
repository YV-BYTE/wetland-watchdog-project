
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeatureSection from "@/components/home/FeatureSection";
import NewsSection from "@/components/home/NewsSection";
import CallToActionSection from "@/components/home/CallToActionSection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <NewsSection />
      <CallToActionSection />
    </MainLayout>
  );
};

export default Index;
