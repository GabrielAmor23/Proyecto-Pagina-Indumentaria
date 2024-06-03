document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.setAttribute('data-id', product._id);
                productDiv.setAttribute('data-name', product.name);
                productDiv.setAttribute('data-price', product.price);

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Descripción: ${product.description}</p>
                    <p>Precio: $${product.price}</p>
                    <button class="add-to-cart">Agregar al carrito</button>
                `;
                productList.appendChild(productDiv);

                productDiv.querySelector('.add-to-cart').addEventListener('click', () => {
                    const id = product._id;
                    const name = product.name;
                    const price = parseFloat(product.price);

                    const item = cart.find(product => product.id === id);
                    if (item) {
                        item.quantity++;
                    } else {
                        cart.push({ id, name, price, quantity: 1 });
                    }
                    updateCart();
                });
            });
        });

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Compra realizada con éxito!');
            cart = [];
            updateCart();
        } else {
            alert('El carrito está vacío.');
        }
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
                <button class="remove-item" data-id="${item.id}">Eliminar</button>`;
            cartItems.appendChild(li);

            total += item.price * item.quantity;
        });

        totalPrice.textContent = total.toFixed(2);
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });

    updateCart();
});
