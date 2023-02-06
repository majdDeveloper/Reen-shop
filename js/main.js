
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
  window.localStorage.removeItem("notices");
  countNewProductOfCart.style.display = "none";
})

// search button 
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