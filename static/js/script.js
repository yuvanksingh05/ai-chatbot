/**
 * AI CHATBOT - Frontend JavaScript
 * Handles:
 * - Form submission and message sending
 * - Message display and formatting
 * - Chat history management
 * - Clear chat functionality
 * - Loading states and animations
 */

// ============================================
// DOM Elements
// ============================================

// Get references to key DOM elements
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const chatForm = document.getElementById('chatForm');
const clearBtn = document.getElementById('clearBtn');
const loadingIndicator = document.getElementById('loadingIndicator');

// ============================================
// Event Listeners
// ============================================

/**
 * Handle chat form submission
 * Prevents default form behavior and sends the message
 */
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get user message and trim whitespace
    const message = userInput.value.trim();
    
    // Validate message is not empty
    if (!message) {
        return;
    }
    
    // Send the message
    await sendMessage(message);
    
    // Clear input field
    userInput.value = '';
    
    // Focus back on input for better UX
    userInput.focus();
});

/**
 * Handle clear chat button click
 * Confirms before clearing and then clears the chat
 */
clearBtn.addEventListener('click', async () => {
    // Confirm action with user
    if (confirm('Are you sure you want to clear all messages? This action cannot be undone.')) {
        await clearChat();
    }
});

/**
 * Handle Enter key in input field
 * Send message on Enter, allow Shift+Enter for new lines (if needed)
 */
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});

// ============================================
// Main Functions
// ============================================

/**
 * Send user message to the server
 * 
 * @param {string} message - The user's message text
 */
async function sendMessage(message) {
    try {
        // Display user message immediately in the UI
        displayMessage(message, 'user');
        
        // Show loading indicator
        showLoadingIndicator(true);
        
        // Send message to backend
        const response = await fetch('/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        // Parse response JSON
        const data = await response.json();
        
        // Hide loading indicator
        showLoadingIndicator(false);
        
        // Check if request was successful
        if (data.success) {
            // Display bot response
            displayMessage(data.bot_response, 'bot', data.timestamp);
            
            // Scroll to bottom to see latest message
            scrollToBottom();
        } else {
            // Display error message
            displayMessage(
                '❌ Error: ' + (data.error || 'Failed to get response'),
                'bot'
            );
        }
        
    } catch (error) {
        // Log error to console for debugging
        console.error('Error sending message:', error);
        
        // Hide loading indicator
        showLoadingIndicator(false);
        
        // Display user-friendly error message
        displayMessage(
            '❌ Connection error. Please check your internet connection and try again.',
            'bot'
        );
    }
}

/**
 * Display a message in the chat container
 * 
 * @param {string} content - The message content
 * @param {string} type - Message type: 'user' or 'bot'
 * @param {string} timestamp - Optional timestamp for the message
 */
function displayMessage(content, type, timestamp = null) {
    // Create message container div
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    // Use current time if timestamp not provided
    if (!timestamp) {
        timestamp = getCurrentTime();
    }
    
    // Set message avatar based on type
    const avatar = type === 'user' ? '👤' : '🤖';
    
    // Build HTML for the message
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${escapeHtml(content)}</p>
        </div>
        <div class="message-time">${timestamp}</div>
    `;
    
    // Add message to chat container
    chatContainer.appendChild(messageDiv);
    
    // Scroll to bottom to show new message
    scrollToBottom();
}

/**
 * Clear all chat messages
 * Sends request to backend and clears frontend display
 */
async function clearChat() {
    try {
        // Send clear request to backend
        const response = await fetch('/clear_chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        // Parse response
        const data = await response.json();
        
        if (data.success) {
            // Clear all messages from chat container
            chatContainer.innerHTML = '';
            
            // Display welcome message
            displayMessage(
                'Welcome to the AI Chatbot! 👋\n\n' +
                'Hello! I\'m here to help you learn about AI, Machine Learning, Python, and Data Science. ' +
                'Feel free to ask me any questions!',
                'bot'
            );
            
            // Show success feedback
            console.log('Chat cleared successfully');
        } else {
            // Show error message
            alert('Failed to clear chat: ' + (data.error || 'Unknown error'));
        }
        
    } catch (error) {
        console.error('Error clearing chat:', error);
        alert('An error occurred while clearing the chat.');
    }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Scroll chat container to bottom
 * Shows the latest message
 */
function scrollToBottom() {
    // Use setTimeout to ensure DOM has updated
    setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 0);
}

/**
 * Show or hide loading indicator
 * 
 * @param {boolean} show - True to show, false to hide
 */
function showLoadingIndicator(show) {
    if (show) {
        loadingIndicator.style.display = 'flex';
    } else {
        loadingIndicator.style.display = 'none';
    }
}

/**
 * Get current time in HH:MM format
 * 
 * @returns {string} Formatted time string
 */
function getCurrentTime() {
    const now = new Date();
    
    // Format time as HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
}

/**
 * Escape HTML special characters to prevent XSS attacks
 * Converts HTML entities to prevent code injection
 * 
 * @param {string} text - Text to escape
 * @returns {string} Escaped text safe for HTML
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Load chat history when page loads
 * Retrieves and displays previous messages from session
 */
async function loadChatHistory() {
    try {
        const response = await fetch('/get_history');
        const data = await response.json();
        
        if (data.success && data.history.length > 0) {
            // Clear existing messages except welcome
            chatContainer.innerHTML = '';
            
            // Display each message from history
            data.history.forEach(msg => {
                displayMessage(msg.content, msg.type, msg.timestamp);
            });
            
            // Scroll to bottom
            scrollToBottom();
        }
        
    } catch (error) {
        console.error('Error loading chat history:', error);
    }
}

// ============================================
// Initialize on Page Load
// ============================================

/**
 * Run initialization when DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Load previous chat history if available
    loadChatHistory();
    
    // Focus on input field for better UX
    userInput.focus();
    
    // Log initialization
    console.log('AI Chatbot loaded and ready!');
});