
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  // Mock user data - in a real app with Supabase, this would come from the auth and database
  const userData = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    joinDate: "Jan 15, 2023",
    points: 385,
    nextLevel: 500,
    level: 3,
    badges: ["Wetland Reporter", "Quiz Master", "Early Adopter"],
    activities: [
      { type: "report", title: "Reported water pollution at Cedar Lake", date: "Apr 12, 2023", points: 200 },
      { type: "volunteer", title: "Joined cleanup drive at Heron Point", date: "Mar 24, 2023", points: 100 },
      { type: "quiz", title: "Completed Wetland Basics Quiz", date: "Feb 18, 2023", points: 85 },
    ],
    drivesCreated: [
      { title: "Bird Watching Expedition", date: "May 20, 2023", participants: 12 },
    ],
    drivesJoined: [
      { title: "Native Plant Restoration", date: "Apr 5, 2023", organizer: "Park Rangers" },
      { title: "Water Quality Testing Workshop", date: "Mar 10, 2023", organizer: "EcoLab" },
    ],
    reports: [
      { title: "Invasive Species Sighting", location: "Maple Creek", status: "Under Investigation", date: "Apr 12, 2023" },
      { title: "Illegal Dumping", location: "River Bend Park", status: "Resolved", date: "Feb 3, 2023" },
    ]
  };

  // Calculate progress percentage
  const progressPercentage = (userData.points / userData.nextLevel) * 100;

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
                        AM
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-2">{userData.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Member since {userData.joinDate}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>Level {userData.level}</span>
                          <span>{userData.points}/{userData.nextLevel} XP</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Badges</h3>
                        <div className="flex flex-wrap gap-2">
                          {userData.badges.map((badge, i) => (
                            <Badge key={i} variant="outline">{badge}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                        <p className="text-sm text-muted-foreground">{userData.email}</p>
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
                        {userData.activities.map((activity, i) => (
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
                        ))}
                      </TabsContent>
                      
                      <TabsContent value="drives">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Drives You Created</h3>
                            {userData.drivesCreated.length === 0 ? (
                              <p className="text-sm text-muted-foreground">You haven't created any community drives yet.</p>
                            ) : (
                              <div className="space-y-3">
                                {userData.drivesCreated.map((drive, i) => (
                                  <div key={i} className="p-3 border rounded-lg">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">{drive.title}</p>
                                        <p className="text-sm text-muted-foreground">{drive.date}</p>
                                      </div>
                                      <Badge>{drive.participants} participants</Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-3">Drives You Joined</h3>
                            <div className="space-y-3">
                              {userData.drivesJoined.map((drive, i) => (
                                <div key={i} className="p-3 border rounded-lg">
                                  <p className="font-medium">{drive.title}</p>
                                  <div className="flex justify-between">
                                    <p className="text-sm text-muted-foreground">Organized by: {drive.organizer}</p>
                                    <p className="text-sm text-muted-foreground">{drive.date}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reports">
                        <div className="space-y-3">
                          {userData.reports.map((report, i) => (
                            <div key={i} className="p-3 border rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{report.title}</p>
                                  <p className="text-sm text-muted-foreground">Location: {report.location}</p>
                                  <p className="text-sm text-muted-foreground">Submitted: {report.date}</p>
                                </div>
                                <Badge variant={report.status === "Resolved" ? "outline" : "secondary"}>
                                  {report.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
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
