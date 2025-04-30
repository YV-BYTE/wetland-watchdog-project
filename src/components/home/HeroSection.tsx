
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="relative py-20 overflow-hidden bg-wetland-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Protect Our <span className="text-primary">Wetlands</span> Together
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Join our community of volunteers dedicated to conserving vital ecosystems through education, action, and advocacy.
            </p>
            <div className="flex flex-wrap gap-4">
              {!user ? (
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/auth">
                    Join Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/volunteer">
                    Become a Volunteer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button asChild variant="outline" size="lg">
                <Link to="/learn">Learn About Wetlands</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-wetland-light-green p-2 rounded-lg shadow-lg transform rotate-3 relative z-10">
              <img
                src="https://images.unsplash.com/photo-1444440853884-0ba629e43844?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Beautiful wetland ecosystem"
                className="rounded-md object-cover w-full h-80 md:h-96"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-wetland-water-blue p-2 rounded-lg shadow-lg transform -rotate-6 w-48 h-48 md:w-64 md:h-64">
              <img
                src="https://images.unsplash.com/photo-1609881142764-7f42f6a401d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Wetland birds"
                className="rounded-md object-cover w-full h-full"
              />
            </div>
            <div className="absolute -top-6 -left-6 bg-accent p-2 rounded-lg shadow-lg transform rotate-6 w-36 h-36 md:w-48 md:h-48">
              <img
                src="https://images.unsplash.com/photo-1571858253340-67a6a293144b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Wetland plants"
                className="rounded-md object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
