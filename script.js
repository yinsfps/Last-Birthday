const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const codeInput = document.getElementById("code");
const nameInput = document.getElementById("name");
const confirmBtn = document.getElementById("confirmBtn");

const validCodes = ['asbx', 'yinss', 'notu']; // Add your actual codes here

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

function markCodeAsUsed(enteredCode) {
  const enteredCodeIndex = validCodes.indexOf(enteredCode);
  if (enteredCodeIndex !== -1) {
    validCodes.splice(enteredCodeIndex, 1); // Remove the used code
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
  const enteredCode = codeInput.value.trim().toUpperCase();
  const enteredName = nameInput.value;

  if (validCodes.map(code => code.toUpperCase()).includes(enteredCode)) {
    // Code is valid, proceed with seat selection logic
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    selectedSeats.forEach(seat => {
      seat.classList.remove("selected");
      seat.classList.add("occupied");
      seat.innerHTML = `<div class="tooltip">${enteredName}</div>`;
    });

    markCodeAsUsed(enteredCode);
    updateSelectedCount();
    alert('Ticket confirmed!');
  } else {
    alert('Invalid code. Please enter a valid code.');
  }
});

updateSelectedCount();
