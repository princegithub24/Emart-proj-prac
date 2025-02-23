// Cart items array
let cartItems = [];

// Function to add an item to the cart
function addToCart(button) {
    // Get the parent .product-card of the button
    const productCard = button.closest('.product-card');

    // Get the product name from the <h3> element
    const productName = productCard.querySelector('h3').textContent;

    // Get the price from the <p> element
    const price = parseFloat(productCard.querySelector('p').textContent.replace('$', '').trim());

    // Get the image URL from the <img> src attribute
    const imageUrl = productCard.querySelector('img').src;

    // Add the item to the cart
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        alert(`${productName} is already in the cart.`);
        return;
    }

    cartItems.push({ name: productName, price: price, imageUrl: imageUrl });
    document.getElementById("cart-count").textContent = cartItems.length;
    alert(`${productName} added to your cart.`);
}

// Function to open the cart modal
function openCartModal() {
    const cartModal = document.getElementById("cart-modal");
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalDiv = document.getElementById("cart-total");
    const checkoutButton = document.getElementById("checkout-button");

    // Show cart items in the modal
    if (cartItems.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        checkoutButton.style.display = "none"; // Hide checkout button if cart is empty
        cartTotalDiv.innerHTML = ""; // Clear total
    } else {
        cartItemsDiv.innerHTML = cartItems.map(item =>
            `<div class="cart-item">
                <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                </div>
            </div>`).join("");
        
        // Calculate total price
        const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
        cartTotalDiv.innerHTML = `Total: $${totalPrice.toFixed(2)}`; // Display total

        checkoutButton.style.display = "block"; // Show checkout button if cart has items
    }

    cartModal.style.display = "flex"; // Show the modal
}

// Function to close the cart modal (without affecting the cart items)
function closeCartModal() {
    document.getElementById("cart-modal").style.display = "none"; // Hide the modal
}

// Function to handle the checkout process and redirect to checkout page
function handleCheckout() {
    // Hide the "Proceed to Checkout" button after clicking
    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.style.display = "none";

    // Optionally, you can show an alert or confirmation that the checkout is proceeding
    // alert('Proceeding to checkout...');

    // Redirect the user to the checkout page
    window.location.href = "checkout.html";  // This redirects to checkout.html

    // You can also log the cart or send it to a backend here if needed, but for now we are just redirecting.
}
