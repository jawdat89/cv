// src/utils/serviceWorker.ts

/**
 * Utility functions to handle service worker cleanup and prevent precaching
 */

export const unregisterServiceWorkers = async (): Promise<void> => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Service worker unregistered:', registration.scope);
      }
    } catch (error) {
      console.error('Error unregistering service workers:', error);
    }
  }
};

export const clearServiceWorkerCaches = async (): Promise<void> => {
  if ('caches' in window) {
    try {
      const cacheNames = await caches.keys();
      for (const cacheName of cacheNames) {
        await caches.delete(cacheName);
        console.log('Cache deleted:', cacheName);
      }
    } catch (error) {
      console.error('Error clearing caches:', error);
    }
  }
};

export const disableServiceWorkers = async (): Promise<void> => {
  await unregisterServiceWorkers();
  await clearServiceWorkerCaches();
  console.log('Service workers disabled and caches cleared');
};

// Prevent service worker registration
export const preventServiceWorkerRegistration = (): void => {
  if ('serviceWorker' in navigator) {
    // Override the register method to prevent registration
    navigator.serviceWorker.register = function() {
      console.log('Service worker registration blocked');
      return Promise.reject(new Error('Service worker registration is disabled'));
    };
  }
};
