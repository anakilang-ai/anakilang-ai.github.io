import { handleLogin } from '../js/src/controller.js';

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    handleLogin();
  });

  // Menampilkan atau menyembunyikan password
  const showPasswordCheckbox = document.getElementById("show-password");
  showPasswordCheckbox.addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
  });
});
