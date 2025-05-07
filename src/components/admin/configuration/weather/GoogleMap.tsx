
import { useRef, useEffect, useState } from "react";
import { GeoLocation } from "@/services/weatherService";
import { Skeleton } from "@/components/ui/skeleton";

export interface GoogleMapProps {
  city: string;
  location: GeoLocation;
}

export function GoogleMap({ city, location }: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // Function to initialize the map
    const initializeMap = () => {
      if (!mapContainerRef.current || !window.google) return;
      
      try {
        // Create a map instance
        mapRef.current = new window.google.maps.Map(mapContainerRef.current, {
          center: location,
          zoom: 10,
          mapTypeControl: false,
          streetViewControl: false
        });

        // Add a marker for the city
        new window.google.maps.Marker({
          position: location,
          map: mapRef.current,
          title: city
        });
        
        setMapLoaded(true);
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError("Impossibile caricare la mappa");
      }
    };

    // Clean up any existing scripts to avoid duplicates
    const existingScript = document.getElementById('google-maps-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Define the global callback function for when the API loads
    window.initMapForWeather = () => {
      initializeMap();
    };

    // Create and add the script element
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBz-SCJGkRzZini9Wt2IpgGrGJl-uJTFxI&callback=initMapForWeather`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setMapError("Impossibile caricare l'API di Google Maps");
    };
    document.head.appendChild(script);

    return () => {
      if (mapRef.current) {
        // Clean up map instance if needed
      }
      
      // Remove the global callback
      window.initMapForWeather = undefined;
      
      // Clean up script
      const scriptToRemove = document.getElementById('google-maps-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [city, location]);

  if (mapError) {
    return (
      <div className="rounded-md overflow-hidden bg-gray-100 flex items-center justify-center h-[400px]">
        <div className="text-center p-4">
          <p className="text-gray-500 mb-2">{mapError}</p>
          <p className="text-sm text-gray-400">Coordinate: {location.lat}, {location.lng}</p>
        </div>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="rounded-md overflow-hidden">
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  return (
    <div className="rounded-md overflow-hidden">
      <div 
        ref={mapContainerRef} 
        className="w-full h-[400px]"
        style={{ borderRadius: '0.375rem' }}
      />
    </div>
  );
}
