document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const themeToggle = document.getElementById('theme-toggle');
    const logoutBtn = document.getElementById('logout-btn');
    let isDarkMode = false;

    // Function to logout
    function logoutFunc() {
        // Remove token from local storage
        localStorage.removeItem('token');
        
        // Redirect to login page after logout
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

    // Send message function
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message) {
            // Create user message bubble
            const userBubble = document.createElement('div');
            userBubble.className = 'bubble user-bubble';
            userBubble.textContent = message;
            chatWindow.appendChild(userBubble);

            // Clear input field
            chatInput.value = '';

            // Scroll down
            scrollToBottom();
            // Simulate bot response or handle error
            simulateBotResponse(message);
        }
    };

    // Simulate bot response or handle error
    const simulateBotResponse = (message) => {
        // Check if service is unavailable (simulated condition, replace with actual logic if needed)
        const isServiceUnavailable = false; // Simulated condition, replace with actual logic if needed

        if (isServiceUnavailable) {
            // Send fallback message
            sendFallbackMessage();
        } else {
            // Send message to server
            fetch('https://ailang-api.up.railway.app/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: message
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Service Unavailable');
                }
                return response.json();
            })
            .then(data => {
                // Handle successful response
                const botBubble = document.createElement('div');
                botBubble.className = 'bubble bot-bubble';
                botBubble.textContent = data.response; // Assuming 'response' is the key in JSON response
                chatWindow.appendChild(botBubble);
                scrollToBottom();
           })
            .catch(error => {
                console.error('Error:', error);
                // Send fallback message if error is 503
                sendFallbackMessage();
            });
        }
    };

    // Function to send fallback message
    const sendFallbackMessage = () => {
        const botBubble = document.createElement('div');
        botBubble.className = 'bubble bot-bubble';
        const fallbackMessage = "Beli baju di Pasar Baru,<br>Pilih warna biru yang cerah.<br>Modelnya sedang dimuat ya kakak,<br>Jadi mohon bersabar.";
        botBubble.innerHTML = fallbackMessage; // Use innerHTML to render HTML tags like <br>
        chatWindow.appendChild(botBubble);
        scrollToBottom();
    };

    // Function to scroll chat window to bottom
    const scrollToBottom = () => {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    // Event listeners
    sendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});