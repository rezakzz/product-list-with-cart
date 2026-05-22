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
        const price = productCard.dataset.price;

        cart.push({ name, price });

        updateCart();
    });
});

function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = "";

    if (cart.length > 0) {
        emptyImage.style.display = "none";
        emptyText.style.display = "none";
    }

    cart.forEach((item) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>$${item.price}</p>
            </div>
        `;
    });
}