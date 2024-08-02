import { URLLogin, URLChat, URLRegister } from './config.js';

// Handles user login
export async function handleLogin() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { email, password };

  try {
    const response = await fetch(URLLogin, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    processLoginResponse(result);
  } catch (error) {
    console.error('Error:', error);
    alert('Login failed. Please try again.');
  }
}

// Processes the response after login attempt
function processLoginResponse(result) {
  if (result.status === "success") {
    alert("Login successful");
    document.getElementById("response-message").innerText = result.message;
    // Save token in cookie
    document.cookie = `token=${result.token}; path=/;`;
    // Redirect to chat page
    window.location.href = "chat.html";
  } else {
    alert("Login failed. Please try again.");
  }
}

// Handles user registration
export async function handleRegister() {
  const fullName = document.getElementById("namalengkap").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;

  const data = { fullName, email, password, confirmPassword };

  try {
    const response = await fetch(URLRegister, {
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
    alert('Registration failed. Please try again.');
  }
}

// Processes the response after registration attempt
function processRegisterResponse(result) {
  if (result.message === "Registration successful") {
    alert("Registration successful");
    document.getElementById("response-message").innerText = result.message;
    // Redirect to login page
    window.location.href = "login.html";
  } else {
    alert("Registration failed. Please try again.");
  }
}

// Toggle between light and dark themes
export const toggleTheme = (themeToggle, isDarkMode) => {
  document.body.classList.toggle('dark');
  isDarkMode = !isDarkMode;
  themeToggle.textContent = isDarkMode ? '🌞' : '🌙';
  return isDarkMode;
};

// Sends a message from user to chat window
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
  // Simulated condition for service availability
  const isServiceUnavailable = false; // Replace with actual logic if needed

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
        botBubble.textContent = data.answer; // Use 'answer' to match the API response
        chatWindow.appendChild(botBubble);
        scrollToBottom();
      })
      .catch(error => {
        console.error('Error:', error);
        // Send fallback message if error occurs
        sendFallbackMessage(chatWindow, scrollToBottom);
      });
  }
};

// Function to send fallback message when service is unavailable
export const sendFallbackMessage = (chatWindow, scrollToBottom) => {
  const botBubble = document.createElement('div');
  botBubble.className = 'bubble bot-bubble';
  const fallbackMessage = "Buy a shirt at Pasar Baru,<br>Choose a bright blue color.<br>The model is loading,<br>Please be patient.";
  botBubble.innerHTML = fallbackMessage; // Use innerHTML to render HTML tags like <br>
  chatWindow.appendChild(botBubble);
  scrollToBottom();
};

// Function to scroll chat window to the bottom
export const scrollToBottom = () => {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

// Function to delete a cookie by name
export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Handles user logout
export const handleLogout = () => {
  deleteCookie('token');
  alert('You have successfully logged out.');
  window.location.href = '/';
};
