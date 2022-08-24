const ordersSection = document.querySelector('#orders-list');

let cartItems = localStorage.getItem('cart');


const checkoutBtn = document.createElement('button');
checkoutBtn.innerText = 'Checkout';
checkoutBtn.classList.add('btn', 'btn-success', 'btn-block', 'mt-4');

ordersSection.appendChild(checkoutBtn);

if (!cartItems) {
    checkoutBtn.style.display = 'none';
    ordersSection.innerHTML = '<h2 class="text-center">No items in cart</h2>';
}

if (cartItems) {
checkoutBtn.style.display = 'block';
  cart = JSON.parse(cartItems);

  cart.forEach((item) => {
    const itemSection = document.createElement("div");
    itemSection.classList.add("cart-item");

    itemSection.innerHTML = `item: ${item.title} <br>
        price: ${item.price} <br>
        quantity: ${item.amount} <br>
        total: ${item.price * item.amount} <br>
        `;
    ordersSection.appendChild(itemSection);
  });

    const totalPrice = cart.reduce((total, item) => total + item.price * item.amount, 0);
    const totalPriceSection = document.createElement("h1");
    totalPriceSection.innerHTML = `total: ${totalPrice}`;
    ordersSection.appendChild(totalPriceSection);

}

// checkoutBtn.addEventListener('click', () => {
//     fetch("")