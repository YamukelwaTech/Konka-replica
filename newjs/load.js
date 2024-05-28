class Countdown {
  constructor() {
    this.count = 10; // Countdown time in seconds
    // Start the countdown interval when the Countdown object is created
    this.countdownInterval = setInterval(() => {
      this.tick(); // Call tick method every second
    }, 1000); // 1000 milliseconds = 1 second
  }

  tick() {
    this.count--; // Decrement countdown every second
    console.log(this.count); // Log the countdown value for debugging
    // If countdown reaches 0, redirect to the specified HTML file and stop the countdown
    if (this.count === 0) {
      this.stop(); // Call stop method to clear the interval
      // Redirect to the specified HTML file after 10 seconds
      window.location.href = "html/signup.html";
    }
  }

  stop() {
    clearInterval(this.countdownInterval); // Clear the countdown interval
  }
}

// Create a new instance of the Countdown class when the page is loaded
window.onload = function () {
  new Countdown();
};
