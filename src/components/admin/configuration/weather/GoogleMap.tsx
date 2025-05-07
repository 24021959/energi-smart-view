
import { useEffect, useRef, useState } from "react";
import { GeoLocation } from "@/services/weatherService";

// Google Maps type declaration
declare global {
  interface Window {
    google: any;
    initMapForWeather: () => void;
  }
}

interface GoogleMapProps {
  city: string;
  location: GeoLocation | null;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyCvR92r28e114VivIzlQHWlLomEJ_gqzJg";

export function GoogleMap({ city, location }: GoogleMapProps) {
  const [mapError, setMapError] = useState<string | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const marker = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Load Google Maps API script
  useEffect(() => {
    if (!googleScriptLoaded) {
      const loadGoogleMapsScript = () => {
        try {
          // Check if script already exists
          const existingScript = document.getElementById('google-maps-script');
          if (existingScript) {
            setGoogleScriptLoaded(true);
            return;
          }
          
          console.log("Loading Google Maps API script for weather map...");
          
          // Define the callback function that will be called when script loads
          window.initMapForWeather = () => {
            console.log("Google Maps script loaded successfully for weather map");
            setGoogleScriptLoaded(true);
          };
          
          const script = document.createElement('script');
          script.id = 'google-maps-script';
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMapForWeather`;
          script.async = true;
          script.defer = true;
          
          scriptRef.current = script;
          document.head.appendChild(script);
        } catch (error) {
          console.error("Error loading Google Maps script:", error);
          setMapError("Errore nel caricamento della libreria di Google Maps");
        }
      };
      
      loadGoogleMapsScript();
    }
    
    return () => {
      // We don't remove the script on unmount as other components might be using it
      // The cleanup will happen in the parent component when switching tabs
    };
  }, [googleScriptLoaded]);
  
  // Initialize map once Google Maps is loaded and we have location
  useEffect(() => {
    if (!location || !mapContainer.current || !googleScriptLoaded) {
      return;
    }
    
    try {
      console.log("Initializing map for location:", location);
      
      if (!window.google || !window.google.maps) {
        console.error("Google Maps API not loaded");
        setMapError("Google Maps API non caricata correttamente");
        return;
      }
      
      // Initialize map
      const position = { lat: location.lat, lng: location.lon };
      
      const googleMap = new window.google.maps.Map(mapContainer.current, {
        center: position,
        zoom: 10,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP
      });
      
      // Add a marker for the city
      const mapMarker = new window.google.maps.Marker({
        position,
        map: googleMap,
        title: city
      });
      
      // Store references
      map.current = googleMap;
      marker.current = mapMarker;
      
      console.log("Map initialized successfully");
      setMapLoaded(true);
      
      // Reset error if previously set
      setMapError(null);
    } catch (error) {
      console.error("Map initialization error:", error);
      setMapLoaded(false);
      setMapError("Errore nell'inizializzazione della mappa: " + (error instanceof Error ? error.message : "Errore sconosciuto"));
    }
  }, [location, city, googleScriptLoaded]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Just remove references to map and marker
      map.current = null;
      marker.current = null;
    };
  }, []);
  
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 z-10"
        id="google-map-container"
      />
      
      {!location && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
          <p>Impossibile caricare la posizione per questa località.</p>
        </div>
      )}
      
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center flex-col bg-gray-100 p-4 z-20">
          <p className="text-red-500 mb-2">{mapError}</p>
        </div>
      )}

      {location && !mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-2"></div>
            <p>Caricamento della mappa in corso...</p>
          </div>
        </div>
      )}
    </div>
  );
}
