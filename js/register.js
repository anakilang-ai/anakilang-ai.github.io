import { handleRegister } from '../js/src/controller.js';

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("register-form");

  // Prevent default form submission and handle registration
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
      handleRegister();
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed. Please try again.');
    }
  });

  // Toggle password visibility
  const showPasswordCheckbox = document.getElementById("show-password");
  showPasswordCheckbox.addEventListener("change", function () {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
  });
});
