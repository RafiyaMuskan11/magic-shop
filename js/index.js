
// hamburger section
document.querySelector('.cross').style.display = 'none';
document.querySelector('.hamburger').addEventListener("click", ()=>{
    document.querySelector('.sidebar').classList.toggle('sidebarGo')
    if(document.querySelector('.sidebar').classList.contains('sidebarGo')){
        document.querySelector('.ham').style.display = 'inline';
        document.querySelector('.cross').style.display = 'none';
    }
else {
    document.querySelector('.ham').style.display = 'none';
    setTimeout(() => {
        document.querySelector('.cross').style.display = 'inline';

    }, 400);
    
}
});



// variables

const cartBtn = document.querySelector('.cartbtn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');


const loginBtn = document.querySelector('#login-btn');
const checkoutBtn = document.querySelector('#checkout-btn');


const user = localStorage.getItem('user');
if(user){
  loginBtn.innerHTML= 'Logout <i class="fa-solid fa-user"></i>';
  loginBtn.style.fontSize = '25px';
  loginBtn.style.fontWeight = 'bold';
  loginBtn.style.backgroundColor = 'rgb(95, 59, 107)';
  loginBtn.style.cursor = 'pointer';
}


loginBtn.addEventListener('click', (e) => {
    if(user){
        localStorage.removeItem('user');
        loginBtn.innerText = 'Login';

        window.location.href = 'http://127.0.0.1:5501/html/login.html';
    }
  });
   
checkoutBtn.addEventListener('click', (e) => {
    if(!user) {
        window.location.href = 'http://127.0.0.1:5501/html/login.html';
    }

    if(user){
        window.location.href = 'http://127.0.0.1:5501/html/checkout.html';
    }
  });


// cart general info
let cart = [];

// buttons
let buttonsDOM = [];

// getting the products
class Products{
 async getProducts() {
  try {
    let result = await fetch('products.json');
    let data = await result.json();

    let products = data.items;
    products = products.map(item => {
      const { title, price } = item.fields;
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      return { title, price, id, image };
    });
    return products;
  } catch (error) {
    console.log(error);
  }
 }
}

// display products
class UI {
  displayProducts(products){
    let result = '';
    products.forEach(product => {
      result +=`
      <!-- single product -->
      <article class="product">
        <div class="img-container">
          <img src=${product.image} alt="product" class="product-img">
          <button class="cart-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>
            add to cart
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>₹${product.price}</h4>
      </article>
      <!-- end of single product -->
      `;
    });
    // productsDOM.innerHTML = result;   
  }
  getCartButtons(){
    const buttons = [...document.querySelectorAll(".cart-btn")];
    buttonsDOM = buttons;
    buttons.forEach(button =>{
      let id = button.dataset.id;
      let inCart = cart.find(item => item.id === id);
      if(inCart){
        button.innerText = "In Cart";
        button.disabled = true
      }
      button.addEventListener("click",event =>{
          event.target.innerText = "In Cart";
          event.target.disabled = true;
          // get product from products
          let cartItems = { ...Storage.getProduct(id), amount: 1};
          
          // add product to cart
          cart = [...cart,cartItems];
          // save cart in local storage
          Storage.saveCart(cart);
          // set cart values
          this.setCartValues(cart);
          // display cart items
          this.addCartItem(cartItems);
          // show the cart
          this.showCart();
        });
      
    });
  }
  setCartValues(cart){
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item =>{
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item){
    const div = document.createElement("div");
    div.classList.add('cart-item');
    div.innerHTML = `<img src=${item.image} alt="product">
    <div>
      <h4>${item.title}</h4>
      <h5>₹${item.price}</h5>
      <span class="remove-item" data-id=${item.id}>Remove</span>
    </div>
    <div>
      <i class="fas fa-chevron-up" data-id=${item.id}></i>
      <p class="item-amount">${item.amount}</p>
      <i class="fas fa-chevron-down" data-id=${item.id}></i>
    </div>`
    cartContent.appendChild(div);   
  }
  showCart(){
   cartOverlay.classList.add("transparentBcg");
   cartDOM.classList.add("showCart");

  }
  setupApp() {
      cart = Storage.getCart();
      this.setCartValues(cart);
      this.populateCart(cart);
      cartBtn.addEventListener('click',this.showCart);
      closeCartBtn.addEventListener('click',this.hideCart);
  }
  populateCart(cart){
    cart.forEach(item =>this.addCartItem(item));
  }
  hideCart(){
    cartOverlay.classList.remove("transparentBcg");
   cartDOM.classList.remove("showCart");
  }
  cartLogic(){
    // clear cart button
    clearCartBtn.addEventListener('click', () =>{
      this.clearCart();
    });
    // cart functionality
    cartContent.addEventListener("click", event => {
      if(event.target.classList.contains('remove-item'))
      {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      }
      else if(event.target.classList.contains('fa-chevron-up')){
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      }
      else if(event.target.classList.contains('fa-chevron-down')){
        let lowerAmount = event.target;
        let id = lowerAmount.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount = tempItem.amount - 1;
        if(tempItem.amount > 0){
          Storage.saveCart(cart);
          this.setCartValues(cart);
          lowerAmount.previousElementSibling.innerText = tempItem.amount;
        }
        else{
          cartContent.removeChild(lowerAmount.parentElement.parentElement);
          this.removeItem(id);
        }
      }
    });
  }
  clearCart(){
    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));
    console.log(cartContent.children);

    while(cartContent.children.length>0){
      cartContent.removeChild(cartContent.children[0]);
    }
    this.hideCart(); 
  }
  removeItem(id){
   cart = cart.filter(item => item.id !==id);
   this.setCartValues(cart);
   Storage.saveCart(cart);
   let button = this.getSingleButton(id);
   button.disabled = false;
   button.innerHTML = `<i class="fas fa-shopping-cart"></i>
   add to cart`;
  }
  getSingleButton(id){
    return buttonsDOM.find(button => button.dataset.id === id);    
  }
}

// local storage
class Storage{
  static saveProducts(products){
   localStorage.setItem("products",JSON.stringify(products));
  }
  static getProduct(id){
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find(product => product.id ===id)
  }
  static saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart))
  }
  static getCart(){
    return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();
  // setup app
  ui.setupApp();

  //get all products
  products.getProducts().then(products => { 
    ui.displayProducts(products);
    Storage.saveProducts(products);
  }).then(()=>{
    ui.getCartButtons();
    ui.cartLogic();
  });
});