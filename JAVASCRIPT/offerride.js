
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

    
    // console.log(fromInput.value);
    const from = fromInput.value;
    const to = toInput.value;
    const seats = seatsInput.value;
    const price = priceInput.value;
    const date = dateInput.value;
    const time = timeInput.value;


    if (!from || !to || !seats || !price || !date || !time) {
      alert(" Please fill all the fields.");
      return;
    }

    let user = JSON.parse(localStorage.getItem("currentUser"));
    let name = user.name;


    const offerRideData = {
      name,
      from,
      to,
      passengers: seats,
      date,
      time,
      price,
      status: "active",
    };

    try {
      const response = await fetch("http://localhost:3000/ride", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerRideData),
      });

      if (!response.ok) {
        throw new Error("Failed to publish ride");
      }

      const data = await response.json();

      console.log("Ride Published Successfully");
      console.log(data);

      alert("Your ride has been published successfully!");

      document
        .querySelectorAll(".offerRide input, .offerRide select")
        .forEach((field) => (field.value = ""));
    } catch (error) {
      console.error(error);
      alert("Error! Make sure json-server is running.");
    }
  });
}
