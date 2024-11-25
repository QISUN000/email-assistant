chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes('mail.google.com')) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    }
});

// Add this to handle openPopup message from content.js
chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === "openPopup") {
        chrome.action.openPopup();
    }
});