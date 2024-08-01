import { UrlLogin, URLChat, UrlRegister } from './config.js';

export async function performLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const credentials = { email, password };

  try {
    const response = await fetch(UrlLogin, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    handleLoginResponse(data);
  } catch (error) {
    console.error('Error:', error);
    alert('Login failed. Please try again.');
  }
}


function processLoginResponse(result) {
    if (result.status === "success") {
      alert("Login berhasil");
      document.getElementById("response-message").innerText = result.message;
      // Simpan token dalam cookie
      document.cookie = `token=${result.token}; path=/;`;
      // Redirect ke halaman dashboard atau halaman lainnya
      window.location.href = "chat.html";
    } else {
      alert("Login gagal. Silakan coba lagi.");
    }
  }

export async function handleRegister() {
    const namalengkap = document.getElementById("namalengkap").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmpass = document.getElementById("confirmpassword").value;
    
    const data = { namalengkap, email, password, confirmpass };
    
    try {
      const response = await fetch(UrlRegister, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      processRegisterResponse(result);
    } catch (error) {
      console.error('Error:', error);
      alert('Register gagal. Silakan coba lagi.');
    }
  }

function processRegisterResponse(result) {
    if (result.message === "berhasil mendaftar") {
      alert("Register berhasil");
      document.getElementById("response-message").innerText = result.message;
    //   // Simpan token dalam cookie
    //   document.cookie = `token=${result.token}; path=/;`;
      // Redirect ke halaman dashboard atau halaman lainnya
      window.location.href = "login.html";
    } else {
      alert("Register gagal. Silakan coba lagi.");
    }
  }
  

// Toggle theme between light and dark
export const toggleTheme = (themeToggle, isDarkMode) => {
    document.body.classList.toggle('dark');
    isDarkMode = !isDarkMode;
    themeToggle.textContent = isDarkMode ? '🌞' : '🌙';
    return isDarkMode;
};

// Send message function
export const sendMessage = (chatInput, chatWindow, scrollToBottom, simulateBotResponse) => {
    const message = chatInput.value.trim();
    if (message) {
        // Create user message bubble
        const userBubble = document.createElement('div');
        userBubble.className = 'bubble user-bubble';
        userBubble.textContent = message;
        chatWindow.appendChild(userBubble);

        // Clear input field
        chatInput.value = '';

        // Scroll to bottom
        scrollToBottom();

        // Simulate bot response or handle errors
        simulateBotResponse(message, chatWindow, scrollToBottom);
    }
};

// Simulate bot response or handle errors
export const simulateBotResponse = (message, chatWindow, scrollToBottom) => {
    // Check if service is unavailable (simulated condition, replace with actual logic)
    const isServiceUnavailable = false; // Simulated condition, replace with actual logic if needed

    if (isServiceUnavailable) {
        // Send fallback message
        sendFallbackMessage(chatWindow, scrollToBottom);
    } else {
        // Send message to server
        fetch(URLChat, {
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
            botBubble.textContent = data.answer; // Changed to 'answer' to match the API response
            chatWindow.appendChild(botBubble);
            scrollToBottom();
        })
        .catch(error => {
            console.error('Error:', error);
            // Send fallback message if error is 503
            sendFallbackMessage(chatWindow, scrollToBottom);
        });
    }
};

// Function to send fallback message
export const sendFallbackMessage = (chatWindow, scrollToBottom) => {
    const botBubble = document.createElement('div');
    botBubble.className = 'bubble bot-bubble';
    const fallbackMessage = "Beli baju di Pasar Baru,<br>Pilih warna biru yang cerah.<br>Modelnya sedang dimuat ya kakak,<br>Jadi mohon bersabar.";
    botBubble.innerHTML = fallbackMessage; // Use innerHTML to render HTML tags like <br>
    chatWindow.appendChild(botBubble);
    scrollToBottom();
};

// Function to scroll chat window to bottom
export const scrollToBottom = () => {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
};

// Function to delete a cookie
export const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const handleLogout = () => {
    deleteCookie('token');
    alert('You have successfully logged out.');
    window.location.href = '/';
};