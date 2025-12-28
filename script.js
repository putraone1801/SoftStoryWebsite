const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("active")
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
});