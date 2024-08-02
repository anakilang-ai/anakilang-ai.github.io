// Import the handleLogin function from the controller module
import { handleLogin } from '../js/src/controller.js';

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select the login form
  const form = document.getElementById("login-form");

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    handleLogin(); // Call the function to handle login
  });

  // Toggle password visibility
  const showPasswordCheckbox = document.getElementById("show-password");
  showPasswordCheckbox.addEventListener("change", function () {
    const passwordField = document.getElementById("password");
    // Change the type of the password field based on the checkbox status
    passwordField.type = this.checked ? "text" : "password";
  });
});
