// Content script that runs on FakEye website to sync extension data to localStorage

// Sync extension phishing scan data to website localStorage
async function syncExtensionDataToLocalStorage() {
  try {
    // Get phishing scan history from extension storage
    const data = await chrome.storage.local.get(['phishingScanHistory']);
    
    if (data.phishingScanHistory && data.phishingScanHistory.length > 0) {
      // Get existing website history
      const existingHistory = JSON.parse(localStorage.getItem('ai-detector-history') || '[]');
      
      // Convert extension data to website history format
      const extensionItems = data.phishingScanHistory.map(item => ({
        id: item.id,
        type: 'email',
        timestamp: item.timestamp,
        isAIGenerated: item.isSuspicious, // Treat phishing as "AI generated" threat
        confidence: Math.min(item.score * 10, 100), // Convert score to percentage
        preview: item.subject,
        metadata: {
          subject: item.subject,
          sender: item.sender,
          phishingRisk: item.riskLevel,
          flags: item.flags
        }
      }));
      
      // Merge: add extension items that don't exist in website history
      const existingIds = new Set(existingHistory.map(item => item.id));
      const newItems = extensionItems.filter(item => !existingIds.has(item.id));
      
      if (newItems.length > 0) {
        const mergedHistory = [...newItems, ...existingHistory];
        localStorage.setItem('ai-detector-history', JSON.stringify(mergedHistory));
        
        // Dispatch custom event to notify React app of update
        window.dispatchEvent(new CustomEvent('extension-data-synced', {
          detail: { newItems: newItems.length }
        }));
        
        console.log(`[FakEye Extension] Synced ${newItems.length} email scan(s) to history`);
      }
    }
  } catch (error) {
    console.error('[FakEye Extension] Error syncing data:', error);
  }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'syncData') {
    syncExtensionDataToLocalStorage().then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'getLocalHistory') {
    const history = JSON.parse(localStorage.getItem('ai-detector-history') || '[]');
    sendResponse({ history });
    return true;
  }
});

// Sync on page load
syncExtensionDataToLocalStorage();

// Sync periodically (every 30 seconds)
setInterval(syncExtensionDataToLocalStorage, 30000);

// Listen for storage changes from extension
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.phishingScanHistory) {
    syncExtensionDataToLocalStorage();
  }
});
