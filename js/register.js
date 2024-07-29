import { handleRegistration } from '../js/src/controller.js';

document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.querySelector("#registration-form");
  registrationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleRegistration();
  });
  // Menampilkan atau menyembunyikan password
  const showPasswordCheckbox = document.getElementById("show-password");
  showPasswordCheckbox.addEventListener("change", function() {
    const passwordField = document.getElementById("password");
    passwordField.type = this.checked ? "text" : "password";
  });
});
