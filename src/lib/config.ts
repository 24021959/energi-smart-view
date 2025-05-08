
// Base path without trailing slash to match vite.config.ts
export const APP_CONFIG = {
  // Base path for the app - matches vite.config.ts base setting
  basePath: '/energi-smart-view',
  
  // Role-specific paths
  paths: {
    login: '/login',
    home: '/',
    notFound: '*',
    
    // Admin paths
    admin: {
      root: '/admin',
      configurations: '/admin/configurations',
      members: '/admin/members',
      plants: '/admin/plants',
      energy: '/admin/energy',
      reports: '/admin/reports',
      settings: '/admin/settings',
      properties: '/admin/properties',
    },
    
    // Consumer paths
    consumer: {
      root: '/consumer',
      bills: '/consumer/bills',
      billUpload: '/consumer/bills/upload',
      consumption: '/consumer/consumption',
      settings: '/consumer/settings',
      help: '/consumer/help',
    },
    
    // Producer paths
    producer: {
      root: '/producer',
      bills: '/producer/bills',
      production: '/producer/production',
    },
    
    // Prosumer paths
    prosumer: {
      root: '/prosumer',
      bills: '/prosumer/bills',
      billUpload: '/prosumer/bills/upload',
    },
  }
};

// Helper for redirects based on role
export const getRedirectPathForRole = (role: string): string => {
  switch(role) {
    case 'cer_manager': return APP_CONFIG.paths.admin.root;
    case 'consumer': return APP_CONFIG.paths.consumer.root;
    case 'producer': return APP_CONFIG.paths.producer.root;
    case 'prosumer': return APP_CONFIG.paths.prosumer.root;
    default: return APP_CONFIG.paths.home;
  }
};

// Helper to get the full path including base path
export const getFullPath = (path: string): string => {
  // Handle edge cases
  if (!path) return APP_CONFIG.basePath;
  
  // Handle potential double slashes when joining paths
  if (path.startsWith('/')) {
    // Remove leading slash from path when joining to avoid double slashes
    return `${APP_CONFIG.basePath}${path}`;
  } else {
    // Add slash between basePath and path
    return `${APP_CONFIG.basePath}/${path}`;
  }
};
