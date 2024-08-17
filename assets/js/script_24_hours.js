// Check if a previous countdown exists in localStorage
let countdownDate = localStorage.getItem('countdownDate');

if (!countdownDate) {
    // If no countdown exists, set the time to 24 hours from now and save it in localStorage
    countdownDate = new Date().getTime() + 24 * 60 * 60 * 1000;
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
