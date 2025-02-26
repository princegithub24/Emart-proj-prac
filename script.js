let cart = [];
const modal=document.getElementById('cart-modal') ;


function addToCart(button) {
    const productCard = button.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('p').textContent;
    const productImage = productCard.querySelector('img').src;

    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        // If the product is already in the cart, just alert the user
        alert(`${productName} is already in the cart.`);
    } else {
        // If it's a new product, add it to the cart
        cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
        // alert("Added to cart");
    }

    // Update cart UI
    updateCartModal();
}


function updateCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Clear the cart items container
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        // Create cart item element
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
            <div class="quantity-controls">
                <button onclick="changeQuantity('${item.name}', -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity('${item.name}', 1)">+</button>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.name}')">Remove</button>
        `;

        // Append cart item to container
        cartItemsContainer.appendChild(cartItem);

        // Update total price
        total += parseFloat(item.price.replace('$', '')) * item.quantity;
    });

    // Update cart count and total
    cartCount.textContent = cart.length;
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function changeQuantity(productName, delta) {
    const product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += delta;
        if (product.quantity <= 0) {
            removeFromCart(productName);
        } else {
            updateCartModal();
        }
    }
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartModal();

    // Close the modal if the cart is empty
    if (cart.length === 0) {
        closeCartModal();
    }
}

function openCartModal() {
    document.getElementById('cart-modal').style.display = 'flex';

}


function closeCartModal() {
    modal.style.display = 'none'; 
}
window.addEventListener('click', function(event) {
    // Check if the click is outside the modal content
    if (event.target ===modal) {
        modal.style.display = 'none'; // Close the modal by setting display to 'none'
        // closeCartModal()
    }
});



function handleCheckout() {
    // alert('Proceeding to checkout');
    // Optionally, you can handle form submission or redirect to a checkout page

    // let cart=cart.filter(item => item.name !== productName)
    // if(cart.length==0){
    //     alert("Nothing in the cart")
    // }
    window.location.href = "checkout.html";
}




function toggleMenu() {
    const navMenu = document.querySelector('nav ul');
    navMenu.classList.toggle('show'); // Toggle the 'show' class on the nav menu
    
    const hamburger = document.querySelector('.hamburger');
    // Change the icon to 'X' when the menu is open
    if (navMenu.classList.contains('show')) {
        hamburger.innerHTML = '&#10005;'; // 'X' icon
    } else {
        hamburger.innerHTML = '&#9776;'; // Hamburger icon
    }
}