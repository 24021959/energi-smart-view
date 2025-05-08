
import { useRef, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { GeoLocation } from "@/services/weatherService";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export interface GoogleMapProps {
  city: string;
  location: GeoLocation;
}

export function GoogleMap({ city, location }: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  useEffect(() => {
    const apiKey = 'AIzaSyBz-SCJGkRzZini9Wt2IpgGrGJl-uJTFxI';
    let mapInstance: any = null;

    const initializeMap = async () => {
      if (!mapContainerRef.current) {
        console.error("Map container not ready");
        return;
      }

      try {
        // Initialize the Google Maps loader
        const loader = new Loader({
          apiKey,
          version: "weekly",
        });

        // Load the Google Maps API
        await loader.load();
        
        // Create a map instance
        const google = window.google;
        mapInstance = new google.maps.Map(mapContainerRef.current, {
          center: location,
          zoom: 14,
          mapTypeControl: false,
          fullscreenControl: true,
          streetViewControl: true
        });

        // Add a marker for the city
        new google.maps.Marker({
          position: location,
          map: mapInstance,
          title: city
        });
        
        setMapLoaded(true);
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Impossibile inizializzare la mappa");
      }
    };

    initializeMap();

    // Cleanup function
    return () => {
      // Google Maps doesn't require explicit cleanup as the DOM element will be removed
      mapInstance = null;
    };
  }, [city, location]);

  if (mapError) {
    return (
      <div className="rounded-md overflow-hidden bg-gray-100 flex items-center justify-center h-[400px]">
        <div className="text-center p-4 max-w-md">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <AlertDescription>{mapError}</AlertDescription>
          </Alert>
          <p className="text-sm text-gray-500">Coordinate: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
          <p className="text-sm text-gray-500 mt-2">La mappa non è disponibile al momento. Riprova più tardi.</p>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="rounded-md overflow-hidden">
        <div className="flex items-center justify-center">
          <Skeleton className="w-full h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md overflow-hidden shadow-sm">
      <div 
        ref={mapContainerRef} 
        className="w-full h-[400px]"
        style={{ borderRadius: '0.375rem' }}
      />
    </div>
  );
}
