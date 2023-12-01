const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const confirmBtn = document.getElementById("confirmBtn");
const codeInput = document.getElementById("code");
const nameInput = document.getElementById("name");

populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

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

movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

confirmBtn.addEventListener("click", () => {
  const enteredCode = codeInput.value.trim();
  const enteredName = nameInput.value.trim();

  if (isValidCode(enteredCode)) {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    if (selectedSeats.length > 0) {
      const selectedSeat = selectedSeats[0];
      selectedSeat.classList.remove("selected", "occupied");
      selectedSeat.innerText = enteredName;

      disableCode(enteredCode);

      updateSelectedCount();
    } else {
      alert("Please select a seat before confirming.");
    }
  } else {
    alert("Invalid code. Please enter a valid code.");
  }
});

function isValidCode(enteredCode) {
  // Implement your validation logic here
  // For example, check if the entered code is in a predefined list of valid codes
  return true; // Replace with your validation
}

function disableCode(enteredCode) {
  // Implement your logic to disable the code
  // For example, remove the code from the list of valid codes
}
