// Initial References
let timerRef = document.querySelector(".timer-display");
const hourInput = document.getElementById("hourInput");
const minuteInput = document.getElementById("minuteInput");
const activeAlarms = document.querySelector(".activeAlarms");
const setAlarm = document.getElementById("set");
let alarmsArray = [];
let alarmSound = new Audio('./js/audio.wav');
let initialHour = 0,
  initialMinute = 0,
  alarmIndex = 0;


// Append zeroes for single digit
const appendZero = (value) => (value < 10 ? "0" + value : value);

// Search for value in object
const searchObject = (parameter, value) => {
  let alarmObject,
    objIndex,
    exists = false;
  alarmsArray.forEach((alarm, index) => {
    if (alarm[parameter] == value) {
      exists = true;
      alarmObject = alarm;
      objIndex = index;
      return false;
    }
  });
  return [exists, alarmObject, objIndex];
};

let notificationCount = 0;

// Display Time
function displayTimer() {
  let date = new Date();
  let [hours, minutes, seconds] = [
    appendZero(date.getHours()),
    appendZero(date.getMinutes()),
    appendZero(date.getSeconds()),
  ];
  const hour = hours % 12;
  const hour12 = hour ? hour : 12;
  const minute = minutes < 10 ? '0' + minutes : minutes;
  const second = seconds < 10 ? '0' + seconds : seconds;


  // Check for alarms
  alarmsArray.forEach((alarm, index) => {
    console.log(hour12, minute)
    if (alarm.isActive) {
      if (alarm.alarmHour == hour12 && alarm.alarmMinute == minute) {
        // new Notification("hello thwere");
        console.log("Alarm");
        alarmSound.play();
        while (notificationCount < 1) {
          const notification = new Notification("Alarm", {
            body: "Alarm is ringing",
            icon: "./images/logo.png",
          });
          notificationCount++;
          notification.onclick = (e) => {
            window.location.href = "https://www.127.0.0.1:5500/vClock";
          };
        }
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
  alarmIndex += 1;
  // Alarm Object
  let alarmObj = {};
  alarmObj.id = `${alarmIndex}_${hourInput.value}_${minuteInput.value}`;
  alarmObj.alarmHour = hourInput.value;
  alarmObj.alarmMinute = minuteInput.value;
  alarmObj.isActive = false;
  console.log(alarmObj);
  alarmsArray.push(alarmObj);
  createAlarm(alarmObj);
  hourInput.value = appendZero(initialHour);
  minuteInput.value = appendZero(initialMinute);

  // Save to local storage
  localStorage.setItem("alarms", JSON.stringify(alarmsArray));
});

// Start Alarm
const startAlarm = (e) => {
  let searchId = e.target.parentElement.getAttribute("data-id");
  let [exists, obj, index] = searchObject("id", searchId);
  if (exists) {
    alarmsArray[index].isActive = true;
    // Save to local storage
    localStorage.setItem("alarms", JSON.stringify(alarmsArray));
    console.log(alarmsArray);
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
    console.log(alarmsArray);
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

  setInterval(displayTimer);
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

// function notify() {
//   const notification = new Notification('vClock:', {
//     body: 'Ongoing Alarm',
//     icon: 'https://vclock.com/img/favicons/apple-touch-icon-114x114.png',
//     vibration: [300, 200, 300]
//   });
// }
