// content.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import AIInput from '../src/components/EmailAssistant/AIInput';

function injectAIHelper() {
  // Get compose box
  const composeBox = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
  
  // If no compose box or already injected, return
  if (!composeBox || document.getElementById('ai-email-helper')) return;

  // Create our helper element
  const helper = document.createElement('div');
  helper.id = 'ai-email-helper';
  helper.style.cssText = 'padding: 8px; border-bottom: 1px solid #eee; color: #666;';

  // Create a container for the React component
  const reactContainer = document.createElement('div');
  helper.appendChild(reactContainer);

  // Simple insert before compose box
  composeBox.insertAdjacentElement('beforebegin', helper);

  // Render the AIInput component into the container
  const root = createRoot(reactContainer);
  root.render(<AIInput />);
}

// Watch for DOM changes
const observer = new MutationObserver(() => {
  injectAIHelper();
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Try initial injection
injectAIHelper();