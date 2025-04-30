
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Volunteer = {
  id: string;
  name: string;
  expertise: string;
  location: string;
  email: string;
  created_at: string;
};

const VolunteerDirectory = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVolunteers() {
      try {
        const { data, error } = await supabase
          .from('volunteers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setVolunteers(data || []);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVolunteers();
  }, []);

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return <div className="text-center py-8">Loading volunteers...</div>;
  }

  if (volunteers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No volunteers registered yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((volunteer) => (
          <Card key={volunteer.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(volunteer.name)}
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
