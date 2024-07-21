document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const themeToggle = document.getElementById('theme-toggle');
    const logoutBtn = document.getElementById('logout-btn');
    let isDarkMode = false;

    // Function to logout
    function logoutFunc() {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    // Add event listener to logout button
    logoutBtn.addEventListener('click', logoutFunc);

    // Switch the theme between light and dark
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        isDarkMode = !isDarkMode;
        themeToggle.textContent = isDarkMode ? '🌞' : '🌙';
    });

    // Simulate bot response or handle error
    const simulateBotResponse = async (message) => {
        const isServiceUnavailable = false; // Simulated condition, replace with actual logic if needed

        if (isServiceUnavailable) {
            sendFallbackMessage();
        } else {
            try {
                const response = await fetch('https://ailang-api.up.railway.app/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prompt: message })
                });

                if (!response.ok) {
                    throw new Error('Service Unavailable');
                }

                const data = await response.json();
                createBotBubble(data.response);
                scrollToBottom();
            } catch (error) {
                throw error;
            }
        }
    };

    // Function to send fallback message
    const sendFallbackMessage = () => {
        const botBubble = document.createElement('div');
        botBubble.className = 'bubble bot-bubble';
        const fallbackMessage = "Beli baju di Pasar Baru,<br>Pilih warna biru yang cerah.<br>Modelnya sedang dimuat ya kakak,<br>Jadi mohon bersabar.";
        botBubble.innerHTML = fallbackMessage;
        chatWindow.appendChild(botBubble);
        scrollToBottom();
    };

    // Function to scroll chat window to bottom
    const scrollToBottom = () => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    // Event listeners for sending message
    sendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
