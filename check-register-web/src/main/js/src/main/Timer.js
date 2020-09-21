class Timer {
    constructor(callback, interval) {
        let timerObj = setInterval(callback, interval);
        this.stop = function () {
            if (timerObj) {
                clearInterval(timerObj);
                timerObj = null;
            }
            return this;
        };
        // start timer using current settings (if it's not already running)
        this.start = function () {
            if (!timerObj) {
                this.stop();
                timerObj = setInterval(callback, interval);
            }
            return this;
        };
        // start with new or original interval, stop current interval
        this.reset = function (newInterval = interval) {
            interval = newInterval;
            return this.stop().start();
        };
    }
}

export default Timer
