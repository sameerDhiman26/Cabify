

async function getRides(){
    let response = await fetch("http://localhost:3000/ride")
    let data = await response.json()

    return data;
}


async function showRides(){
let RideData =await getRides()

console.log(RideData);

let cardContainer = document.getElementById("card-container")

RideData.forEach((e)=>{
    
    let card = document.createElement("div");
    card.classList.add("findride-card");
    // let userIcon = document.createElement("div");
    // userIcon.classList.add("userIcon-card");

    // card.appendChild(userIcon);
    let userIcon = e.name[0];

    card.innerHTML = `
    <div class="userDetails">
    <div class="userIcon-card">${userIcon}</div>
    <h2 class="name">${e.name}</h2>
    </div>
    <div class="from-card">
    <p>From</p>
    <div class="icon-card">
    <i class="fa-solid fa-circle-dot"></i>
    <h2 class="from">${e.from}</h2>
    </div>
    </div>
    <div>
    <i class="fa-solid fa-ellipsis-vertical"></i>
    </div>
    <div class="to-card">
    <p>To</p>
    <div class="icon-card">
    <i class="fa-solid fa-location-dot"></i>
    <h2 class="to">${e.to}</h2>
    </div>
    </div>

    <div class="divider"></div>

    <div class="other-details-card">
    <div class="other-details">
    <i class="fa-solid fa-calendar"></i>
    <h2 class="date">${e.date}</h2>
    </div>
    <div class="other-details">
    <i class="fa-solid fa-clock"></i>
    <h2 class="time">${e.time}</h2>
    </div>
    <div class="other-details">
    <i class="fa-solid fa-user-group"></i>
    <h2 class="passengers">${e.passengers}</h2>
    </div>
    </div>
    <div class="divider"></div>


    <div class="bottom-card">
    <div class="price-card">
    <p>Price</p>
    <h2 class="price">₹${e.price}</h2>
    </div>
    <button type="submit" class="search-button">
    <i class="fa-solid fa-magnifying-glass"></i>
    Find Rides
    </button>
    </div>
    `;

    cardContainer.appendChild(card)
    
})
}

showRides()