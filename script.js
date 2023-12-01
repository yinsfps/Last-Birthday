const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const codeInput = document.getElementById("code");
const nameInput = document.getElementById("name");
const confirmBtn = document.getElementById("confirmBtn");

const validCodes = ['asbx', 'yinss', 'notu']; // Add your actual codes here
const usedCodesMap = new Map(); // Map to track used codes and associated names

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

function markCodeAsUsed(enteredCode, enteredName) {
  usedCodesMap.set(enteredCode, enteredName);
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
  const enteredCode = codeInput.value.trim().toLowerCase();
  const enteredName = nameInput.value;

  if (validCodes.includes(enteredCode)) {
    // Code is valid
    if (!usedCodesMap.has(enteredCode)) {
      // Code has not been used before
      const selectedSeats = document.querySelectorAll(".row .seat.selected");
      selectedSeats.forEach(seat => {
        seat.classList.remove("selected");
        seat.classList.add("occupied");
        seat.innerHTML = `<div class="tooltip">${enteredName}</div>`;
      });

      markCodeAsUsed(enteredCode, enteredName);
      updateSelectedCount();
      alert('Ticket confirmed!');
    } else {
      alert('This code has already been used. Please enter a new code.');
    }
  } else {
    alert('Invalid code. Please enter a valid code.');
  }
});

updateSelectedCount();
