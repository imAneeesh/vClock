const menuIcon = document.getElementById("menuIcon");
const element = document.body;
const modeIcon = document.getElementById("modeIcon");
const topbar=document.getElementById("top-bar");
const menubar=document.getElementById("menu-bar");
const activeMenu=document.querySelectorAll(".active"); 

function toggleDarkMode() {
    modeIcon.classList.toggle("fa-moon");
    // topbar.classList.toggle("dark-mode");
    // menubar.classList.toggle("dark-mode");
    activeMenu[0].classList.toggle("lighty-mode");
    element.classList.toggle("dark-mode");
}

menuIcon.addEventListener("click", () => {
    const menu = document.getElementById("menu-bar");
    menu.classList.toggle("d-none");
    const element = document.querySelector(".base-timer__label")
    element.classList.toggle("phone");
});


