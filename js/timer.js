// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
let TIME_LIMIT = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
const countStart = document.getElementById("count");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const reset = document.getElementById("reset");
const inputs = document.getElementById("inputs");
const newtimer = document.getElementById("newtimer");
const errMsg = document.getElementById("blur");

function toggleBlur() {
    errMsg.classList.add("d-none")
    countStart.classList.remove("d-none");
}


function set() {

    const hourInput = document.getElementById("hourInput");
    const minuteInput = document.getElementById("minuteInput");
    const secondInput = document.getElementById("secondInput");

    if (hourInput.value > 0) {
        hours = hourInput.value;
    } else {
        hours = 0;
    }
    if (minuteInput.value > 0) {
        minutes = minuteInput.value;
    } else {
        minutes = 0;
    }
    if (secondInput.value > 0) {
        seconds = secondInput.value;
    } else {
        seconds = 0;
    }
    hours = hours * 60 * 60
    minutes = minutes * 60
    seconds = seconds * 1;
    TIME_LIMIT = hours + minutes + seconds;
    console.log(TIME_LIMIT);
    if (TIME_LIMIT <= 0 || TIME_LIMIT == "") {
        errMsg.classList.remove("d-none");
        countStart.classList.add("d-none");
        hourInput.value = "";
        minuteInput.value = "";
        secondInput.value = "";
        return;
    }
    // interval = document.getElementById("interval").value;
    // if (interval == "minutes") {
    //     if (TIME_LIMIT < 59) {
    //         TIME_LIMIT = TIME_LIMIT;
    //     } else {
    //         message.textContent = "invalid minute(1-59)";
    //         errMsg.classList.remove("d-none");
    //         countStart.classList.add("d-none");

    //         return;
    //     }

    // } else if (interval == "hours") {

    //     TIME_LIMIT = TIME_LIMIT;
    // } else if (interval == "seconds") {
    //     if (TIME_LIMIT > 59) {
    //         message.textContent = "invalid seconds(1-59)";
    //         errMsg.classList.remove("d-none");
    //         countStart.classList.add("d-none");
    //         return;
    //     }
    // }
    //  errMsg.classList.add("d-none")
    inputs.classList.add("d-none");
    countStart.classList.add("d-none");
    pause.classList.remove("d-none");
    reset.classList.remove("d-none");

    // interval = document.getElementById("interval").value;

    // if (interval == "minutes") {
    //     TIME_LIMIT = TIME_LIMIT * 60;
    // }
    // else if (interval == "hours") {
    //     TIME_LIMIT = TIME_LIMIT * 60 * 60;
    // }

    document.getElementById("base-timer-label").innerHTML = formatTime(
        TIME_LIMIT
    );

    timeLeft = TIME_LIMIT;
    timerInterval = null;
    console.log("time left", timeLeft);
    starTimer();
}

const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
};


let timePassed = 0;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
)}</span>
</div>
`;

function onTimesUp() {
    clearInterval(timerInterval);
    timerInterval = undefined;
    startNewTimer()
}
function onTimeUp() {
    clearInterval(timerInterval);
    timerInterval = undefined;
}


function startTimer() {
    countStart.classList.add("d-none");
    timerInterval = setInterval(() => {

        if (TIME_LIMIT == 0) {
            onTimesUp();
            alert("Time Up");
        }
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
            timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
            alert("Time Up");
        }
    }, 1000);
}

function formatTime(time) {
    let hours = Math.floor(time / 3600);
    let remainingSeconds = time % 3600;
    let minutes = Math.floor(remainingSeconds / 60);
    let seconds = remainingSeconds % 60;


    console.log(hours, minutes/2, seconds)

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10 ) {
        minutes = `0${minutes}`;
    }

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(warning.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
            .getElementById("base-timer-path-remaining")
            .classList.remove(info.color);
        document
            .getElementById("base-timer-path-remaining")
            .classList.add(warning.color);
    }
}

function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
}

function starTimer() {
    if (!timerInterval)
        startTimer();
}

function pauseTimer() {

    resume.classList.remove("d-none");
    pause.classList.add("d-none");
    onTimeUp();
}
function resumeTimer() {

    pause.classList.remove("d-none");
    resume.classList.add("d-none");
    if (!timerInterval)
        startTimer();
}

function startNewTimer() {
    window.location.reload();
}
function resetTimer() {
    newtimer.classList.remove("d-none");
    pause.classList.add("d-none");
    resume.classList.remove("d-none");
    if (timerInterval) {
        onTimesUp()
    }
    timePassed = 0;
    timeLeft = TIME_LIMIT;
    timerInterval = null;

    document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);
}