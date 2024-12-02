// Listener for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "OPEN_SETTINGS") {
    chrome.runtime.openOptionsPage();
  }
  return true;
});