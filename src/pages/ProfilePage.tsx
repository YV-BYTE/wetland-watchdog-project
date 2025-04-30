
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [drivesCreated, setDrivesCreated] = useState([]);
  const [drivesJoined, setDrivesJoined] = useState([]);
  const [reports, setReports] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    async function fetchUserData() {
      if (!user) return;

      try {
        setLoading(true);
        
        // Fetch user badges
        const { data: badgesData } = await supabase
          .from('user_badges')
          .select('badge_name, awarded_at')
          .eq('user_id', user.id);
        
        // Fetch reports
        const { data: reportsData } = await supabase
          .from('wetland_reports')
          .select('*')
          .eq('user_id', user.id);
        
        // Fetch drives created by user
        const { data: createdDrives } = await supabase
          .from('community_drives')
          .select('*')
          .eq('creator_id', user.id);
        
        // Fetch drives joined by user
        const { data: joinedDrivesIds } = await supabase
          .from('drive_participants')
          .select('drive_id, joined_at')
          .eq('user_id', user.id);
          
        const joinedDriveIds = joinedDrivesIds?.map(item => item.drive_id) || [];
        
        let joinedDrives = [];
        if (joinedDriveIds.length > 0) {
          // Fetch the actual drive details for drives the user joined
          const { data: drivesData } = await supabase
            .from('community_drives')
            .select('*, creator:profiles(username)')
            .in('id', joinedDriveIds);
            
          joinedDrives = drivesData || [];
        }
        
        // Create combined activities list
        const allActivities = [
          ...(reportsData?.map(report => ({
            type: 'report',
            title: `Reported ${
              (report.pollution ? 'pollution' : '') ||
              (report.invasive_species ? 'invasive species' : '') ||
              (report.drainage ? 'drainage issues' : '') ||
              (report.illegal ? 'illegal activity' : '') ||
              (report.development ? 'development threat' : '') ||
              'issue'
            } at ${report.location}`,
            date: new Date(report.created_at).toLocaleDateString(),
            points: 200
          })) || []),
          ...(joinedDrives?.map(drive => ({
            type: 'volunteer',
            title: `Joined community drive: ${drive.title}`,
            date: new Date(drive.date).toLocaleDateString(),
            points: 100
          })) || [])
        ];
        
        // Sort activities by date (newest first)
        allActivities.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        setBadges(badgesData || []);
        setReports(reportsData || []);
        setDrivesCreated(createdDrives || []);
        setDrivesJoined(joinedDrives || []);
        setActivities(allActivities);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user]);

  async function handleLeaveDrive(driveId: string) {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('drive_participants')
        .delete()
        .match({ user_id: user.id, drive_id: driveId });

      if (error) throw error;
      
      // Update the local state by filtering out the left drive
      setDrivesJoined(prev => prev.filter(drive => drive.id !== driveId));
      
    } catch (error) {
      console.error("Error leaving drive:", error);
    }
  }

  // Calculate next level thresholds
  const calculateNextLevel = (currentPoints: number) => {
    const basePoints = 500;
    const currentLevel = Math.floor(currentPoints / basePoints) + 1;
    const nextLevelPoints = currentLevel * basePoints;
    
    return {
      level: currentLevel,
      nextLevel: nextLevelPoints,
      progress: (currentPoints / nextLevelPoints) * 100
    };
  };

  if (!user || loading) {
    return (
      <MainLayout>
        <section className="py-12 bg-wetland-gradient">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Loading profile...</h1>
          </div>
        </section>
      </MainLayout>
    );
  }

  const levelInfo = calculateNextLevel(profile?.points || 0);
  
  // Default badges if none exist
  const userBadges = badges.length > 0 
    ? badges.map(b => b.badge_name) 
    : profile?.points >= 200 
      ? ["Wetland Reporter"] 
      : ["New Member"];

  return (
    <MainLayout>
      <section className="py-12 bg-wetland-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20">
                      <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                        {user.email?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-2">{profile?.username || user.email}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>Level {levelInfo.level}</span>
                          <span>{profile?.points || 0}/{levelInfo.nextLevel} XP</span>
                        </div>
                        <Progress value={levelInfo.progress} className="h-2" />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Badges</h3>
                        <div className="flex flex-wrap gap-2">
                          {userBadges.map((badge, i) => (
                            <Badge key={i} variant="outline">{badge}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Wetland Warden Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="activities">
                      <TabsList className="grid grid-cols-3 mb-6">
                        <TabsTrigger value="activities">Activities</TabsTrigger>
                        <TabsTrigger value="drives">Community Drives</TabsTrigger>
                        <TabsTrigger value="reports">Your Reports</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="activities" className="space-y-4">
                        {activities.length === 0 ? (
                          <p className="text-center text-muted-foreground py-8">
                            No activities yet. Start by reporting wetland issues or joining community drives!
                          </p>
                        ) : (
                          activities.map((activity, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 border rounded-lg">
                              <div className={`p-2 rounded-full ${
                                activity.type === 'report' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : activity.type === 'volunteer'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {activity.type === 'report' ? '📝' : activity.type === 'volunteer' ? '🤝' : '❓'}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{activity.title}</p>
                                <p className="text-sm text-muted-foreground">{activity.date}</p>
                              </div>
                              <Badge variant="secondary">+{activity.points} pts</Badge>
                            </div>
                          ))
                        )}
                      </TabsContent>
                      
                      <TabsContent value="drives">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Drives You Created</h3>
                            {drivesCreated.length === 0 ? (
                              <p className="text-sm text-muted-foreground">You haven't created any community drives yet.</p>
                            ) : (
                              <div className="space-y-3">
                                {drivesCreated.map((drive, i) => (
                                  <div key={i} className="p-3 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">{drive.title}</p>
                                        <p className="text-sm text-muted-foreground">{new Date(drive.date).toLocaleDateString()}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3">Drives You Joined</h3>
                            {drivesJoined.length === 0 ? (
                              <p className="text-sm text-muted-foreground">You haven't joined any community drives yet.</p>
                            ) : (
                              <div className="space-y-3">
                                {drivesJoined.map((drive, i) => (
                                  <div key={i} className="p-3 border rounded-lg">
                                    <p className="font-medium">{drive.title}</p>
                                    <div className="flex justify-between items-center mt-2">
                                      <p className="text-sm text-muted-foreground">
                                        {new Date(drive.date).toLocaleDateString()} at {drive.time}
                                      </p>
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        onClick={() => handleLeaveDrive(drive.id)}
                                      >
                                        Leave Drive
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reports">
                        {reports.length === 0 ? (
                          <p className="text-center text-muted-foreground py-8">
                            You haven't submitted any wetland reports yet.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {reports.map((report, i) => (
                              <div key={i} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">
                                      {(report.pollution ? 'Water Pollution' : '') ||
                                       (report.invasive_species ? 'Invasive Species' : '') ||
                                       (report.drainage ? 'Drainage Issues' : '') ||
                                       (report.illegal ? 'Illegal Activity' : '') ||
                                       (report.development ? 'Development Threat' : '') ||
                                       'Wetland Issue'}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Location: {report.location}</p>
                                    <p className="text-sm text-muted-foreground">Submitted: {new Date(report.created_at).toLocaleDateString()}</p>
                                  </div>
                                  <Badge variant={report.status === "Resolved" ? "outline" : "secondary"}>
                                    {report.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ProfilePage;
