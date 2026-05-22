const cartButtons = document.querySelectorAll(".cart-btn");
const cartCount = document.getElementById("cart-count");

let totalItems = 0;

cartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        totalItems++;
        cartCount.textContent = totalItems;
    });
});