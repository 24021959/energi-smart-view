
import { useRef, useEffect } from "react";
import { GeoLocation } from "@/services/weatherService";

export interface GoogleMapProps {
  city: string;
  location: GeoLocation;
}

export function GoogleMap({ city, location }: GoogleMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Function to initialize the map
    const initializeMap = () => {
      if (!mapContainerRef.current || !window.google) return;
      
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
    };

    // Load the Google Maps script if it's not already loaded
    if (!window.google) {
      // Define the global callback function for when the API loads
      window.initMapForWeather = () => {
        initializeMap();
      };

      // Create and add the script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDyLxXfCSqMuRxNrFJRUOvmi-Fj8cEL3yA&callback=initMapForWeather`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      // If Google Maps is already loaded, just initialize the map
      initializeMap();
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        // Clean up map instance if needed
      }
    };
  }, [city, location]);

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
