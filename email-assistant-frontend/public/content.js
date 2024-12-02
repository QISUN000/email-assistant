// Inject AI icon into Gmail compose
const injectAIIcon = () => {
    const composeBox = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
    if (!composeBox) return;
  
    if (!document.querySelector('#ai-email-icon')) {
      const iconContainer = document.createElement('div');
      iconContainer.id = 'ai-email-icon';
      iconContainer.innerHTML = 'Write emails without a trace of AI';
      
      composeBox.parentElement.insertBefore(iconContainer, composeBox);
    }
  }
  
  // Observer to watch for Gmail compose window
  const observer = new MutationObserver(() => {
    injectAIIcon();
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Initial check
  injectAIIcon();