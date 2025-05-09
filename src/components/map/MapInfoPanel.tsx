
import { Button } from "@/components/ui/button";
import { WetlandLocation } from "@/pages/WetlandMapPage";
import { DropletIcon, MapPinIcon, AreaIcon, XCircleIcon } from "lucide-react";

interface MapInfoPanelProps {
  selectedWetland: WetlandLocation | null;
  onClearSelection: () => void;
}

const MapInfoPanel = ({ selectedWetland, onClearSelection }: MapInfoPanelProps) => {
  const getWetlandStatusColor = (type: string) => {
    switch (type) {
      case 'protected':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'at-risk':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'restoration':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (type: string) => {
    switch (type) {
      case 'protected':
        return 'Protected';
      case 'at-risk':
        return 'At Risk';
      case 'restoration':
        return 'Under Restoration';
      default:
        return 'Unknown';
    }
  };

  if (!selectedWetland) {
    return (
      <div className="h-[600px] bg-muted/20 rounded-lg p-6 flex flex-col items-center justify-center text-center">
        <DropletIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No Wetland Selected</h3>
        <p className="text-muted-foreground max-w-md">
          Click on a marker on the map to view detailed information about that wetland ecosystem.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[600px] bg-background rounded-lg border border-border overflow-auto">
      <div className="p-4 border-b border-border flex justify-between items-center sticky top-0 bg-background z-10">
        <h3 className="text-xl font-semibold">{selectedWetland.name}</h3>
        <Button variant="ghost" size="icon" onClick={onClearSelection}>
          <XCircleIcon className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getWetlandStatusColor(selectedWetland.type)} mb-4`}>
            {getStatusText(selectedWetland.type)}
          </div>
          
          <p className="text-muted-foreground">{selectedWetland.description}</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPinIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="font-medium">Location</h4>
              <p className="text-muted-foreground text-sm">
                {selectedWetland.coordinates[1].toFixed(4)}° N, {selectedWetland.coordinates[0].toFixed(4)}° W
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <AreaIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="font-medium">Area</h4>
              <p className="text-muted-foreground text-sm">
                {selectedWetland.area.toLocaleString()} hectares ({(selectedWetland.area / 404.686).toFixed(0)} acres)
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium mb-2">Conservation Actions</h4>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
            {selectedWetland.type === 'protected' && (
              <>
                <li>Maintain protected status through ongoing monitoring</li>
                <li>Conduct regular biodiversity surveys</li>
                <li>Manage invasive species</li>
                <li>Develop educational programs for visitors</li>
              </>
            )}
            {selectedWetland.type === 'at-risk' && (
              <>
                <li>Advocate for legal protection status</li>
                <li>Monitor pollution levels and sources</li>
                <li>Engage with local stakeholders and developers</li>
                <li>Create buffer zones to reduce impacts</li>
              </>
            )}
            {selectedWetland.type === 'restoration' && (
              <>
                <li>Continue active restoration of native vegetation</li>
                <li>Monitor water quality improvements</li>
                <li>Reintroduce native species when appropriate</li>
                <li>Address remaining sources of degradation</li>
              </>
            )}
          </ul>
        </div>
        
        <div className="mt-6">
          <Button className="w-full">
            View Detailed Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapInfoPanel;
