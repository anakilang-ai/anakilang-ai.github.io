document.getElementById('show-password').addEventListener('change', function() {
    var passwordField = document.getElementById('password');
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});

document.getElementById('submit-btn').addEventListener('click', function() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://47.236.157.2:443/signup', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var responseMessage = document.getElementById('response-message');
            var jsonResponse = JSON.parse(xhr.responseText);

            console.log(xhr.status); // Pastikan status 201 terdeteksi di sini

            if (xhr.status === 201) {
                responseMessage.innerHTML = '<div class="alert alert-success" role="alert">' + jsonResponse.message + '</div>';
                // Clear the input value after successful registration
                document.getElementById('namalengkap').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('confirmpassword').value = '';
            } else {
                responseMessage.innerHTML = '<div class="alert alert-danger" role="alert">Register failed: ' + jsonResponse.message + '</div>';
            }
        }
    };

    // Mengirimkan permintaan dengan data yang telah di-serialize ke format JSON
    xhr.send(JSON.stringify({
        namalengkap: document.getElementById('namalengkap').value,
        email: email,
        password: password,
        confirmpass: document.getElementById('confirmpassword').value
    }));
});
