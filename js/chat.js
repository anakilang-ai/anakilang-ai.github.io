// chat.js
import { toggleTheme, sendMessage, simulateBotResponse, sendFallbackMessage, scrollToBottom, handleLogout } from '../js/src/controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const themeToggle = document.getElementById('theme-toggle');
    const logoutButton = document.getElementById('logout-btn');
    let isDarkMode = false;

    // Event listeners
    themeToggle.addEventListener('click', () => {
        isDarkMode = toggleTheme(themeToggle, isDarkMode);
    });

    sendButton.addEventListener('click', () => {
        try {
            sendMessage(chatInput, chatWindow, scrollToBottom, simulateBotResponse);
        } catch (error) {
            console.error('Error sending message:', error);
            sendFallbackMessage(chatWindow); // Handle errors gracefully
        }
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new lines
            try {
                sendMessage(chatInput, chatWindow, scrollToBottom, simulateBotResponse);
            } catch (error) {
                console.error('Error sending message:', error);
                sendFallbackMessage(chatWindow); // Handle errors gracefully
            }
        }
    });

    logoutButton.addEventListener('click', () => {
        try {
            handleLogout();
        } catch (error) {
            console.error('Error handling logout:', error);
            // Optionally handle errors related to logout
        }
    });
});
