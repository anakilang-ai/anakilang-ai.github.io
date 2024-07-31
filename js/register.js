import { registerUser } from '../js/src/controller.js';

document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("register-form");
  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    registerUser();
  });

  // Toggle password visibility
  const togglePasswordCheckbox = document.getElementById("show-password");
  togglePasswordCheckbox.addEventListener("change", () => {
    const passwordInput = document.getElementById("password");
    passwordInput.type = togglePasswordCheckbox.checked ? "text" : "password";
  });
});
