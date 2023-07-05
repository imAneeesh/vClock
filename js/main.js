const menuIcon = document.getElementById("menuIcon");
const time=document.getElementById("time");

function clock(){
    const timer = new Date();
    const hours = timer.getHours();
    const minutes = timer.getMinutes();
    const seconds = timer.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour = hours % 12;
    const hour12 = hour ? hour : 12;
    const minute = minutes < 10 ? '0' + minutes : minutes;
    const second = seconds < 10 ? '0' + seconds : seconds;
    const time12 = hour12 + ':' + minute + ':' + second + ' ' + ampm;
    time.innerHTML = time12;
    console.log(second)
}

setInterval(clock, 1000);

menuIcon.addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("d-none");
    });
