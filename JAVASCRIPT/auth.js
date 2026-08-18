// -------- LOGIN --------
document.getElementById("loginForm")?.addEventListener("submit", loginauth);

function loginauth(e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let remember = document.getElementById("remember").checked;

    let savedUser = JSON.parse(localStorage.getItem("USER"));

    if (savedUser == null) {
        alert("Please sign up first!");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {
        alert("Login successful");
        console.log("Remember:", remember);
    } else {
        alert("Invalid email or password");
    }
}


// -------- SIGNUP --------
document.getElementById("signupForm")?.addEventListener("submit", signupauth);

function signupauth(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;

    // Regex validation
    let nameRegex = /^[A-Za-z ]{2,30}$/;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!nameRegex.test(name)) {
        alert("Name should contain only letters and spaces (2-30 characters).");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert(
            "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
        );
        return;
    }

    // Check existing user
    let existingUser = JSON.parse(localStorage.getItem("USER"));

    if (existingUser && existingUser.email === email) {
        alert("User already exists. Please log in.");
        return;
    }

    // Save user
    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("USER", JSON.stringify(user));

    alert("Signup successful");
showLogin();
}

// -------- TOGGLE FORMS --------
function showLogin() {
    document.getElementById("loginSection").classList.remove("hidden");
    document.getElementById("signupSection").classList.add("hidden");

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("signupTab").classList.remove("active");
}

function showSignup() {
    document.getElementById("signupSection").classList.remove("hidden");
    document.getElementById("loginSection").classList.add("hidden");

    document.getElementById("signupTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
}