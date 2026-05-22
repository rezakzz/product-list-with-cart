const buttons = document.querySelectorAll(".cart-btn");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const emptyImage = document.getElementById("empty-cart-image");
const emptyText = document.getElementById("empty-cart-text");

let cart = [];

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        addItem(productCard);
    });
});

function addItem(productCard) {
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
    updateProductButton(productCard);
}

function decreaseItem(productCard) {
    const name = productCard.dataset.name;
    const item = cart.find((item) => item.name === name);

    if (!item) return;

    item.quantity--;

    if (item.quantity === 0) {
        cart = cart.filter((cartItem) => cartItem.name !== name);
        productCard.classList.remove("active");
        resetProductButton(productCard);
    } else {
        updateProductButton(productCard);
    }

    updateCart();
}

function updateCart() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalQuantity;

    cartItems.innerHTML = "";

    if (cart.length > 0) {
        emptyImage.style.display = "none";
        emptyText.style.display = "none";
    } else {
        emptyImage.style.display = "block";
        emptyText.style.display = "block";
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

function updateProductButton(productCard) {
    const name = productCard.dataset.name;
    const item = cart.find((item) => item.name === name);
    const imageBox = productCard.querySelector(".image-box");

    imageBox.querySelector(".cart-btn")?.remove();
    imageBox.querySelector(".quantity-btn")?.remove();

    imageBox.insertAdjacentHTML("beforeend", `
        <div class="quantity-btn">
            <button class="qty-control minus" type="button">
                <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrease quantity">
            </button>

            <span>${item.quantity}</span>

            <button class="qty-control plus" type="button">
                <img src="./assets/images/icon-increment-quantity.svg" alt="Increase quantity">
            </button>
        </div>
    `);

    imageBox.querySelector(".plus").addEventListener("click", () => {
        addItem(productCard);
    });

    imageBox.querySelector(".minus").addEventListener("click", () => {
        decreaseItem(productCard);
    });
}

function resetProductButton(productCard) {
    const imageBox = productCard.querySelector(".image-box");

    imageBox.querySelector(".quantity-btn")?.remove();

    imageBox.insertAdjacentHTML("beforeend", `
        <button class="cart-btn">
            <img src="./assets/images/icon-add-to-cart.svg" alt="Icon">
            <span>Add to Cart</span>
        </button>
    `);

    imageBox.querySelector(".cart-btn").addEventListener("click", () => {
        addItem(productCard);
    });
}