const ordersSection = document.querySelector('#orders-list');

let cartItems = localStorage.getItem('cart');


const checkoutBtn = document.createElement('button');
checkoutBtn.innerText = 'Checkout';
checkoutBtn.classList.add('btn', 'btn-success', 'btn-block', 'mt-4');

// ordersSection.appendChild(checkoutBtn);

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

    itemSection.innerHTML = `
    <img src=${item.image} alt="product" class="image"> 
       <div class="details"> item: ${item.title} <br>
        price: ${item.price} <br>
        quantity: ${item.amount} <br>
        total: ${item.price * item.amount}</div>
        `;
    ordersSection.appendChild(itemSection);
  });

    const totalPrice = cart.reduce((total, item) => total + item.price * item.amount, 0);
    const totalPriceSection = document.createElement("h2");
    totalPriceSection.innerHTML = `<hr><br>total: ${totalPrice}`;
    ordersSection.appendChild(totalPriceSection);
    const COD = document.createElement("section");
    COD.innerHTML = `<div class="COD">
    <form action="">
        <textarea name="address" id="address" cols="40" rows="10" placeholder="Your Address here" required></textarea><br>
        <input type="radio" id="COD" name="COD" value="COD" checked> COD 
    </form>
    </div>`;
    ordersSection.appendChild(COD);
   

}

ordersSection.appendChild(checkoutBtn);

checkoutBtn.addEventListener("click", () => {
  let user = localStorage.getItem('user');
  
  let productids = ''

  if(user) {
    let cart = localStorage.getItem('cart') || '[]'
    const items = JSON.parse(cart);
    user = JSON.parse(user)

    items.forEach(it => productids+=`,${it.id}`)

    console.log(productids)

    fetch("http://localhost:4000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: user.id,
        productsids: productids
      }),
    })
    .then(res => res.json())
    .then(res => {
      console.log("order",res)
      alert(res.message);
      localStorage.removeItem('cart');
      window.location.href = "http://127.0.0.1:5501/html/index.html";

    })
    .catch(err => console.log(err))
  }




  // window.location.href = "http://127.0.0.1:5501/html/index.html";
});