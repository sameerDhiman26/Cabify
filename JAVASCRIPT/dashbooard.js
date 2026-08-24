// ==========================================
// GET ALL PAGES
// ==========================================

let homePage = document.querySelector(".homepage");
let tripPage = document.querySelector(".tripPage");
let sidebar = document.querySelector(".sidebar");
let findRide = document.querySelector(".findRide");
let offerRide = document.querySelector(".offerRide");


// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

sidebar.addEventListener("click", (e) => {

    e.preventDefault();

    // Remove active class
    document.querySelectorAll(".menu-item").forEach((menu) => {
        menu.classList.remove("active");
    });


    // HOME
    if (e.target.classList.contains("home-btn")) {

        tripPage.style.display = "none";
        homePage.style.display = "block";
        offerRide.style.display = "none";
        findRide.style.display = "none";                

        e.target.classList.add("active");
    }


    // TRIPS
    if (e.target.classList.contains("trip-btn")) {

        tripPage.style.display = "block";
        homePage.style.display = "none";
        findRide.style.display = "none";
        offerRide.style.display = "none";

        e.target.classList.add("active");
    }


    // FIND RIDE
    if (e.target.classList.contains("find-btn")) {

        findRide.style.display = "block";
        tripPage.style.display = "none";
        homePage.style.display = "none";
        offerRide.style.display = "none";

        e.target.classList.add("active");
    }


    // OFFER RIDE
    if (e.target.classList.contains("offer-btn")) {

        findRide.style.display = "none";
        homePage.style.display = "none";
        tripPage.style.display = "none";
        offerRide.style.display = "block";

        e.target.classList.add("active");
    }

});


// ==========================================
// USER
// ==========================================

let user = localStorage.getItem("USER");
if (user) {
    user = JSON.parse(user);

    // Welcome message
    let welcomeLine = document.getElementById("welcomeLine");
    welcomeLine.innerHTML = `Welcome Back, ${user.name} `;

    // Profile icon
    let str = user.name;
    console.log(str);
    let userIcon = str[0].toUpperCase();
    let profileIcon = document.querySelector(".userIcon");
    profileIcon.innerHTML = userIcon;
}


// ==========================================
// PUBLISH RIDE
// ==========================================
// ==========================================
// PUBLISH RIDE
// ==========================================

let publishBtn = document.querySelector(".publish-btn");

if (publishBtn) {

    publishBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        const fromInput = document.querySelector(".from");
        const toInput = document.querySelector(".to");
        const seatsInput = document.querySelector(".seats");
        const priceInput = document.querySelector(".price");
        const dateInput = document.querySelector(".date");
        const timeInput = document.querySelector(".time");

        if (
            !fromInput ||
            !toInput ||
            !seatsInput ||
            !priceInput ||
            !dateInput ||
            !timeInput
        ) {
            alert("Form elements not found!");
            return;
        }

        const from = fromInput.value.trim();
        const to = toInput.value.trim();
        const seats = seatsInput.value;
        const price = priceInput.value;
        const date = dateInput.value;
        const time = timeInput.value;

        if (!from || !to || !seats || !price || !date || !time) {
            alert(" Please fill all the fields.");
            return;
        }

        const offerRideData = {
            from,
            to,
            passengers: seats,
            date,
            time,
            price
        };

        try {

            const response = await fetch("http://localhost:3000/ride", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(offerRideData)
            });

            if (!response.ok) {
                throw new Error("Failed to publish ride");
            }

            const data = await response.json();

            console.log("Ride Published Successfully");
            console.log(data);

            alert("Your ride has been published successfully!");

            document.querySelectorAll(".offerRide input, .offerRide select")
                .forEach(field => field.value = "");

        } catch (error) {

            console.error(error);
            alert("Error! Make sure json-server is running.");

        }

    });

}