// Initial References
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
const main = document.getElementById("main");
let isRepeat = false;
let count = 0;
let alarmsArray = [];
let alarmSound = new Audio('./js/audio.wav');
let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;
let daysOfWeek = [];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

// Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;appendZero
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

let notificationCount = 0;


repeatCheckbox.addEventListener("click", () => {
  main.style.opacity=0.3;
  main.style.pointerEvents="none";

});

cancel.addEventListener("click", () => {
  main.style.opacity=1;
  main.style.pointerEvents="auto";
});



// Display Time
function displayTimer() {
  let date = new Date();
  console.log(date)
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];
  const hour = hours % 12;
  const hour12 = hour ? hour : 12;
  const minute = minutes < 10 ? '0' + minutes : minutes;
  const second = seconds < 10 ? '0' + seconds : seconds;

  if (hours >= 12) {
    AMPM = 'PM';
  }
  else {
    AMPM = 'AM';
  }
console.log(AMPM)
  // Check for alarms
  alarmsArray.forEach((alarm, index) => {
    console.log(alarm);
    if (alarm.isActive) {
      if(alarm.isRepeat==false){
        if (alarm.alarmHour == hour12 && alarm.alarmMinute == minute && alarm.amPM == AMPM ) {
          console.log("alarm is ringing");
          alarmSound.play();
          while (notificationCount < 1) {
            const notification = new Notification("Alarm", {
              body: "Alarm is ringing",
              icon: "../assets/logo.png",
            });
            notificationCount++;
            notification.onclick = (e) => {
              window.location.href = "https://imaneeesh.github.io/vClock";
            };
          }
        } 
      }
      else if(alarm.isRepeat == true){
        if (alarm.alarmHour == hour12 && alarm.alarmMinute == minute && alarm.amPM == AMPM && alarm.daysOfWeek.includes(days[date.getDay()])) {
          alarmSound.play();
          while (notificationCount < 1) {
            const notification = new Notification("Alarm", {
              body: "Alarm is ringing",
              icon: "../assets/logo.png",
            });
            notificationCount++;
            notification.onclick = (e) => {
              window.location.href = "https://imaneeesh.github.io/vClock";
            };
          }
        } 
      // console.log(count);
      }
    }
  });
}

const inputCheck = (inputValue) => {
  inputValue = parseInt(inputValue);
  if (inputValue < 10) {
    inputValue = appendZero(inputValue);
  }
  return inputValue;
};

hourInput.addEventListener("input", () => {
  hourInput.value = inputCheck(hourInput.value);
});

minuteInput.addEventListener("input", () => {
  minuteInput.value = inputCheck(minuteInput.value);
});

// Create alarm div
const createAlarm = (alarmObj) => {
  // Keys from object
  const { id, alarmHour, alarmMinute } = alarmObj;
  // Alarm div
  let alarmDiv = document.createElement("div");
  alarmDiv.classList.add("alarm");
  alarmDiv.setAttribute("data-id", id);
  alarmDiv.innerHTML = `<span>${alarmHour}: ${alarmMinute}</span>`;


  // span If Once

  if (alarmObj.isRepeat == false){
    const Repeatspan = document.createElement("span");
    Repeatspan.classList.add("repeat");
    Repeatspan.innerHTML = "Today";
    Repeatspan.style.color = "#00d300";
    Repeatspan.style.fontWeight = "bold";
    Repeatspan.style.width= "150px";
    Repeatspan.style.textAlign= "center";
    alarmDiv.appendChild(Repeatspan);
  }else{
    // =============================================
    // Display Actiavted days
    const span = document.createElement("span");
    span.classList.add("days");
    const All_Days_Array = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const firstTwoLettersArray = [];
    alarmObj.daysOfWeek.forEach(function (element) {
      const firstTwoLetters = element.substring(0, 2);
      firstTwoLettersArray.push(firstTwoLetters);
    });
    const myspan = document.createElement("span");
    myspan.classList.add("mydays");

    All_Days_Array.forEach(function (letter) {
      const spanElement = document.createElement("span");
      spanElement.classList.add("days");
      if (firstTwoLettersArray.includes(letter)) {
        console.log(letter)
        spanElement.style.color = "#00d300";
        spanElement.style.fontWeight = "bold";
      }
      else {
        console.log(letter)
        spanElement.style.color = "gray";
        spanElement.style.fontWeight = "bold";
      }
      spanElement.innerHTML = letter.charAt(0);
      span.appendChild(spanElement);
    });

    alarmDiv.appendChild(span);
  }


  // ========================================


  // Checkbox
  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  if(alarmObj.isActive==true){
    checkbox.setAttribute("checked", "checked");
  }else{
    checkbox.removeAttribute("checked");
  }



  checkbox.addEventListener("click", (e) => {
    if (e.target.checked) {
      notificationCount = 0;
      startAlarm(e);
    } else {
      stopAlarm(e);
    }
  });
  alarmDiv.appendChild(checkbox);
  // Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", (e) => deleteAlarm(e));
  alarmDiv.appendChild(deleteButton);
  activeAlarms.appendChild(alarmDiv);
};

