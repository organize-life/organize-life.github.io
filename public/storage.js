// Initialize app state from localStorage
function loadFromStorage() {
  const saved = localStorage.getItem('app-state');
  if (saved) {
    window.state = JSON.parse(saved);
  } else {
    window.state = {days: {}};
  }
}

// Persist state to localStorage and notify other tabs
function saveToStorage() {
  localStorage.setItem('app-state', JSON.stringify(window.state));
  broadcastStateChange();
}

// Notify other tabs of state changes
function broadcastStateChange() {
  const key = 'app_state_change';
  const newValue = Date.now() + '';
  localStorage.setItem('app_state_change', newValue);
  window.dispatchEvent(new StorageEvent('storage', {key, newValue, storageArea: localStorage}));
}

// Set up cross-tab communication
function setupCrossTabSync() {
  window.addEventListener('storage', (event) => {
    if(event.key === 'app_state_change') {
      render();
    }
  });
}
