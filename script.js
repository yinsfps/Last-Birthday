const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const codeInput = document.getElementById("code");
const nameInput = document.getElementById("name");
const confirmBtn = document.getElementById("confirmBtn");
const userSelectedSeatRow = document.getElementById("user-selected-seat-row");

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

  if (enteredCode && enteredName) {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    
    if (enteredCode === 'YOUR_CODE') {
      const selectedSeatsDisplay = document.createElement("div");
      selectedSeatsDisplay.textContent = `${enteredName}'s Seat: ${selectedSeats.join(', ')}`;
      userSelectedSeatRow.appendChild(selectedSeatsDisplay);

      codeInput.value = '';
      nameInput.value = '';
      localStorage.removeItem("selectedSeats");
    } else {
      alert("Invalid code. Please try again.");
    }
  } else {
    alert("Please enter a valid code and name.");
  }
});

updateSelectedCount();
