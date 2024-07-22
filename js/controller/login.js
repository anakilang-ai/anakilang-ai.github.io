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
    xhr.open('POST', 'https://47.236.157.2:443/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var responseMessage = document.getElementById('response-message');
            if (xhr.status === 200) {
                responseMessage.innerHTML = '<div class="alert alert-success" role="alert">Login successful!</div>';
                var responseData = JSON.parse(xhr.responseText);
                console.log("Response Data:", responseData); // Debugging line
                if (responseData.token) {
                    var token = responseData.token;
                    console.log("Token:", token); // Debugging line
                    localStorage.setItem('token', token);
                } else {
                    console.error("Token not found in response");
                }

                // window.location.href = 'chat.html';
            } else {
                responseMessage.innerHTML = '<div class="alert alert-danger" role="alert">Login failed: ' + xhr.responseText + '</div>';
            }
        }
    };

    xhr.send(JSON.stringify({
        email: email,
        password: password
    }));
});
