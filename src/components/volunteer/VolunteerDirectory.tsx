
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

// Placeholder data - in a real app, this would come from Supabase
const volunteers = [
  {
    id: 1,
    name: "Alex Johnson",
    expertise: "Environmental Science",
    location: "Portland, Oregon",
    email: "alex.j@example.com",
    initials: "AJ"
  },
  {
    id: 2,
    name: "Morgan Lee",
    expertise: "Wildlife Conservation",
    location: "Austin, Texas",
    email: "morgan@example.com",
    initials: "ML"
  },
  {
    id: 3,
    name: "Jamie Smith",
    expertise: "Education",
    location: "Seattle, Washington",
    email: "jamie.s@example.com",
    initials: "JS"
  },
  {
    id: 4,
    name: "Taylor Wong",
    expertise: "Community Outreach",
    location: "Boston, Massachusetts",
    email: "taylor.w@example.com",
    initials: "TW"
  }
];

const VolunteerDirectory = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((volunteer) => (
          <Card key={volunteer.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {volunteer.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium">{volunteer.name}</h3>
                  <p className="text-sm text-muted-foreground">{volunteer.location}</p>
                  <Badge variant="outline" className="mt-2">
                    {volunteer.expertise}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  asChild
                >
                  <a href={`mailto:${volunteer.email}`}>
                    <Mail className="h-4 w-4" />
                    Contact
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VolunteerDirectory;
