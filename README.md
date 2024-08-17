Countdown time 24 or 48

with local memory, on refresh the time does not change!


![Countdown_time](https://github.com/user-attachments/assets/ab11850b-8161-4f85-9740-e4e0f17ebc57)


INFO: 

when changing the time in countdown time/assets/jscript_48_hours.js
and visually nothing changes, localStorage is the memory


If you changed the value from 24 to 48 in your JavaScript code, but the timer didn't change because there is already an expiration time stored in localStorage. localStorage retains the previously set value, and this value is used on every page reload, ignoring the new 48 hour setting.

To update the timer to 48 hours, you need to clear the previous value from localStorage or update the code so that it resets the timer if it detects a change.

Method 1: Manually delete localStorage
In the browser's developer console (by pressing F12 or Ctrl+Shift+I), you can run the following command to clear the stored time:

javascript
Copy code
localStorage.removeItem('countdownDate');
After that, reload the page and the new 48 hour value will be set.

Method 2: Reset timer in JavaScript code
If you want to automatically reset the timer when you make changes to your code, you can add a control for this. For example, you can check if the value saved in localStorage corresponds to the desired one, and if not, reset it.

javascript

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
Explanation:
desiredHours: This variable defines the desired duration of the timer (48 hours in this case).
Check and Reset: The code checks if there is an existing timer in localStorage. If it does not exist, if it has already expired, or if it is different from the desired duration, the timer is reset to the new value of 48 hours.



