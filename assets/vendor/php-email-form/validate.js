/**
 * PHP Email Form Validation - v3.9
 * URL: https://bootstrapmade.com/php-email-form/
 * Author: BootstrapMade.com
 */
(function () {
  "use strict";

  // Select all forms with the class 'php-email-form'
  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      let thisForm = this;
      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      // Validate form action
      if (!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      // Show loading indicator and hide messages
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // Prepare form data
      let formData = new FormData(thisForm);

      // Handle reCAPTCHA if present
      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function () {
            grecaptcha.execute(recaptcha, { action: 'php_email_form_submit' })
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
              .catch(error => {
                displayError(thisForm, error);
              });
          });
        } else {
          displayError(thisForm, 'The reCaptcha JavaScript API is not loaded!');
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  // Function to handle form submission
  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
        }
        return response.text();
      })
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        if (data.trim() === 'OK') {
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          throw new Error(data || 'Form submission failed with no error message.');
        }
      })
      .catch(error => {
        displayError(thisForm, error);
      });
  }

  // Function to display errors
  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