// Set Alarm
setAlarm.addEventListener("click", () => {

  console.log(daysOfWeek);
  if(daysOfWeek.length == 0){
    isRepeat = false;
  }else{
    isRepeat = true;
  }
  const amPM = document.getElementById('amPM').value;
  alarmIndex += 1;
  // Alarm Object
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.amPM = amPM; 
  alarmObj.isActive = false;
  alarmObj.daysOfWeek = daysOfWeek;
  alarmObj.isRepeat = isRepeat;
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  console.log(alarmsArray);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
  localStorage.setItem("alarms", JSON.stringify(alarmsArray));
  daysOfWeek = [];

  // Save to local storage

});

// Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
    // Save to local storage
    localStorage.setItem("alarms", JSON.stringify(alarmsArray));
  }
};

// Stop alarm
const stopAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = false;
    alarmSound.pause();
    // Save to local storage
    localStorage.setItem("alarms", JSON.stringify(alarmsArray));
  }
};

// Delete alarm
const deleteAlarm = (e) => {
  let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    e.target.parentElement.parentElement.remove();
    alarmsArray.splice(index, 1);
    // Save to local storage
    localStorage.setItem("alarms", JSON.stringify(alarmsArray));
  }
};

window.onload = () => {
  // Retrieve alarms from local storage
  const storedAlarms = localStorage.getItem("alarms");
  if (storedAlarms) {
    alarmsArray = JSON.parse(storedAlarms);
    alarmsArray.forEach((alarmObj) => createAlarm(alarmObj));
  }

  setInterval(displayTimer, 1000);
  initialHour = 0;
  initialMinute = 0;
  alarmIndex = alarmsArray.length;
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);
};

if ("Notification" in window) {
  if (Notification.permission === "granted") {
    console.log("Permission granted");
  } else {
    Notification.requestPermission().then(res => {
      if (res === "granted") {
        console.log("Permission granted");
      } else {
        console.error("Did not receive permission for notifications");
      }
    });
  }
} else {
  console.error("Browser does not support notifications");
}


const setBtn = document.getElementById("setBtn");

setBtn.addEventListener("click", () => {
  daysOfWeek.length = 0;
  isRepeat=true;
  count = 1;
  var monday = document.getElementById("monday");
  if (monday.checked) {
    daysOfWeek.push("Monday");
  }

  var tuesday = document.getElementById("tuesday");
  if (tuesday.checked) {
    daysOfWeek.push("Tuesday");
  }

  var wednesday = document.getElementById("wednesday");
  if (wednesday.checked) {
    daysOfWeek.push("Wednesday");
  }

  var thursday = document.getElementById("thursday");
  if (thursday.checked) {
    daysOfWeek.push("Thursday");
  }

  var friday = document.getElementById("friday");
  if (friday.checked) {
    daysOfWeek.push("Friday");
  }

  var saturday = document.getElementById("saturday");
  if (saturday.checked) {
    daysOfWeek.push("Saturday");
  }

  var sunday = document.getElementById("sunday");
  if (sunday.checked) {
    daysOfWeek.push("Sunday");
  }

  if (daysOfWeek.length === 0) {
    alert("Please select at least one day of the week.");
    return;
  }

  // Display selected days in the console
  console.log("Selected Days: " + daysOfWeek.join(", "));
  repeatDiv.classList.add("d-none");
  main.style.opacity = "1";
  main.style.pointerEvents = "all";
});


const fullscreenButton = document.getElementById("fullscreenButton");
const fullscreenDiv = document.getElementById("timer");
const mode = localStorage.getItem("Mode");

fullscreenButton.addEventListener("click", () => {
  fullscreenDiv.classList.add("alarmFullscreen");
 
  // if(mode == "light"){
  //   console.log("light");
  //   timer.style.backgroundColor = "white";
  // }else{
  //   console.log("dark");
  //   timer.style.backgroundColor = "black";
  // }


  if (fullscreenDiv.requestFullscreen) {
    fullscreenDiv.requestFullscreen();
  } else if (fullscreenDiv.mozRequestFullScreen) {
    // Firefox
    fullscreenDiv.mozRequestFullScreen();
  } else if (fullscreenDiv.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    fullscreenDiv.webkitRequestFullscreen();
  } else if (fullscreenDiv.msRequestFullscreen) {
    // IE/Edge
    fullscreenDiv.msRequestFullscreen();
  }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    function handleFullscreenChange() {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        // Fullscreen mode has been exited
        fullscreenDiv.classList.remove("alarmFullscreen");
      }
    }
});