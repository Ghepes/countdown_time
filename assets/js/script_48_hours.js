// Check if a previous countdown exists in localStorage
let countdownDate = localStorage.getItem('countdownDate');

// Desired countdown duration in hours (48 in this case)
let desiredHours = 48;
let desiredCountdownDate = new Date().getTime() + desiredHours * 60 * 60 * 1000;

// Check if the stored countdown date is different from the desired countdown date
if (!countdownDate || new Date(parseInt(countdownDate)) < new Date().getTime() || Math.abs(parseInt(countdownDate) - desiredCountdownDate) > 1000) {
    // If no valid countdown exists, set the new countdown time
    countdownDate = desiredCountdownDate;
    localStorage.setItem('countdownDate', countdownDate);
}

let countdownFunction = setInterval(function() {
    let now = new Date().getTime();
    let distance = countdownDate - now;

    // Time calculations for hours, minutes, and seconds
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the corresponding element
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

    // If the countdown is over, clear the interval and reset localStorage
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerText = "EXPIRED";
        localStorage.removeItem('countdownDate');
    }
}, 1000);
