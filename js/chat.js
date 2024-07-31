import { toggleTheme, sendMessage, simulateBotReply, sendFallbackReply, scrollToBottom, handleLogout } from '../js/src/controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('message-area');
    const messageInput = document.getElementById('message-input');
    const sendMsgButton = document.getElementById('send-msg-btn');
    const themeSwitch = document.getElementById('theme-toggle-btn');
    const logoutBtn = document.getElementById('logout-button');
    let darkMode = false;

    // Event handlers
    themeSwitch.addEventListener('click', () => {
        darkMode = toggleTheme(themeSwitch, darkMode);
    });

    sendMsgButton.addEventListener('click', () => {
        sendMessage(messageInput, chatBox, scrollToBottom, simulateBotReply);
    });

    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage(messageInput, chatBox, scrollToBottom, simulateBotReply);
        }
    });

    logoutBtn.addEventListener('click', () => {
        handleLogout();
    });
});
