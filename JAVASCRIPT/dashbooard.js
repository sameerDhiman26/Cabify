// ==========================================
// GET ALL PAGES
// ==========================================

let homePage = document.querySelector(".homepage");
let tripPage = document.querySelector(".tripPage");
let sidebar = document.querySelector(".sidebar");
let findRide = document.querySelector(".findRide");
let offerRide = document.querySelector(".offerRide");
let settingsPage = document.querySelector(".settingsPage");
let messagePage = document.querySelector(".messagePage");
let walletPage = document.querySelector(".walletPage");
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
    settingsPage.style.display = "none";
    messagePage.style.display = "none";
    walletPage.style.display = "none";
    e.target.classList.add("active");
  }

  // TRIPS
  if (e.target.classList.contains("trip-btn")) {
    tripPage.style.display = "block";
    homePage.style.display = "none";
    findRide.style.display = "none";
    offerRide.style.display = "none";
    settingsPage.style.display = "none";
    messagePage.style.display = "none";
    walletPage.style.display = "none";
    e.target.classList.add("active");
  }

  // FIND RIDE
  if (e.target.classList.contains("find-btn")) {
    findRide.style.display = "block";
    tripPage.style.display = "none";
    homePage.style.display = "none";
    offerRide.style.display = "none";
    settingsPage.style.display = "none";
    messagePage.style.display = "none";
    walletPage.style.display = "none";
    e.target.classList.add("active");
  }

  // OFFER RIDE
  if (e.target.classList.contains("offer-btn")) {
    findRide.style.display = "none";
    homePage.style.display = "none";
    tripPage.style.display = "none";
    offerRide.style.display = "block";
    settingsPage.style.display = "none";
    messagePage.style.display = "none";
    walletPage.style.display = "none";
    e.target.classList.add("active");
  }

  if (e.target.classList.contains("settings-btn")) {
    homePage.style.display = "none";
    tripPage.style.display = "none";
    findRide.style.display = "none";
    offerRide.style.display = "none";
    settingsPage.style.display = "block";
    messagePage.style.display = "none";
    walletPage.style.display = "none";
    e.target.classList.add("active");
  }
  if (e.target.classList.contains("message-btn")) {
    homePage.style.display = "none";
    tripPage.style.display = "none";
    findRide.style.display = "none";
    offerRide.style.display = "none";
    settingsPage.style.display = "none";
    walletPage.style.display = "none";

    messagePage.style.display = "block";

    e.target.classList.add("active");
  }
  if (e.target.classList.contains("wallet-btn")) {
    homePage.style.display = "none";
    tripPage.style.display = "none";
    findRide.style.display = "none";
    offerRide.style.display = "none";
    settingsPage.style.display = "none";
    messagePage.style.display = "none";

    walletPage.style.display = "block";

    e.target.classList.add("active");
  }
});

homePage.addEventListener("click",(e)=>{
  e.preventDefault();

  if (e.target.classList.contains("find-btn")) {
    findRide.style.display = "block";
    tripPage.style.display = "none";
    homePage.style.display = "none";
    offerRide.style.display = "none";
    settingsPage.style.display = "none";
    messagePage.style.display = "none";
walletPage.style.display = "none";
    // e.target.classList.add("active");
  }

  if (e.target.classList.contains("offer-btn")) {
    findRide.style.display = "none";
    homePage.style.display = "none";
    tripPage.style.display = "none";
    offerRide.style.display = "block";
    settingsPage.style.display = "none";
    messagePage.style.display = "none";
walletPage.style.display = "none";
    // e.target.classList.add("active");
  }
})

// ==========================================
// USER
// ==========================================

let user = localStorage.getItem("currentUser");
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
