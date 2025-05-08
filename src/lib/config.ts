
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
  const basePath = APP_CONFIG.basePath;
  
  switch(role) {
    case 'cer_manager': return `${basePath}${APP_CONFIG.paths.admin.root}`;
    case 'consumer': return `${basePath}${APP_CONFIG.paths.consumer.root}`;
    case 'producer': return `${basePath}${APP_CONFIG.paths.producer.root}`;
    case 'prosumer': return `${basePath}${APP_CONFIG.paths.prosumer.root}`;
    default: return `${basePath}${APP_CONFIG.paths.home}`;
  }
};

// Helper to get the full path including base path
export const getFullPath = (path: string): string => {
  return `${APP_CONFIG.basePath}${path}`;
};
