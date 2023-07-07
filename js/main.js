const menuIcon = document.getElementById("menuIcon");
const barIcon=document.getElementById("fa-bars")
const xIcon=document.getElementById("fa-x")
const element = document.body;
const modeIcon = document.getElementById("modeIcon");
const topbar=document.getElementById("top-bar");
const repeatDiv = document.getElementById("repeatDiv");
const repeatCheckbox = document.getElementById("repeatCheckbox");
const cancel = document.getElementById("cancel");
const menubar=document.getElementById("menu-bar");
const activeMenu=document.querySelectorAll(".active"); 

function toggleDarkMode() {
    modeIcon.classList.toggle("fa-moon");
    // topbar.classList.toggle("dark-mode");
    // menubar.classList.toggle("dark-mode");
    activeMenu[0].classList.toggle("lighty-mode");
    activeMenu[1].classList.toggle("lighty-mode");
    element.classList.toggle("dark-mode");
    repeatDiv.classList.toggle("dark-mode")
}

menuIcon.addEventListener("click", () => {
<<<<<<< HEAD
    
=======
>>>>>>> 48e5de4ffb9218f00612aaf1b8d0de2dbab7220d
    barIcon.classList.toggle("d-none")
    xIcon.classList.toggle("d-none")
    const menu = document.getElementById("menu-bar");
    menu.classList.toggle("d-none");
    const element = document.querySelector(".base-timer__label")
    element.classList.toggle("phone");
});


repeatCheckbox.addEventListener("click", function () {
    repeatDiv.classList.toggle("d-none");

});

cancel.addEventListener("click", () => {
    repeatCheckbox.checked = false;
    repeatDiv.classList.add("d-none");
});