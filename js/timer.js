// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;
let TIME_LIMIT = 60;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
const count = document.getElementById("count");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const reset = document.getElementById("reset");
const inputs = document.getElementById("inputs");
const newtimer=document.getElementById("newtimer");
 const errMsg = document.getElementById("blur");
 const message = document.getElementById("message");

// function toggleBlur(){
    
//     errMsg.classList.add("d-none")
//     // count.classList.remove("d-none");
// }

function set(){
   
     TIME_LIMIT = document.getElementById("time").value;
     
     if (TIME_LIMIT <= 0 || TIME_LIMIT=="") {
      errMsg.classList.remove("d-none");
    // count.classList.add("d-none");
      document.getElementById("time").value = "";
     
       return;
     }
     interval = document.getElementById("interval").value;
     if (interval == "minutes") {
       if (TIME_LIMIT < 59) {
         TIME_LIMIT = TIME_LIMIT * 60;
       } else {
        message.textContent="invalid minute(1-59)";
         errMsg.classList.remove("d-none");
        //  count.classList.add("d-none");
         return;
       }
      
     } else if (interval == "hours") {
        
       TIME_LIMIT = TIME_LIMIT * 60 * 60;
     }else if (interval == "seconds"){
        if(TIME_LIMIT>59){
            message.textContent = "invalid seconds(1-59)";
            errMsg.classList.remove("d-none");
            // count.classList.add("d-none");
            return;
        }
     }
       //  errMsg.classList.add("d-none")
       inputs.classList.add("d-none");
    count.classList.add("d-none");
    pause.classList.remove("d-none");
    reset.classList.remove("d-none");
   
    
   
    
    

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
    startNewTimer()
}
function onTimeUp() {
    clearInterval(timerInterval);
    timerInterval = undefined;
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

function startNewTimer(){
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