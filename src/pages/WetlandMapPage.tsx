
import MainLayout from "@/components/layout/MainLayout";
import WetlandMap from "@/components/map/WetlandMap";
import MapInfoPanel from "@/components/map/MapInfoPanel";
import { useState } from "react";

export type WetlandLocation = {
  id: string;
  name: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: "protected" | "at-risk" | "restoration";
  description: string;
  area: number; // in hectares
};

const WetlandMapPage = () => {
  const [selectedWetland, setSelectedWetland] = useState<WetlandLocation | null>(null);
  
  // Sample wetland data - in a real app, this would come from a database
  const wetlandLocations: WetlandLocation[] = [
    {
      id: "1",
      name: "Okefenokee Swamp",
      coordinates: [-82.2667, 30.6500],
      type: "protected",
      description: "One of the largest intact freshwater ecosystems in North America",
      area: 177000,
    },
    {
      id: "2",
      name: "Everglades",
      coordinates: [-80.9000, 25.3000],
      type: "at-risk",
      description: "Subtropical wetland ecosystem facing threats from urban development",
      area: 607000,
    },
    {
      id: "3",
      name: "Great Dismal Swamp",
      coordinates: [-76.5900, 36.6000],
      type: "restoration",
      description: "Forested wetland undergoing active restoration efforts",
      area: 45000,
    },
    {
      id: "4",
      name: "Prairie Pothole Region",
      coordinates: [-99.1300, 48.1500],
      type: "at-risk",
      description: "Critical habitat for North American waterfowl facing drainage threats",
      area: 70000,
    },
    {
      id: "5",
      name: "Chesapeake Bay Wetlands",
      coordinates: [-76.1200, 37.9000],
      type: "restoration",
      description: "Tidal wetlands being restored to improve water quality",
      area: 29000,
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Wetland Map</h1>
        <p className="text-muted-foreground mb-6">
          Explore wetland locations across the United States. Click on markers to learn more about each wetland ecosystem.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[600px] rounded-lg overflow-hidden border border-border">
            <WetlandMap 
              locations={wetlandLocations} 
              onSelectWetland={setSelectedWetland} 
              selectedWetland={selectedWetland} 
            />
          </div>
          <div className="lg:col-span-1">
            <MapInfoPanel 
              selectedWetland={selectedWetland} 
              onClearSelection={() => setSelectedWetland(null)} 
            />
          </div>
        </div>

        <div className="mt-8 bg-muted/50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About Our Wetland Monitoring</h2>
          <p className="text-muted-foreground mb-4">
            Wetland Warden monitors wetlands across the country to help protect these vital ecosystems. 
            Our map shows three types of wetlands:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-background p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold mb-2">Protected Wetlands</h3>
              <p className="text-sm text-muted-foreground">
                These wetlands have legal protection status and are currently safe from development.
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-l-4 border-amber-500">
              <h3 className="font-semibold mb-2">At-Risk Wetlands</h3>
              <p className="text-sm text-muted-foreground">
                These wetlands face threats from pollution, development, or drainage and need our attention.
              </p>
            </div>
            <div className="bg-background p-4 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold mb-2">Restoration Areas</h3>
              <p className="text-sm text-muted-foreground">
                These wetlands are currently undergoing restoration efforts to improve their ecological health.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default WetlandMapPage;
