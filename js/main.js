const menuIcon = document.getElementById("menuIcon");
const element = document.body;
const modeIcon = document.getElementById("modeIcon");
const topbar=document.getElementById("top-bar");
const menubar=document.getElementById("menu");
function toggleDarkMode() {
    modeIcon.classList.toggle("fa-moon");
    topbar.classList.toggle("dark-mode");
    menubar.classList.toggle("dark-mode");
    element.classList.toggle("dark-mode");
}

menuIcon.addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("d-none");
});


