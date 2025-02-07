// This file will be built separately and served as a standalone script
// that can be embedded in BigCommerce

declare global {
  interface Window {
    BracketConfigurator: {
      init: (containerId: string, config: any) => void;
    };
  }
}

export function initBracketConfigurator(containerId: string, config: any) {
  // Initialize the configurator in the specified container
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id ${containerId} not found`);
    return;
  }

  // Create an iframe to load the configurator
  const iframe = document.createElement('iframe');
  iframe.style.width = '100%';
  iframe.style.height = '600px';
  iframe.style.border = 'none';
  
  // Set the source to your hosted configurator with the necessary parameters
  const params = new URLSearchParams({
    productId: config.productId,
    storeHash: config.storeHash,
    // Add other necessary configuration parameters
  });
  
  iframe.src = `${config.configuratorUrl}?${params}`;
  container.appendChild(iframe);

  // Handle messages from the iframe
  window.addEventListener('message', (event) => {
    if (event.origin !== config.configuratorUrl) return;
    
    if (event.data.type === 'ADD_TO_CART') {
      // Handle adding to BigCommerce cart
      fetch('/api/bigcommerce/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event.data.item),
      });
    }
  });
}

// Expose the initialization function globally
window.BracketConfigurator = {
  init: initBracketConfigurator,
};
