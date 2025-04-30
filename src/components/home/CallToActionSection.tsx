
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToActionSection = () => {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg opacity-90">
            Join our community of wetland wardens today and help protect these
            vital ecosystems for future generations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <Button asChild size="lg" variant="secondary">
              <Link to="/volunteer">Join as Volunteer</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/20">
              <Link to="/learn">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
