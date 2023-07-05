const menuIcon = document.getElementById("menuIcon");
// const time=document.getElementById("time");
// const day=document.getElementById("day");
// const formateddate = document.getElementById("formateddate");
// const addAlarm = document.getElementById("addAlarm");
// const addForm = document.getElementById("addForm");
const element = document.body;
// const timer=document.getElementById("timer");
const modeIcon = document.getElementById("modeIcon");

function toggleDarkMode() {
    modeIcon.classList.toggle("fa-moon");

    element.classList.toggle("dark-mode");
}

// function clock(){
//     const timer = new Date();
//     const hours = timer.getHours();
//     const minutes = timer.getMinutes();
//     const seconds = timer.getSeconds();
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     const hour = hours % 12;
//     const hour12 = hour ? hour : 12;
//     const minute = minutes < 10 ? '0' + minutes : minutes;
//     const second = seconds < 10 ? '0' + seconds : seconds;
//     const time12 = hour12 + ':' + minute + ':' + second + ' ' + ampm;
//     time.innerHTML = time12;

//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const dayIndex = timer.getDay();
//     const dayOfWeek = daysOfWeek[dayIndex];
//     day.innerHTML = dayOfWeek;

//     const year = timer.getFullYear();
//     const month = timer.getMonth() + 1; // Months are zero-based, so adding 1
//     const days = timer.getDate();
//     const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${days< 10 ? '0' + days : days}`;
//     formateddate.innerHTML = formattedDate;
    


// }

// setInterval(clock, 1000);

menuIcon.addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("d-none");
});

// addAlarm.addEventListener("click", () => {
//     addForm.classList.toggle("d-none");
// })

// timer.innerHTML = "00:00:00";