const buttons = document.querySelectorAll(".cart-btn");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const emptyImage = document.getElementById("empty-cart-image");
const emptyText = document.getElementById("empty-cart-text");

let cart = [];

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const name = productCard.dataset.name;
        const price = Number(productCard.dataset.price);

        const existingItem = cart.find((item) => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
            productCard.classList.add("active");
        }

        updateCart();
        updateProductButton(productCard, name);
    });
});

function updateCart() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalQuantity;

    cartItems.innerHTML = "";

    if (cart.length > 0) {
        emptyImage.style.display = "none";
        emptyText.style.display = "none";
    }

    cart.forEach((item) => {
        cartItems.innerHTML += `
            <div class="cart-item">
        <h4>${item.name}</h4>

        <div class="cart-details">
            <span class="quantity">${item.quantity}x</span>
            <span class="unit-price">@ $${item.price.toFixed(2)}</span>
            <span class="total-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    </div>
        `;
    });
}

function updateProductButton(productCard, name) {
    const item = cart.find((item) => item.name === name);
    const imageBox = productCard.querySelector(".image-box");

    imageBox.querySelector(".cart-btn")?.remove();
    imageBox.querySelector(".quantity-btn")?.remove();

    imageBox.innerHTML += `
        <div class="quantity-btn">
            <button class="qty-control minus">
                <img src="./assets/images/icon-decrement-quantity.svg" alt="minus">
            </button>

            <span>${item.quantity}</span>

            <button class="qty-control plus">
                <img src="./assets/images/icon-increment-quantity.svg" alt="plus">
            </button>
        </div>
    `;
}