const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const codeInput = document.getElementById("code");
const confirmButton = document.getElementById("confirm");
const nameInput = document.getElementById("name");

populateUI();

let ticketPrice = +movieSelect.value;
let unusedCodes = []; // Array to store unused codes

// Populate the unused codes array (you need to populate this array with the codes you generate)
// Example: unusedCodes = ["ABC123", "DEF456", "GHI789"];

// Function to update the unused codes list
function updateUnusedCodes(usedCode) {
  unusedCodes = unusedCodes.filter(code => code !== usedCode);
  // Update the UI or perform any other necessary actions with the updated unused codes
}

// Save selected movie index, price, and name
function setMovieData(movieIndex, moviePrice, name) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
  localStorage.setItem("selectedName", name);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value, nameInput.value);

  updateSelectedCount();
});

// Confirm button click event
confirmButton.addEventListener("click", () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  if (selectedSeats.length === 1) {
    const seatNumber = [...seats].indexOf(selectedSeats[0]);
    const code = codeInput.value;
    const name = nameInput.value;

    // Check if the code is valid and unused
    if (unusedCodes.includes(code)) {
      // Update the unused codes list
      updateUnusedCodes(code);

      // Save seat data and name
      localStorage.setItem("confirmedSeatNumber", seatNumber);
      localStorage.setItem("confirmedName", name);

      // Update the UI or perform any other necessary actions
      alert(`Seat ${seatNumber + 1} confirmed for ${name}!`);

      // Reset the code input field
      codeInput.value = "";

      // Update the selected count
      updateSelectedCount();
    } else {
      alert("Invalid or already used code. Please try again.");
    }
  } else {
    alert("Please select a single seat to confirm.");
  }
});

// Seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
