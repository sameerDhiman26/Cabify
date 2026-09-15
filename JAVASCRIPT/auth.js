// LOGIN

document.getElementById("loginForm")?.addEventListener("submit", loginauth);

function loginauth(e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(users => {

            let user = users.find(
                user => user.email === email && user.password === password
            );

            if (user) {

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(user)
                );

                alert("Login successful");
                window.location.href = "dashboard.html";

            } else {
                alert("Invalid email or password");
            }
        })
        .catch(error => {
            console.log(error);
            alert("Server error");
        });
}


// SIGNUP

document.getElementById("signupForm")?.addEventListener("submit", signupauth);

function signupauth(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;

    // REGEX

    let nameRegex = /^[A-Za-z ]{2,30}$/;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    // NAME VALIDATION

    if (!nameRegex.test(name)) {
        alert("Name should contain only letters and spaces (2-30 characters).");
        return;
    }


    // EMAIL VALIDATION

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }


    // PASSWORD VALIDATION

    if (!passwordRegex.test(password)) {
        alert(
            "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
        );
        return;
    }


    // CHECK EXISTING USER

    fetch("http://localhost:3000/users")
        .then(response => response.json())
        .then(users => {

            let existingUser = users.find(
                user => user.email === email
            );

            if (existingUser) {
                alert("User already exists. Please log in.");
                return;
            }


            // CREATE USER

            let user = {
                name: name,
                email: email,
                password: password
            };


            // POST USER

            fetch("http://localhost:3000/users", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {

                console.log(data);

                alert("Signup successful");

                showLogin();
            })
            .catch(error => {
                console.log(error);
                alert("Signup failed");
            });

        })
        .catch(error => {
            console.log(error);
            alert("Server error");
        });
}


// LOGOUT

document.getElementById("logoutBtn")?.addEventListener("click", function () {

    localStorage.removeItem("currentUser");

    alert("Logout Successfully!");

    window.location.href = "auth.html";
});


// TOGGLE LOGIN

function showLogin() {

    document.getElementById("loginSection")
        .classList.remove("hidden");

    document.getElementById("signupSection")
        .classList.add("hidden");


    document.getElementById("loginTab")
        .classList.add("active");

    document.getElementById("signupTab")
        .classList.remove("active");
}


// TOGGLE SIGNUP

function showSignup() {

    document.getElementById("signupSection")
        .classList.remove("hidden");

    document.getElementById("loginSection")
        .classList.add("hidden");


    document.getElementById("signupTab")
        .classList.add("active");

    document.getElementById("loginTab")
        .classList.remove("active");
}