
/// <reference types="vite/client" />

// Declare Google Maps namespace to make TypeScript recognize the global google object
declare interface Window {
  google: any;
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(element: HTMLElement, options: any);
    }
    class Marker {
      constructor(options: any);
    }
  }
}
