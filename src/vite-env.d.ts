
/// <reference types="vite/client" />

// Declare Google Maps namespace to make TypeScript recognize the global google object
declare interface Window {
  google: any;
}

declare const google: any;
