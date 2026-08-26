let filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn,i) => {
  btn.onclick = async function () {
    let status = btn.dataset.status;
        filterBtns.forEach((b,ind)=>{
                if(ind!=i){
                   b.classList="filter-btn";
                }else{
                    b.classList="filter-btn active";
                }
        })

    let rides = await filterTrips(status);
    draw_Trips(rides);
  };
});
async function getTrips() {
   let  trips = await fetch("http://localhost:3000/ride");
   if(!trips.ok){
    console.log("error in data fetch")
   } 
    let arr = await trips.json();
  console.log(arr)
  return arr;
}

function draw_Trips(rides) {
    let container = document.getElementById("ridesList");

    container.innerHTML = "";

    if (rides.length === 0) {
        container.innerHTML = `<p>No rides found</p>`;
        return;
    }

    rides.forEach((ride) => {
        let card = document.createElement("div");

        card.classList.add("trip-card");
        card.id = ride.id;

        card.innerHTML = `
            <div class="trip-route">
                <h3>${ride.from} → ${ride.to}</h3>
            </div>

            <div class="trip-details">
                <p>Date: ${ride.date}</p>
                <p>Time: ${ride.time}</p>
                <p>Seats: ${ride.passengers}</p>
                <p>Price: ₹${ride.price}</p>
                <p>Status: ${ride.status}</p>
            </div>

        `;
        if(ride.status=="active"){
            card.innerHTML =card.innerHTML +
             `<div class="trip-actions">
                <button 
                type="button"
                    class="cancel-btn"
                    onclick="cancelTrip('${ride.id}')"
                    data-id="${ride.id}">
                    Cancel
                </button>

                <button 
                type="button"
                    class="complete-btn"
                    onclick="completeTrip('${ride.id}')"
                    data-id="${ride.id}">
                    Complete
                </button>
            </div>`
}

        container.appendChild(card);
    });
}

async function filterTrips(status) {
  
    let rides = await getTrips();
    let s_rides = rides.filter((r) => r.status === status)
    return s_rides;
}

async function cancelTrip(id) {
    let res = await fetch(`http://localhost:3000/ride/${id}`,{
        "method":"PATCH",
       headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "cancelled"
        })
    });
    if(res.ok){
        showTrips("active")
    }
}

async function completeTrip(id) {
     let res = await fetch(`http://localhost:3000/ride/${id}`,{
        "method":"PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "completed"
        })
    });
    if(res.ok){
    showTrips("active");
}
}

async function showTrips(status) {
    let rides = await getTrips();
    
   rides = await  filterTrips(status)

    draw_Trips(rides);
}

showTrips("active");