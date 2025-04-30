
import MainLayout from "@/components/layout/MainLayout";
import WetlandReportForm from "@/components/report/WetlandReportForm";

const ReportPage = () => {
  return (
    <MainLayout>
      <section className="py-12 bg-wetland-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Report a Wetland Issue</h1>
            <p className="text-muted-foreground text-lg">
              Help us monitor and protect wetland areas by reporting issues or threats 
              you've observed. Your reports make a difference.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Submit a Report</h2>
                <WetlandReportForm />
              </div>
              
              <div className="space-y-6">
                <div className="bg-background p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4">Why Report?</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full text-primary mt-1">📊</div>
                      <div>
                        <h3 className="font-medium">Early Detection</h3>
                        <p className="text-muted-foreground text-sm">
                          Quickly identifying issues helps prevent long-term damage to fragile ecosystems.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full text-primary mt-1">🔍</div>
                      <div>
                        <h3 className="font-medium">Data Collection</h3>
                        <p className="text-muted-foreground text-sm">
                          Your reports help build a comprehensive database of wetland health and threats.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full text-primary mt-1">🌱</div>
                      <div>
                        <h3 className="font-medium">Conservation Action</h3>
                        <p className="text-muted-foreground text-sm">
                          Reports help us coordinate with authorities and conservation groups for targeted response.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold mb-4">What Happens Next</h2>
                  <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                    <li>Our team reviews your report within 24-48 hours</li>
                    <li>We classify the severity and type of issue</li>
                    <li>Reports are shared with relevant conservation partners</li>
                    <li>You'll receive updates on actions taken (if you opt-in)</li>
                    <li>Data contributes to our conservation mapping initiatives</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ReportPage;
