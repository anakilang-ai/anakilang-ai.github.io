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


function handleLoginResponse(data) {
  if (data.status === "success") {
    alert("Login successful");
    document.getElementById("response-message").innerText = data.message;
    document.cookie = `token=${data.token}; path=/;`;
    window.location.href = "chat.html";
  } else {
    alert("Login failed. Please try again.");
  }
}

export async function performRegister() {
  const fullName = document.getElementById("namalengkap").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;

  const registrationData = { namalengkap: fullName, email, password, confirmpass: confirmPassword };

  try {
    const response = await fetch(UrlRegister, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    });

    const data = await response.json();
    handleRegisterResponse(data);
  } catch (error) {
    console.error('Error:', error);
    alert('Registration failed. Please try again.');
  }
}

function handleRegisterResponse(data) {
  if (data.message === "berhasil mendaftar") {
    alert("Registration successful");
    document.getElementById("response-message").innerText = data.message;
    window.location.href = "login.html";
  } else {
    alert("Registration failed. Please try again.");
  }
}

export const toggleTheme = (themeToggle, isDarkMode) => {
  document.body.classList.toggle('dark');
  isDarkMode = !isDarkMode;
  themeToggle.textContent = isDarkMode ? '🌞' : '🌙';
  return isDarkMode;
};

export const sendMessage = (chatInput, chatWindow, scrollToBottom, simulateBotResponse) => {
  const message = chatInput.value.trim();
  if (message) {
    const userBubble = document.createElement('div');
    userBubble.className = 'bubble user-bubble';
    userBubble.textContent = message;
    chatWindow.appendChild(userBubble);

    chatInput.value = '';

    scrollToBottom();

    simulateBotResponse(message, chatWindow, scrollToBottom);
  }
};

// Simulate bot response or handle errors
export const simulateBotResponse = (message, chatWindow, scrollToBottom) => {
  const isServiceDown = false;

  if (isServiceDown) {
    sendFallbackMessage(chatWindow, scrollToBottom);
  } else {
    fetch(URLChat, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: message })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Service Unavailable');
      }
      return response.json();
    })
    .then(data => {
      const botBubble = document.createElement('div');
      botBubble.className = 'bubble bot-bubble';
      botBubble.textContent = data.answer;
      chatWindow.appendChild(botBubble);
      scrollToBottom();
    })
    .catch(error => {
      console.error('Error:', error);
      sendFallbackMessage(chatWindow, scrollToBottom);
    });
  }
};

export const sendFallbackMessage = (chatWindow, scrollToBottom) => {
  const botBubble = document.createElement('div');
  botBubble.className = 'bubble bot-bubble';
  const fallbackMessage = "Beli baju di Pasar Baru,<br>Pilih warna biru yang cerah.<br>Modelnya sedang dimuat ya kakak,<br>Jadi mohon bersabar.";
  botBubble.innerHTML = fallbackMessage;
  chatWindow.appendChild(botBubble);
  scrollToBottom();
};

export const scrollToBottom = () => {
  const chatWindow = document.getElementById('chat-window');
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const handleLogout = () => {
  deleteCookie('token');
  alert('You have successfully logged out.');
  window.location.href = '/';
};