
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { WetlandLocation } from '@/pages/WetlandMapPage';

interface WetlandMapProps {
  locations: WetlandLocation[];
  onSelectWetland: (wetland: WetlandLocation | null) => void;
  selectedWetland: WetlandLocation | null;
}

// You'll need to replace this with your actual Mapbox token
const MAPBOX_TOKEN = "YOUR_MAPBOX_TOKEN_HERE";

const WetlandMap = ({ locations, onSelectWetland, selectedWetland }: WetlandMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<{[key: string]: mapboxgl.Marker}>({});
  const [mapToken, setMapToken] = useState<string>(MAPBOX_TOKEN);
  
  // In a real application, you would store this token securely
  const handleTokenInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapbox-token') as string;
    if (token) {
      setMapToken(token);
      localStorage.setItem('mapbox-token', token);
      window.location.reload();
    }
  };

  useEffect(() => {
    // Check if there's a token in localStorage
    const storedToken = localStorage.getItem('mapbox-token');
    if (storedToken) {
      setMapToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapToken || mapToken === "YOUR_MAPBOX_TOKEN_HERE") return;

    mapboxgl.accessToken = mapToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-95.7129, 37.0902], // Center of US
      zoom: 3.5
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => {
      map.current?.remove();
    };
  }, [mapToken]);

  // Add markers when the map and locations are loaded
  useEffect(() => {
    if (!map.current || !mapToken || mapToken === "YOUR_MAPBOX_TOKEN_HERE") return;

    // Wait for map to load
    map.current.on('load', () => {
      // Add markers for each location
      locations.forEach(location => {
        const markerColor = 
          location.type === 'protected' ? '#22c55e' : 
          location.type === 'at-risk' ? '#f59e0b' : 
          '#3b82f6'; // restoration
          
        // Create a marker element
        const el = document.createElement('div');
        el.className = 'wetland-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.borderRadius = '50%';
        el.style.background = markerColor;
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
        el.style.cursor = 'pointer';
        el.style.transition = 'all 0.2s ease-in-out';
        
        // Add a pulse effect if this is the selected wetland
        if (selectedWetland?.id === location.id) {
          el.style.transform = 'scale(1.2)';
          el.style.boxShadow = `0 0 0 6px ${markerColor}40`;
        }
        
        // Create the marker and add it to the map
        const marker = new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .addTo(map.current!);
        
        // Save marker reference for later updates
        markers.current[location.id] = marker;
        
        // Add click handler for marker
        el.addEventListener('click', () => {
          onSelectWetland(location);
          
          // Fly to the location
          map.current?.flyTo({
            center: location.coordinates,
            zoom: 9,
            duration: 1500
          });
        });
      });
    });
  }, [locations, mapToken]);

  // Update markers when selection changes
  useEffect(() => {
    Object.entries(markers.current).forEach(([id, marker]) => {
      const el = marker.getElement();
      
      if (selectedWetland?.id === id) {
        // Highlight selected marker
        el.style.transform = 'scale(1.2)';
        el.style.zIndex = '10';
        
        const location = locations.find(loc => loc.id === id);
        if (location) {
          const markerColor = 
            location.type === 'protected' ? '#22c55e' : 
            location.type === 'at-risk' ? '#f59e0b' : 
            '#3b82f6';
          el.style.boxShadow = `0 0 0 6px ${markerColor}40`;
        }
      } else {
        // Reset unselected markers
        el.style.transform = 'scale(1)';
        el.style.zIndex = '1';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      }
    });
  }, [selectedWetland, locations]);

  if (!mapToken || mapToken === "YOUR_MAPBOX_TOKEN_HERE") {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-muted/20">
        <div className="max-w-md w-full bg-background p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Mapbox Token Required</h3>
          <p className="text-muted-foreground mb-4">
            To view the wetland map, you need to provide a Mapbox access token.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            You can get a free token by creating an account at{" "}
            <a 
              href="https://account.mapbox.com/auth/signup/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <form onSubmit={handleTokenInput} className="space-y-4">
            <div>
              <input
                type="text"
                name="mapbox-token"
                placeholder="Enter your Mapbox token"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Save Token & Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="h-full" />;
};

export default WetlandMap;
