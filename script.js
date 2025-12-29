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
    const whatsappMessage = `Halo, saya ingin berbicara.%0A%0A*Nama:* ${name}%0A*Email:* ${email}%0A*Pesan:* ${message}`;

    // Redirect to WhatsApp API
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
}

/* --- SHOPPING CART LOGIC --- */

// State
let cart = [];
const cartOverlay = document.getElementById('cart-overlay');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-price');
const cartCountElement = document.getElementById('cart-count');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');

// Event Listeners for Cart Toggle
cartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Event Listeners for Add To Cart Buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.getAttribute('data-id'),
            name: button.getAttribute('data-name'),
            price: parseInt(button.getAttribute('data-price')),
            image: button.getAttribute('data-image'),
            quantity: 1
        };
        addToCart(product);
        toggleCart(); // Automatically open cart when adding item
    });
});

// Functions
function toggleCart() {
    cartOverlay.classList.toggle('active');
    cartSidebar.classList.toggle('active');
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    updateCartUI();
}

function updateQuantity(id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

        updateCartUI();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    // 1. Update Cart Count Badge
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountElement.innerText = totalCount;

    // 2. Render Cart Items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <ion-icon name="basket-outline"></ion-icon>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${formatRupiah(item.price)}</p>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <ion-icon name="trash-outline" class="remove-item" onclick="removeFromCart('${item.id}')"></ion-icon>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // 3. Update Total Price
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalElement.innerText = formatRupiah(total);
}

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

function checkoutWithWhatsApp() {
    if (cart.length === 0) {
        alert("Keranjangmu kosong!");
        return;
    }

    const phoneNumber = "6281907549348";
    let message = "Halo, saya ingin memesan:%0A%0A";

    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - ${formatRupiah(item.price * item.quantity)}%0A`;
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `%0A*Total Order: ${formatRupiah(total)}*`;
    message += "%0A%0ABeritahu saya detail pembayaran. Terima kasih!";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}