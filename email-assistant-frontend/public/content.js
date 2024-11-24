function addAIButton() {
    // Find Gmail compose window
    const composeBox = document.querySelector('div[role="textbox"][aria-label="Message Body"]');
    if (!composeBox) return;

    // Check if button already exists
    if (!document.querySelector('#ai-email-button')) {
        // Create button
        const button = document.createElement('button');
        button.id = 'ai-email-button';
        button.innerText = 'Use AI';
        
        // Style the button
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

        // Add hover effect
        button.addEventListener('mouseover', () => {
            button.style.backgroundColor = '#0b5ed7';
        });
        button.addEventListener('mouseout', () => {
            button.style.backgroundColor = '#0d6efd';
        });

        // Handle click
        button.addEventListener('click', () => {
            // Open extension popup
            chrome.runtime.sendMessage({ action: "openPopup" });
        });

        // Add button near compose area
        const toolbarArea = composeBox.closest('table');
        if (toolbarArea) {
            toolbarArea.parentElement.insertBefore(button, toolbarArea);
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