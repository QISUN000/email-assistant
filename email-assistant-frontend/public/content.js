function addAIButton() {
    const composeBox = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
    if (!composeBox) return;

    if (!document.querySelector('#ai-email-button')) {
        const button = document.createElement('button');
        button.id = 'ai-email-button';
        button.innerText = 'Use AI';
        
        button.style.cssText = `
            background-color: #0d6efd;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin: 5px;
            position: relative;
            font-size: 14px;
        `;

        button.addEventListener('click', () => {
        
            chrome.runtime.sendMessage({ action: "openPopup" });
        });

        try {
        
            composeBox.parentElement.insertBefore(button, composeBox);
        } catch (error) {
      
            composeBox.parentElement.appendChild(button);
        }
    }
}

// Observer to watch for Gmail compose window
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            addAIButton();
        }
    });
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Initial check for compose window
addAIButton();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "insertEmail") {
        const composeBox = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
        if (composeBox && request.email) {
            composeBox.innerHTML = request.email;
            sendResponse({success: true});
        } else {
            sendResponse({success: false});
        }
    }
    return true;
});