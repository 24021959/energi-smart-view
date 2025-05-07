
import { useRef, useEffect, useState } from "react";
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
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // Skip if already initialized or if there's an error
    if (mapInitialized || mapError) return;
    
    // Set initialized flag to prevent multiple initialization attempts
    setMapInitialized(true);
    
    const apiKey = 'AIzaSyBz-SCJGkRzZini9Wt2IpgGrGJl-uJTFxI';

    // Function to initialize the map
    const initializeMap = () => {
      if (!mapContainerRef.current || !window.google) {
        console.error("Map container not ready or Google Maps not loaded");
        return;
      }
      
      try {
        // Create a map instance
        const map = new window.google.maps.Map(mapContainerRef.current, {
          center: location,
          zoom: 14,
          mapTypeControl: false,
          fullscreenControl: true,
          streetViewControl: true
        });

        // Add a marker for the city
        new window.google.maps.Marker({
          position: location,
          map: map,
          title: city
        });
        
        setMapLoaded(true);
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Impossibile inizializzare la mappa");
      }
    };

    // Create a unique callback name to avoid conflicts
    const callbackName = `initGoogleMap_${Date.now()}`;
    
    // Define the callback function
    window.initMapForWeather = () => {
      console.log("Google Maps API loaded successfully");
      initializeMap();
    };

    // Check if the script is already loaded
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and add the script element
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMapForWeather&v=weekly`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      setMapError("Impossibile caricare l'API di Google Maps");
    };
    
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the callback
      window.initMapForWeather = undefined;
      
      // Remove script if it exists
      const scriptToRemove = document.getElementById('google-maps-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [city, location, mapInitialized, mapError]);

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
