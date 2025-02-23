// Add event listener to the form submission
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from actually submitting

    // Collect form data (name, email, and address)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // For now, just log the information (you can send it to a server here)
    console.log('Order Details:', { name, email, address });

    // Display the alert saying the order has been placed
    alert('Order placed successfully!');

    // Optionally, you can also update the page with a success message
    document.getElementById('order-status').textContent = 'Your order has been placed successfully!';
});
