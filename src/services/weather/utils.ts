
// File per funzioni di utilità relative al meteo

// Function to get current day name in Italian
export function getDayNameInItalian(dayOffset = 0) {
  const days = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  const today = new Date();
  today.setDate(today.getDate() + dayOffset);
  return days[today.getDay()];
}

// Helper function to format date in Italian format
export function formatDateInItalian(date: Date): string {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

// Helper function to get wind direction text
export const getWindDirectionText = (degrees: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((degrees % 360) / 45)) % 8;
  return directions[index];
};

// Helper function to describe wind intensity
export function getWindIntensityText(windSpeed: number): string {
  if (windSpeed < 5) return "molto leggero";
  if (windSpeed < 15) return "leggero";
  if (windSpeed < 30) return "moderato";
  if (windSpeed < 50) return "forte";
  return "molto forte";
}

// Helper function to calculate peak sun hours based on weather conditions
export function calculatePeakSunHours(icon: string): number {
  // Peak sun hours vary by weather condition and season
  if (icon.includes('01')) return 5.5; // Clear sky
  if (icon.includes('02')) return 4.5; // Few clouds
  if (icon.includes('03')) return 3.5; // Scattered clouds
  if (icon.includes('04')) return 2.5; // Broken clouds
  if (icon.includes('09')) return 1.5; // Shower rain
  if (icon.includes('10')) return 2.0; // Rain
  if (icon.includes('11')) return 1.0; // Thunderstorm
  if (icon.includes('13')) return 1.0; // Snow
  if (icon.includes('50')) return 2.0; // Mist
  
  // Default for unknown conditions
  return 3.0;
}
