// Cart items array with quantity support
let cartItems = [];

// Function to add an item to the cart
function addToCart(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const price = parseFloat(productCard.querySelector('p').textContent.replace('$', '').trim());
    const imageUrl = productCard.querySelector('img').src;

    // Check if the item is already in the cart
    const existingItem = cartItems.find(item => item.name === productName);
    if (existingItem) {
        // Increase quantity if already in the cart
        existingItem.quantity += 1;
    } else {
        // Add a new item with quantity 1
        cartItems.push({ name: productName, price: price, imageUrl: imageUrl, quantity: 1 });
    }

    document.getElementById("cart-count").textContent = cartItems.length;
    alert(`${productName} added to your cart.`);
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCartModal(); // Update the modal after removal
}

// Function to increase item quantity
function increaseQuantity(index) {
    cartItems[index].quantity += 1;
    updateCartModal(); // Update the modal after quantity change
}

// Function to decrease item quantity
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    }
    updateCartModal(); // Update the modal after quantity change
}

// Function to update the cart modal
function updateCartModal() {
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
        cartItemsDiv.innerHTML = cartItems.map((item, index) =>
            `<div class="cart-item">
                <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <button onclick="removeFromCart(${index})" class="remove-item">Remove</button>
                </div>
            </div>`).join("");

        // Calculate total price
        const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartTotalDiv.innerHTML = `Total: $${totalPrice.toFixed(2)}`; // Display total

        checkoutButton.style.display = "block"; // Show checkout button if cart has items
    }

    cartModal.style.display = "flex"; // Show the modal
}

// Function to open the cart modal
function openCartModal() {
    updateCartModal(); // Reuse the update function to populate the modal
}

// Function to close the cart modal
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
