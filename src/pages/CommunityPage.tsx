
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommunityDriveForm from "@/components/community/CommunityDriveForm";
import CommunityDriveList from "@/components/community/CommunityDriveList";

const CommunityPage = () => {
  return (
    <MainLayout>
      <section className="py-12 bg-wetland-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Community Hub</h1>
            <p className="text-muted-foreground text-lg">
              Connect with fellow conservationists, join existing drives, or create your own 
              community initiatives to protect and restore wetlands.
            </p>
          </div>
          
          <Tabs defaultValue="drives" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="drives">Join Drives</TabsTrigger>
              <TabsTrigger value="create">Create Drive</TabsTrigger>
            </TabsList>
            
            <TabsContent value="drives" className="p-6 bg-background rounded-lg shadow-md">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-center mb-2">Available Community Drives</h2>
                <p className="text-muted-foreground text-center max-w-md mx-auto mb-6">
                  Browse and join community conservation efforts in your area.
                </p>
              </div>
              <CommunityDriveList />
            </TabsContent>
            
            <TabsContent value="create" className="p-6 bg-background rounded-lg shadow-md">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-center mb-2">Create a Community Drive</h2>
                <p className="text-muted-foreground text-center max-w-md mx-auto mb-6">
                  Organize your own wetland conservation event and invite others to join.
                </p>
              </div>
              <div className="flex justify-center">
                <CommunityDriveForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default CommunityPage;
