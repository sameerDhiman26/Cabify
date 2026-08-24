let homePage = document.querySelector(".homepage");

let tripPage = document.querySelector(".tripPage");
let sidebar = document.querySelector(".sidebar");
let findRide = document.querySelector(".findRide");


sidebar.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("home-btn")){
        tripPage.style.display = "none";
        homePage.style.display = "block";

        findRide.style.display = "none";
        document.querySelectorAll(".menu-item").forEach((menu)=>{
            menu.classList.remove("active")
        })
         e.target.classList.add("active")
    }
    if(e.target.classList.contains("trip-btn")){
        tripPage.style.display = "block";
        homePage.style.display = "none";
        findRide.style.display = "none";
        document.querySelectorAll(".menu-item").forEach((menu)=>{
            menu.classList.remove("active")
        })
        e.target.classList.add("active")
    }
    if(e.target.classList.contains("find-btn")){
        findRide.style.display = "block";
        tripPage.style.display = "none";
        homePage.style.display = "none";
        offerRide.style.display = "none";
        document.querySelectorAll(".menu-item").forEach((menu)=>{
            menu.classList.remove("active")
        })
        e.target.classList.add("active")
    }

    if(e.target.classList.contains("offer-btn")){
        findRidePage.style.display = "none";
        homePage.style.display = "none";
        offerRide.style.display = "block";
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


let str = user.name;
console.log(str)
let userIcon = str[0];
let profileIcon = document.querySelector(".userIcon")
profileIcon.innerHTML = userIcon;
