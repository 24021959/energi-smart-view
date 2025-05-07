
import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card } from '@/components/ui/card';

// Declare the global initMapForWeather function
declare global {
  interface Window {
    initMapForWeather: () => void;
  }
}

interface GoogleMapProps {
  city: string;
  province: string;
}

export function GoogleMap({ city, province }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef<boolean>(false);
  
  useEffect(() => {
    let map: google.maps.Map | null = null;
    
    // Define the callback function for the Google Maps API
    window.initMapForWeather = () => {
      if (!mapRef.current) return;
      
      // Create a map centered on the given city
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: `${city}, ${province}, Italy` }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          
          map = new google.maps.Map(mapRef.current!, {
            center: location,
            zoom: 13,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
          });
          
          // Add a marker for the city
          new google.maps.Marker({
            position: location,
            map,
            title: city
          });
        }
      });
    };
    
    // Load the Google Maps API if it's not already loaded
    if (!window.google || !window.google.maps) {
      if (!scriptLoadedRef.current) {
        scriptLoadedRef.current = true;
        const loader = new Loader({
          apiKey: 'AIzaSyBnLrQTSxRaWSL3VaqdiJXHcDzAT3fg1g8',
          version: 'weekly',
          libraries: ['places']
        });
        
        loader.load().then(() => {
          window.initMapForWeather();
        }).catch(e => {
          console.error('Error loading Google Maps API:', e);
        });
      }
    } else {
      // API is already loaded
      window.initMapForWeather();
    }
    
    // Cleanup function
    return () => {
      // No need to remove the script as we're using the loader
    };
  }, [city, province]);
  
  return (
    <Card>
      <div 
        ref={mapRef} 
        className="h-[300px] w-full rounded-md"
        style={{ height: '300px', width: '100%' }}
      ></div>
    </Card>
  );
}
