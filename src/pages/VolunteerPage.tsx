
import MainLayout from "@/components/layout/MainLayout";
import VolunteerForm from "@/components/volunteer/VolunteerForm";
import VolunteerDirectory from "@/components/volunteer/VolunteerDirectory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VolunteerPage = () => {
  return (
    <MainLayout>
      <section className="py-12 bg-wetland-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Volunteer Connect</h1>
            <p className="text-muted-foreground text-lg">
              Join our network of dedicated volunteers or connect with other 
              environmental advocates to make a difference in wetland conservation.
            </p>
          </div>
          
          <Tabs defaultValue="register" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="register">Become a Volunteer</TabsTrigger>
              <TabsTrigger value="directory">Volunteer Directory</TabsTrigger>
            </TabsList>
            
            <TabsContent value="register" className="p-6 bg-background rounded-lg shadow-md">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-center mb-2">Registration Form</h2>
                <p className="text-muted-foreground text-center max-w-md mx-auto mb-6">
                  Fill out the form below to join our network of volunteers 
                  dedicated to wetland conservation.
                </p>
              </div>
              <VolunteerForm />
            </TabsContent>
            
            <TabsContent value="directory" className="p-6 bg-background rounded-lg shadow-md">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-center mb-2">Find Volunteers</h2>
                <p className="text-muted-foreground text-center max-w-md mx-auto mb-6">
                  Connect with other volunteers in our network who share your passion
                  for wetland conservation.
                </p>
              </div>
              <VolunteerDirectory />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default VolunteerPage;
