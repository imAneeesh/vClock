
const timerHook = document.getElementById('timer');

class Timer {
    constructor() {
        this.startTime = null;
        this.timerInterval = null;
    }

    start() {
        if (this.startTime === null) {
            this.startTime = new Date().getTime();
            this.timerInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const elapsedTime = currentTime - this.startTime;
                const seconds = Math.floor(elapsedTime / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);

                const formatedTime = `${ hours }: ${ minutes % 60}: ${ seconds % 60}`;
                timerHook.innerHTML = formatedTime;
    }, 1000);
}
  }

stop() {
    clearInterval(this.timerInterval);
    this.startTime = null;
}

reset() {
    clearInterval(this.timerInterval);
    this.startTime = null;
    console.log('Timer reset.');
}
}

// Example usage
const timer = new Timer();

timer.start(); // Starts the timer

setTimeout(() => {
    timer.stop(); // Stops the timer after 5 seconds
}, 5000);

setTimeout(() => {
    timer.start(); // Restarts the timer after 8 seconds
}, 8000);

setTimeout(() => {
    timer.reset(); // Resets the timer after 12 seconds
}, 12000);