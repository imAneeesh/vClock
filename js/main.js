const menuIcon = document.getElementById("menuIcon");
const element = document.body;
const modeIcon = document.getElementById("modeIcon");

function toggleDarkMode() {
    modeIcon.classList.toggle("fa-moon");

    element.classList.toggle("dark-mode");
}

menuIcon.addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.classList.toggle("d-none");
    const element = document.querySelector(".base-timer__label")
    element.classList.toggle("phone");
});


