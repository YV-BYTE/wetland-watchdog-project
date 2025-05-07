
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeatureSection from "@/components/home/FeatureSection";
import NewsSection from "@/components/home/NewsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
        <p className="mb-6 text-muted-foreground">
          Keep up with the latest environmental news and conservation efforts.
        </p>
        <Button asChild size="lg" className="gap-2">
          <Link to="/news">
            <Newspaper className="h-5 w-5" />
            View All News
          </Link>
        </Button>
      </div>
      <NewsSection />
      <CallToActionSection />
    </MainLayout>
  );
};

export default Index;
