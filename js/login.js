import { authenticateUser } from '../js/src/controller.js';

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    authenticateUser();
  });

  // Toggle password visibility
  const passwordVisibilityToggle = document.getElementById("show-password");
  passwordVisibilityToggle.addEventListener("change", () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordVisibilityToggle.checked ? "text" : "password";
  });
});
