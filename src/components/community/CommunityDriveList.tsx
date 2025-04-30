
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

// Placeholder data - in a real app, this would come from Supabase
const communityDrives = [
  {
    id: 1,
    title: "Cedar Lake Cleanup",
    description: "Join us for a day of cleaning up debris and invasive species from Cedar Lake wetlands.",
    date: "2023-06-15",
    time: "09:00",
    location: "Cedar Lake Park, 200 Lakeside Dr",
    participants: 12,
    joined: false
  },
  {
    id: 2,
    title: "Wetland Bird Survey",
    description: "Help count and document bird species in our local wetland to monitor biodiversity.",
    date: "2023-06-22",
    time: "07:30",
    location: "Heron Point Nature Reserve",
    participants: 8,
    joined: true
  },
  {
    id: 3,
    title: "Native Plant Workshop",
    description: "Learn about and help plant native species that support our local wetland ecosystem.",
    date: "2023-07-08",
    time: "10:00",
    location: "Community Garden Center",
    participants: 15,
    joined: false
  }
];

const CommunityDriveList = () => {
  const handleJoinDrive = (id: number, alreadyJoined: boolean) => {
    // In a real app with Supabase, you would update the database here
    
    if (alreadyJoined) {
      toast.info("You've left this community drive");
    } else {
      toast.success("You've joined the community drive!", {
        description: "Check your email for further details.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      {communityDrives.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No community drives available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {communityDrives.map((drive) => (
            <Card key={drive.id} className="overflow-hidden border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{drive.title}</CardTitle>
                  <Badge variant={drive.joined ? "secondary" : "outline"}>
                    {drive.joined ? "Joined" : "Open"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{drive.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {formatDate(drive.date)} at {drive.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{drive.location}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {drive.participants} participants
                  </span>
                </div>
                <Button
                  variant={drive.joined ? "outline" : "default"}
                  onClick={() => handleJoinDrive(drive.id, drive.joined)}
                  size="sm"
                >
                  {drive.joined ? "Leave" : "Join Drive"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityDriveList;
