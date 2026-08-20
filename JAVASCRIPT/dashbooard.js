let homePage = document.querySelector(".homepage");
let findRidePage = document.querySelector(".findRide");
let sidebar = document.querySelector(".sidebar")


sidebar.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("home-btn")){
        findRidePage.style.display = "none";
        homePage.style.display = "block";
        document.querySelectorAll(".menu-item").forEach((menu)=>{
            menu.classList.remove("active")
        })
         e.target.classList.add("active")
    }
    if(e.target.classList.contains("trip-btn")){
        findRidePage.style.display = "block";
        homePage.style.display = "none";
        document.querySelectorAll(".menu-item").forEach((menu)=>{
            menu.classList.remove("active")
        })
        e.target.classList.add("active")
    }
})

let user = localStorage.getItem("USER");
user = JSON.parse(user);
let welcomeLine = document.getElementById("welcomeLine")
welcomeLine.innerHTML = `Welcome Back, ${user.name} 👋`;

let str = "Sameer";

let chr = str.split("")

let userIcon = chr[0];

let profileIcon = document.querySelector(".userIcon")

profileIcon.innerHTML = userIcon