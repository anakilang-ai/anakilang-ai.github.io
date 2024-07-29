import { loginHandler } from '../js/src/controller.js';

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loginHandler();
  });
  
  // Menampilkan atau menyembunyikan password
  const showPasswordCheckbox = document.getElementById("show-password");
  showPasswordCheckbox.addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
  });
});
