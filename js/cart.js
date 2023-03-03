
// search click 
let search = document.querySelector(".search");
let box_search = document.querySelector(".box-search");
let btn_close = document.querySelector(".btn-close");

// open search input
search.addEventListener("click", () => {
  search.style = "display: none !important";
  box_search.classList.add("active")
})

// close search input
btn_close.addEventListener("click", () => {
  box_search.classList.remove("active");
  search.style = "display: block !important";
})

// Initialize tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
})

// notices cart
let countNewProductOfCart = document.querySelector(".notices");
let notices = document.querySelector(".notices span");
let btnCart = document.querySelector(".notices-cart");

// check count of notices in localStorage
if(window.localStorage.getItem("notices")) {
  notices.innerHTML = window.localStorage.getItem("notices");
  countNewProductOfCart.style.display = "inline";
} else {
  countNewProductOfCart.style.display = "none";
}

// if click cart 
btnCart.addEventListener("click", () => {
  countNewProductOfCart.style.display = "none";
  window.localStorage.removeItem("notices");
})

// if add product in cart
let arrayOfProductCart = [];
let cartBody = document.querySelector(".cart .cart-body");
let btnClearCart = document.querySelector(".clear-cart");

// check in product in cart from localStorage 
if(window.localStorage.getItem("cartItems")) {
  arrayOfProductCart = JSON.parse(window.localStorage.getItem("cartItems"));
} else {
  cartBody.innerHTML = '<p class="text-center fs-5 my-5">No Hove A Products In You Cart</p>';
}



getFromLocalStorage();

// if click btn Clear Cart
btnClearCart.addEventListener("click", () => {
  window.localStorage.removeItem("cartItems");
  cartBody.innerHTML = "";
  cartBody.innerHTML = '<p class="text-center fs-5 my-5">No Hove A Products In You Cart</p>';
})

// add product from cart 
function addProductToCart (arrayOfProductCart) {
  arrayOfProductCart.forEach((productItemFromCart) => {
    if(!productItemFromCart.completed) {
      let divProductCardItem = document.createElement("a");
      divProductCardItem.setAttribute("data-price",productItemFromCart.price);
      divProductCardItem.setAttribute("data-gender",productItemFromCart.type);
      divProductCardItem.className = "d-flex justify-content-around align-items-center text-decoration-none text-dark border-bottom p-4 productInCart";
      divProductCardItem.setAttribute("Href","product.html");
      cartBody.appendChild(divProductCardItem);
      let countProduct = 0;
      productItemFromCart.type == "woman" ? productItemFromCart.id -= 14: "";
      productItemFromCart.id < 10 ? countProduct = `0${productItemFromCart.id+1}` : countProduct = productItemFromCart.id+1 ;
      let priceProductOfCart = (parseInt(productItemFromCart.price * productItemFromCart.quantity) + parseInt(productItemFromCart.quantity));
      divProductCardItem.setAttribute("data-count",countProduct);
      divProductCardItem.innerHTML = `
      <img class="img-box-cart" src="img/models/${productItemFromCart.type}_models/model_${countProduct}_main.jpg">
      <span>Cloths</span>
      <span>${productItemFromCart.quantity}</span>
      <span>${priceProductOfCart}$</span>`
      productItemFromCart.completed = true;
    }
  })
}

// if click divProductCardItem to product page 
let divProductCardItems = document.querySelectorAll(".productInCart");
divProductCardItems.forEach((divProductCardItem) => {
  divProductCardItem.addEventListener("click", () => {
    localStorage.setItem("id",`${divProductCardItem.dataset.count}`);
    localStorage.setItem("price",`${divProductCardItem.dataset.price}`);
    localStorage.setItem("gender",`${divProductCardItem.dataset.gender}`);
  })
})

// get data products cart from localStorage
function getFromLocalStorage() {
  let data = window.localStorage.getItem("cartItems");
  if(data) {
    let productsOfLocalStorage = JSON.parse(data);
    productsOfLocalStorage.forEach((localStorageItem) => {
      localStorageItem[`completed`] = false;
    })
    addProductToCart(productsOfLocalStorage)
  }
}
