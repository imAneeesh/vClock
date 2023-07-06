// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
let TIME_LIMIT = 60;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
const count = document.getElementById("count");


function set(){
    TIME_LIMIT = document.getElementById("time").value;
    interval=document.getElementById("interval").value;

    if(interval=="minutes"){
        TIME_LIMIT=TIME_LIMIT*60;
    }
    else if(interval=="hours"){
        TIME_LIMIT=TIME_LIMIT*60*60;
    }
    console.log(TIME_LIMIT);1

    timeLeft = TIME_LIMIT;
    document.getElementById("time").value = "";
    timerInterval = null;
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
    count.classList.remove("d-none");

}

function startTimer() {
    count.classList.add("d-none");
    timerInterval = setInterval(() => {

        if(TIME_LIMIT==0){
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
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
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
    onTimesUp();
}
function resumeTimer() {
    console.log(timerInterval);
    if (!timerInterval)
        startTimer();
}
function resetTimer() {
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