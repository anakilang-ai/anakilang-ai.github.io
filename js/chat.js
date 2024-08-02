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
        handleSendMessage();
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    logoutButton.addEventListener('click', () => {
        handleLogout();
    });

    async function handleSendMessage() {
        try {
            sendButton.disabled = true; // Disable send button
            await sendMessage(chatInput, chatWindow, scrollToBottom, simulateBotResponse);
        } catch (error) {
            console.error('Error sending message:', error);
            sendFallbackMessage(chatWindow, scrollToBottom);
        } finally {
            sendButton.disabled = false; // Re-enable send button
        }
    }
});
