function changeImage(imageSrc) {
    const productImage = document.getElementById('productImage');
    productImage.src = imageSrc;
}

function toggleFavorite() {
    const heartIcon = document.getElementById('favoriteIcon');
    const favoriteText = document.getElementById('favoriteText');
    
    heartIcon.classList.toggle('liked');
    if (heartIcon.classList.contains('liked')) {
        favoriteText.textContent = 'Added to Favorites';
    } else {
        favoriteText.textContent = 'Add to Favorites';
    }
}

// for darkmode

document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Check if dark mode is already saved in localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save dark mode preference in localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            localStorage.removeItem('dark-mode');
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const cart = document.getElementById('cart');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = cart.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartButtons = document.querySelectorAll('.btn-primary');

    // Open Cart
    openCartBtn.addEventListener('click', () => {
        cart.classList.add('open');
    });

    // Close Cart
    closeCartBtn.addEventListener('click', () => {
        cart.classList.remove('open');
    });

    // Function to update the total price
    function updateTotalPrice() {
        let totalPrice = 0;
        const cartItems = document.querySelectorAll('.cart-item');

        cartItems.forEach(item => {
            const quantity = item.querySelector('.quantity').value;
            const price = item.querySelector('.price').dataset.price;
            totalPrice += quantity * parseFloat(price);
        });

        totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;
    }

    // Add item to cart
    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = button.closest('.card');
            const productName = card.querySelector('.card-title').innerText;
            const productPriceText = card.querySelector('.card-text').innerText;
            const productPrice = parseFloat(productPriceText.replace(/[^\d.-]/g, '')); // Strip currency symbols

            const quantity = 1; // Default quantity

            // Create cart item
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${productName}</p>
                <input type="number" value="${quantity}" class="quantity" min="1">
                <span class="price" data-price="${productPrice}">Rs ${productPrice.toFixed(2)}</span>
                <button class="remove-btn">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            // Update total price
            updateTotalPrice();

            // Add event listener to the new remove button
            const removeButton = cartItem.querySelector('.remove-btn');
            removeButton.addEventListener('click', () => {
                cartItem.remove();
                updateTotalPrice();
            });

            // Add event listener to the quantity input
            const quantityInput = cartItem.querySelector('.quantity');
            quantityInput.addEventListener('change', updateTotalPrice);
        });
    });
});
