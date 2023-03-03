
// get data of localStorage
var productItemForLocalStorage = localStorage.getItem(`id`);
var productPriceForLocalStorage = localStorage.getItem("price");
var productGenderForLocalStorage = localStorage.getItem("gender");

// access elements 
var mainImageProduct = document.querySelector(".main-img");
var subsImageProduct = document.querySelectorAll(".product_details .child-img");
var productPrice = document.querySelector(".price-product");
var productPriceOriginal = document.querySelector(".price-original");

// add src in main image 
mainImageProduct.setAttribute("src",`./img/models/${productGenderForLocalStorage}_models/model_${productItemForLocalStorage}_main.jpg`);

// add src in sub images 
subsImageProduct.forEach((sub, indexSub) => {
  sub.setAttribute("src",`img/models/${productGenderForLocalStorage}_models/model_${productItemForLocalStorage}_sub_0${indexSub+1}.jpg`);
  // if mouseover in img
  sub.addEventListener("mouseover", () => {
      mainImageProduct.src = sub.src;
    })
})
// add price 
productPrice.textContent = `${productPriceForLocalStorage}`;
productPriceOriginal.textContent = `${parseInt(productPriceForLocalStorage)+70}.99$`;

// products show
var mainProduct = document.querySelector(".swiper-wrapper");

appendProductFromSwiper();

var productsSwiper = document.querySelectorAll(".swiper-wrapper .swiper-slide");
var productItems = document.querySelectorAll(".swiper-wrapper .product-item");

// add data for products 
productItems.forEach((productItem) => {
  productItem.addEventListener("click", () => {
    localStorage.setItem("id",`${productItem.id}`)
    localStorage.setItem("price",`${productItem.querySelector(".priceItem").textContent}`)
    localStorage.setItem("gender",`${productItem.dataset.gender}`);
  })
})

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

// check if notices in localStorage 
if(window.localStorage.getItem("notices")) {
  notices.innerHTML = window.localStorage.getItem("notices");
  countNewProductOfCart.style.display = "inline";
} else {
  countNewProductOfCart.style.display = "none";
}

// if cart click 
btnCart.addEventListener("click", () => {
  window.localStorage.removeItem("notices");
  countNewProductOfCart.style.display = "none";
})

// slides Products
var swiper = new Swiper(".mySwiper", {
  slidesPerView: window.innerWidth > 991 ? 3 : window.innerWidth > 676 ? 2 : 1,
  spaceBetween: 30,
  slidesPerGroup: window.innerWidth > 991 ? 3 : window.innerWidth > 676 ? 2 : 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// show products in slider swiper
function appendProductFromSwiper() {
  var typeModel;
  localStorage.getItem("gender") == "man" ? typeModel = "man" : typeModel = "woman";
  for(var counterProduct = 1; counterProduct<= 12; counterProduct++) {
    var num = 1;
    counterProduct < 10 ? num = `0${counterProduct}` : num = counterProduct ;
    var productItem = document.createElement("a");
    productItem.className = "product-item swiper-slide text-decoration-none text-black";
    productItem.setAttribute("Href","product.html");
    productItem.setAttribute("id",`${num}`);
    productItem.setAttribute("data-gender",`${typeModel}`);
    var divProduct = document.createElement("div")
    divProduct.className = "p-0 mb-3 shadow";
    productItem.appendChild(divProduct);
    var imgProduct = document.createElement("img");
    imgProduct.className = "card-img-top product-item-img";
    imgProduct.setAttribute("src", `img/models/${typeModel}_models/model_${num}_main.jpg`);
    imgProduct.setAttribute("alt", "Main_image");
    divProduct.appendChild(imgProduct);
    var divCardBody = document.createElement("div");
    divCardBody.className = "card-body p-3";
    divProduct.appendChild(divCardBody);
    var cardTitle = document.createElement("p");
    cardTitle.className = "card-title fs-5 fw-light";
    divCardBody.appendChild(cardTitle);
    var contentCardTitle = document.createTextNode("Oupidatat non");
    cardTitle.appendChild(contentCardTitle);
    divCardBody.appendChild(cardTitle);
    var cardText = document.createElement("p");
    cardText.className = "card-text fw-light m-0";
    var contentCardText = document.createTextNode("M/L/X/XL");
    cardText.appendChild(contentCardText);
    divCardBody.appendChild(cardText);
    var ulStars = document.createElement("ul");
    ulStars.className = "list-unstyled text-center m-0";
    var liStars = document.createElement("li");
    var randomRatingStar = (Math.ceil(Math.random()* 5));
    for (var i = 0; i <5; i++) {
      var iconStar = document.createElement("i");
      iconStar.className = "fa-solid fa-star fs-4";
      if (i < randomRatingStar) {
        iconStar.classList.add("text-warning");
      } else {
        iconStar.classList.add("text-muted");
      }
      liStars.appendChild(iconStar);
    }
    ulStars.appendChild(liStars);
    divCardBody.appendChild(ulStars);
    var proPrice = document.createElement("p");
    proPrice.className = "text-center fs-4 m-0 fw-light priceItem";
    var randomPrice = (Math.ceil(Math.random()* 30));
    var contentProductPrice = document.createTextNode(`${randomPrice}9.99$`);
    proPrice.appendChild(contentProductPrice);
    divCardBody.appendChild(proPrice);
    mainProduct.appendChild(productItem);
  }
}