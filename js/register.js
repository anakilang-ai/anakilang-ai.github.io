import { handleRegister } from '../js/src/controller.js';

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("register-form");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    handleRegister();
  });

  // Menampilkan atau menyembunyikan password
  const showPasswordCheckbox = document.getElementById("show-password");
  showPasswordCheckbox.addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
  });
});
