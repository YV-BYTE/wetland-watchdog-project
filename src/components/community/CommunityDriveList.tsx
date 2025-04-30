
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Drive = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  creator_id: string;
  created_at: string;
  _participants_count?: number;
};

const CommunityDriveList = () => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);
  const [userJoinedDrives, setUserJoinedDrives] = useState<string[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDrives() {
      try {
        // Fetch drives with participant count
        const { data: drivesData, error } = await supabase
          .from('community_drives')
          .select('*, participants:drive_participants(count)')
          .order('date', { ascending: true });

        if (error) throw error;

        // Process the data to extract participant count
        const processedDrives = drivesData?.map(drive => ({
          ...drive,
          _participants_count: drive.participants?.[0]?.count || 0
        })) || [];

        setDrives(processedDrives);

        // If user is logged in, fetch which drives they've joined
        if (user) {
          const { data: userParticipations, error: participationError } = await supabase
            .from('drive_participants')
            .select('drive_id')
            .eq('user_id', user.id);

          if (!participationError && userParticipations) {
            const joinedDriveIds = userParticipations.map(p => p.drive_id);
            setUserJoinedDrives(joinedDriveIds);
          }
        }
      } catch (error) {
        console.error('Error fetching drives:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDrives();
  }, [user]);

  const handleJoinDrive = async (driveId: string) => {
    if (!user) {
      toast.error("You must be logged in to join a drive");
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from('drive_participants')
        .insert({ user_id: user.id, drive_id: driveId });

      if (error) {
        if (error.code === '23505') {
          toast.error("You have already joined this drive");
        } else {
          throw error;
        }
        return;
      }

      // Update local state
      setUserJoinedDrives(prev => [...prev, driveId]);
      toast.success("You've joined this community drive!");
      
    } catch (error: any) {
      toast.error("Failed to join drive", { description: error.message });
      console.error("Error joining drive:", error);
    }
  };

  const handleLeaveDrive = async (driveId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('drive_participants')
        .delete()
        .match({ user_id: user.id, drive_id: driveId });

      if (error) throw error;

      // Update local state
      setUserJoinedDrives(prev => prev.filter(id => id !== driveId));
      toast.success("You've left this community drive");
      
    } catch (error: any) {
      toast.error("Failed to leave drive", { description: error.message });
      console.error("Error leaving drive:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading community drives...</div>;
  }

  if (drives.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No community drives available yet.</p>
        <p className="mt-2">Be the first to create one!</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {drives.map((drive) => {
        const isJoined = userJoinedDrives.includes(drive.id);
        const isCreator = user && user.id === drive.creator_id;

        return (
          <Card key={drive.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{drive.title}</h3>
              <p className="text-muted-foreground mb-4">{drive.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{drive.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{formatDate(drive.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{drive.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{drive._participants_count} participants</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                {isCreator ? (
                  <Button variant="outline" disabled>
                    You created this drive
                  </Button>
                ) : isJoined ? (
                  <Button 
                    variant="outline" 
                    onClick={() => handleLeaveDrive(drive.id)}
                  >
                    Leave Drive
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleJoinDrive(drive.id)}
                  >
                    Join Drive
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CommunityDriveList;
