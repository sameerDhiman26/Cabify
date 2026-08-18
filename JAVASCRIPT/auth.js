document.getElementById("loginForm")?.addEventListener("submit", loginauth);

function loginauth(e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let remember = document.getElementById("remember").checked;

    let savedUser = JSON.parse(localStorage.getItem("USER"));

    if (savedUser == null) {
        alert("Pehle Signup Karo");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {
        alert("Login successful");
        console.log("Remember:", remember);
    } else {
        alert("Invalid email or password");
    }
}

document.getElementById("signupForm")?.addEventListener("submit", signupauth);

function signupauth(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;
    let existingUser = JSON.parse(localStorage.getItem("USER"));

    if (existingUser && existingUser.email === email) {
        alert("User already exists. Please login.");
        return;
    }
    
    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("USER", JSON.stringify(user));

    alert("Signup successful");

    window.location.href = "login.html";
}

