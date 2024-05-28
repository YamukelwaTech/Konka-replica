class Countdown {
  constructor() {
    this.count = 10;
    this.countdownInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    this.count--;
    console.log(this.count);
    if (this.count === 0) {
      this.stop();
      window.location.href = "html/signup.html";
    }
  }

  stop() {
    clearInterval(this.countdownInterval);
  }
}

window.onload = function () {
  new Countdown();
};
