const form = document.querySelector(".form-section");
const day = document.querySelector(".day");
const dayError = document.querySelector(".day-error");
const month = document.querySelector(".month");
const monthError = document.querySelector(".month-error");
const year = document.querySelector(".year");
const yearError = document.querySelector(".year-error");
const emptyFields = document.querySelectorAll(".empty-field");

//reset
function resetForm() {
    form.reset();
  }
  
  let isFormValid=false;
  // Call the resetForm function when the page is loaded
  window.onload = resetForm;
  
  

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    // Parse input values to integers
    const inputDay = parseInt(day.value);
    const inputMonth = parseInt(month.value);
    const inputYear = parseInt(year.value);

    // Validate input values
    let validInput = true;

    if (!day.value.trim()) {
        validInput = false;
        day.parentElement.parentElement.className = "sec error";
        dayError.innerHTML = "Cannot leave empty";
    } else if (isNaN(inputDay) || inputDay <= 0 || inputDay > 31) {
        validInput = false;
        day.parentElement.parentElement.className = "sec error";
        dayError.innerHTML = "Invalid day";
    } else {
        day.parentElement.parentElement.className = "sec";
    }

    if (!month.value.trim()) {
        validInput = false;
        month.parentElement.parentElement.className = "sec error";
        monthError.innerHTML = "Cannot leave empty";
    } else if (isNaN(inputMonth) || inputMonth <= 0 || inputMonth > 12) {
        validInput = false;
        month.parentElement.parentElement.className = "sec error";
        monthError.innerHTML = "Invalid month";
    } else if (
        (inputMonth === 2 && inputDay > 28 && !isLeapYear(inputYear)) || // February in non-leap years
        ((inputMonth === 4 || inputMonth === 6 || inputMonth === 9 || inputMonth === 11) && inputDay > 30) || // April, June, September, November
        (inputDay > 31) // All other months
    ) {
        validInput = false;
        month.parentElement.parentElement.className = "sec error";
        monthError.innerHTML = "Invalid selected month";
    } else {
        month.parentElement.parentElement.className = "sec";
    }

    if (!year.value.trim()) {
        validInput = false;
        year.parentElement.parentElement.className = "sec error";
        yearError.innerHTML = "Cannot leave empty";
    } else if (isNaN(inputYear) || inputYear <= 0 ) {
        validInput = false;
        year.parentElement.parentElement.className = "sec error";
        yearError.innerHTML = "Invalid year";
    } else if(inputYear>currentYear){
        validInput=false;
        year.parentElement.parentElement.className="sec error";
        yearError.innerHTML="Year cannot be in the future";
    }
    else {
        year.parentElement.parentElement.className = "sec";
    }

    if (!validInput) {
        return; // Exit early if input is invalid
    }

// Calculate age
let ageYears = currentYear - inputYear;
let ageMonths = currentMonth - inputMonth;
let ageDays = currentDay - inputDay;

// Adjust age if birth month or day hasn't occurred yet this year
if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--;
    ageMonths += 12;
}

if (ageDays < 0) {
    const daysInPreviousMonth = new Date(inputYear, inputMonth - 1, 0).getDate();
    ageDays += daysInPreviousMonth;
    ageMonths--;
}

// Ensure age is always non-negative
if (ageYears < 0 || ageMonths < 0 || ageDays < 0) {
    ageYears = 0;
    ageMonths = 0;
    ageDays = 0;
}

// Update the empty fields with calculated age
emptyFields[0].textContent = ageYears;
emptyFields[1].textContent = ageMonths;
emptyFields[2].textContent = ageDays;


// Function to check if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
});