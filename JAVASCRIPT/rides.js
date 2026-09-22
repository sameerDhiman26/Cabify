

async function getRides() {
    let response = await fetch("http://localhost:3000/ride")
    let data = await response.json()

    return data;
}




// async function showRides(){


// let RideData =await getRides()

// console.log(RideData);

// let cardContainer = document.getElementById("card-container")

// RideData.forEach((e)=>{


//     let card = document.createElement("div");
//     card.classList.add("findride-card");
//     // let userIcon = document.createElement("div");
//     // userIcon.classList.add("userIcon-card");

//     // card.appendChild(userIcon);

//     let userIcon = e.name[0];
//     console.log(e.name);

//     card.innerHTML = `
//     <div class="userDetails">
//     <div class="userIcon-card">${userIcon}</div>
//     <h2 class="name">${e.name}</h2>
//     </div>
//     <div class="from-card">
//     <p>From</p>
//     <div class="icon-card">
//     <i class="fa-solid fa-circle-dot"></i>
//     <h2 class="from">${e.from}</h2>
//     </div>
//     </div>
//     <div>
//     <i class="fa-solid fa-ellipsis-vertical"></i>
//     </div>
//     <div class="to-card">
//     <p>To</p>
//     <div class="icon-card">
//     <i class="fa-solid fa-location-dot"></i>
//     <h2 class="to">${e.to}</h2>
//     </div>
//     </div>

//     <div class="divider"></div>

//     <div class="other-details-card">
//     <div class="other-details">
//     <i class="fa-solid fa-calendar"></i>
//     <h2 class="date">${e.date}</h2>
//     </div>
//     <div class="other-details">
//     <i class="fa-solid fa-clock"></i>
//     <h2 class="time">${e.time}</h2>
//     </div>
//     <div class="other-details">
//     <i class="fa-solid fa-user-group"></i>
//     <h2 class="passengers">${e.passengers}</h2>
//     </div>
//     </div>
//     <div class="divider"></div>
//     <div class="bottom-card">
//     <div class="price-card">
//     <p>Price</p>
//     <h2 class="price">₹${e.price}</h2>
//     </div>
//     <button type="submit" class="search-button">
//     <i class="fa-solid fa-magnifying-glass"></i>
//     Find Rides
//     </button>
//     </div>
//     `;

//     cardContainer.appendChild(card);



// })
// }

async function showRides() {

    let RideData = await getRides();

    console.log(RideData);

    displayRides(RideData);
}

showRides();




let findRideBtn = document.querySelector(".search-button");

async function searchRide() {
    // let findRideBtn = document.getElementById("findRideBtn");

    findRideBtn.addEventListener("click", async (e) => {

        e.preventDefault();

        const from = document
            .getElementById("from")
            .value
            .trim()
            .toLowerCase();

        const to = document
            .getElementById("to")
            .value
            .trim()
            .toLowerCase();

        const date = document
            .getElementById("date")
            .value;

        const time = document
            .getElementById("time")
            .value;

        const passengers = Number(
            document.querySelector(".passenger-select").value
        );


        const rides = await getRides();


        const filteredRides = rides.filter((ride) => {

            return (
                ride.status === "active" &&
                ride.from.trim().toLowerCase() === from &&
                ride.to.trim().toLowerCase() === to &&
                ride.date === date &&
                ride.time === time &&
                Number(ride.passengers) >= passengers
            );

        });


        console.log("Filtered rides:", filteredRides);


        displayRides(filteredRides);

    });


}

searchRide();

function displayRides(RideData) {

    let cardContainer = document.getElementById("card-container");

    // Remove previous cards
    cardContainer.innerHTML = "";

    const availableRides = RideData.filter(
        ride => ride.status === "active"
    );

    availableRides.forEach((e) => {

        let card = document.createElement("div");
        card.classList.add("findride-card");

        let userIcon = e.name[0];

        card.innerHTML = `
        
       <div class="userDetails"> <div class="userIcon-card">${userIcon}</div> <h2 class="name">${e.name}</h2> </div> <div class="from-card"> <p>From</p> <div class="icon-card"> <i class="fa-solid fa-circle-dot"></i> <h2 class="from">${e.from}</h2> </div> </div> <div> <i class="fa-solid fa-ellipsis-vertical"></i> </div> <div class="to-card"> <p>To</p> <div class="icon-card"> <i class="fa-solid fa-location-dot"></i> <h2 class="to">${e.to}</h2> </div> </div> <div class="divider"></div> <div class="other-details-card"> <div class="other-details"> <i class="fa-solid fa-calendar"></i> <h2 class="date">${e.date}</h2> </div> <div class="other-details"> <i class="fa-solid fa-clock"></i> <h2 class="time">${e.time}</h2> </div> <div class="other-details"> <i class="fa-solid fa-user-group"></i> <h2 class="passengers">${e.passengers}</h2> </div> </div> <div class="divider"></div> <div class="bottom-card"> <div class="price-card"> <p>Price</p> <h2 class="price">₹${e.price}</h2> </div>
        <button type="submit" class="search-button" onclick="acceptRide('${e.id}')">
         <i class="fa-solid fa-magnifying-glass"></i>
          Get Ride 
          </button> 
          </div>
        `;

        cardContainer.appendChild(card);
    });
}

async function acceptRide(id) {

    try {

        const response = await fetch(
            `http://localhost:3000/ride/${id}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status: "booked"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to book ride");
        }

        const updatedRide = await response.json();

        console.log("Ride booked:", updatedRide);

        alert("Ride booked successfully!");

        // Refresh Find Ride page
        showRides();

    } catch (error) {

        console.error(error);

        alert("Something went wrong while booking the ride.");

    }
}