const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("active")
const nav = document.querySelector("nav")

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("open") // Add animation state to icon
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

function sendToWhatsApp(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const phoneNumber = "6281907549348";

    // Construct the WhatsApp message
    const whatsappMessage = `Hello, I would like to get in touch.%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;

    // Redirect to WhatsApp API
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
}