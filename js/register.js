import { handleRegistration } from '../js/src/controller.js';

document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.querySelector("#registration-form");
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleRegistration();
  });
  // Toggle password visibility
  const passwordToggle = document.querySelector("#toggle-password");
  passwordToggle.addEventListener("change", () => {
    const passField = document.querySelector("#userpassword");
    passField.type = passwordToggle.checked ? "text" : "password";
  });
});