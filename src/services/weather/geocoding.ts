
// File per le funzioni di geocoding
import { GeoLocation } from './types';

// Function to geocode city name to coordinates
export const geocodeCity = async (city: string): Promise<GeoLocation> => {
  try {
    // Use OpenWeatherMap Geocoding API
    const apiKey = '72547ec8c6cb00d75320173614534a46'; // API key fornita dall'utente
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)},IT&limit=1&appid=${apiKey}`);
    
    if (!response.ok) {
      throw new Error('Geocoding API error');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return { 
        lat: data[0].lat, 
        lng: data[0].lon 
      };
    }
    
    // Fallback to predefined coordinates
    throw new Error('City not found');
  } catch (error) {
    console.error('Geocoding error:', error);
    
    // Fallback to predefined coordinates for common Italian cities
    const cityCoordinates: {[key: string]: GeoLocation} = {
      'Milano': { lat: 45.4642, lng: 9.1900 },
      'Roma': { lat: 41.9028, lng: 12.4964 },
      'Napoli': { lat: 40.8518, lng: 14.2681 },
      'Torino': { lat: 45.0703, lng: 7.6869 },
      'Bologna': { lat: 44.4949, lng: 11.3426 },
      'Firenze': { lat: 43.7696, lng: 11.2558 },
      'Venezia': { lat: 45.4371, lng: 12.3326 },
      'Bergamo': { lat: 45.6983, lng: 9.6773 },
      'Peccioli': { lat: 43.5428, lng: 10.7195 }
    };
    
    return cityCoordinates[city] || { lat: 45.4642, lng: 9.1900 }; // Default to Milan
  }
};
