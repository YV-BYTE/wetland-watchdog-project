
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Bell, HelpCircle, Map } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Volunteer Network",
    description:
      "Join our growing community of passionate volunteers and contribute your skills to wetland conservation projects.",
    icon: <Users className="h-6 w-6" />,
    link: "/volunteer"
  },
  {
    title: "Community Drives",
    description:
      "Participate in or organize local community initiatives to protect and restore wetland habitats in your area.",
    icon: <Map className="h-6 w-6" />,
    link: "/community"
  },
  {
    title: "Report Concerns",
    description:
      "Easily report wetland issues or threats with our intuitive reporting system. Help us identify problems quickly.",
    icon: <Bell className="h-6 w-6" />,
    link: "/report"
  },
  {
    title: "Educational Quizzes",
    description:
      "Test your knowledge about wetlands and earn points through our interactive and educational quiz system.",
    icon: <HelpCircle className="h-6 w-6" />,
    link: "/quiz"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How You Can Help</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the various ways you can contribute to wetland conservation
            through our platform's features.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:translate-y-[-5px]">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
