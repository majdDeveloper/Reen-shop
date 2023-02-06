
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

// Access parent div filter 
let select_categories = document.querySelectorAll(".categories div");

// Access parent div  gender type filter 
let type_filter_products = document.querySelectorAll(".filter_products li");

// Categories Filter by  gender type
filterProducts();

// Access btn filter in gender type
let filter_products_all = document.querySelector(".filter_products_all");
let filter_products_man = document.querySelector(".filter_products_man");
let filter_products_woman = document.querySelector(".filter_products_woman");

// Access select filter in gender type
let categories_products_all = document.querySelector(".select_categories_all");
let categories_products_man = document.querySelector(".select_categories_man");
let categories_products_woman = document.querySelector(".select_categories_woman");
let main_product = document.querySelector(".products");

// append all product in shop page 
appendProductInPage();

// Access products in shop page
let productItems = document.querySelectorAll(".products .product-item");

// Access products images in shop page
let imgProducts = document.querySelectorAll(".products .product-item .img-product");

// details product button if click
imgProducts.forEach((imgProduct) => {
  imgProduct.setAttribute("Href","product.html");
  imgProduct.addEventListener("click", () => {
    localStorage.setItem("id",`${imgProduct.dataset.count}`);
    localStorage.setItem("price",`${imgProduct.nextElementSibling.querySelector(".price").textContent}`);
    localStorage.setItem("gender",`${imgProduct.dataset.gender}`);
  })
})

// Access btn next page and btn previous page
let angle_page_previous = document.querySelector(".angle_page .angle_page_previous");
let angle_page_next = document.querySelector(".angle_page .angle_page_next");
let numProductsDefaultPage = 8;
let numProductsGoalPage = numProductsDefaultPage + 10;

// Show Default Page Products
default_product_page();

// if Click angle_page_next
angle_page_next.addEventListener("click",next_product_page);

// if Click angle_page_previous
angle_page_previous.addEventListener("click", previous_product_page);

// if Click filter_products_all
filter_products_all.addEventListener("click",show_products_all);

// if Click filter_products_man
filter_products_man.addEventListener("click", show_products_man);

// if Click filter_products_woman
filter_products_woman.addEventListener("click", show_products_woman);

// if Click categories_products_all
categories_products_all.addEventListener("click", () => {
  filter_products_all.click();
});

// if Click filter_products_man
categories_products_man.addEventListener("click", () => {
  filter_products_man.click();
});

// if Click filter_products_woman
categories_products_woman.addEventListener("click", () => {
  filter_products_woman.click();
});

// append child for product main
function appendProductInPage() {
  
  // array for price products
  let array_price = [99.99,199.99,159.99,229.99,129.99,219.99,139.99,259.99,329.99,149.99,259.99,79.99,119.99,269.99];
  for(let i = 0; i < 2; i++) {
    let type_model;
    i != 0 ? type_model = "woman" : type_model = "man";
    for(let counter_product = 1; counter_product<= 14; counter_product++) {
      let num = 0;
      counter_product < 10 ? num = `0${counter_product}` : num = counter_product;
      let product_item = document.createElement("div");
      product_item.className = "col-md-4 product-item text-decoration-none text-black";
      product_item.setAttribute("data-count",num);
      product_item.setAttribute("data-gender",type_model);
      product_item.innerHTML = `  
      <div class="card p-0 mb-3 shadow">
        <a class="img-product" data-gender="${type_model}" data-count="${num}" >
          <img src="img/models/${type_model}_models/model_${num}_main.jpg" class="card-img-top product-item-img">
        </a>
        <div class="card-body">
          <p class="card-title fs-4 fw-light">Cloths</p>
          <p class="card-text fs-5 m-0 fw-light">M/L/X/XL</p>
          <ul class="list-unstyled text-center m-0">
            <li class="fa-solid fa-star fs-5 ms-1 li-start"></li>
            <li class="fa-solid fa-star fs-5 ms-1 li-start"></li>
            <li class="fa-solid fa-star fs-5 ms-1 li-start"></li>
            <li class="fa-solid fa-star fs-5 ms-1 li-start"></li>
            <li class="fa-solid fa-star fs-5 ms-1 li-start"></li>
          </ul>
          <p class="text-center m-0 fs-4 text-secondary price">${array_price[counter_product-1]}$</p>
                  <div class="pb-2 d-flex justify-content-center align-items-center select_quantity">
                      <li class="list-inline-item text-main user-select-none sub-quantity no-drop">-</li>
                      <li class="list-inline-item btn btn-secondary user-select-none value-quantity">1</li>
                      <li class="list-inline-item text-main user-select-none add-quantity">+</li>
                  </div>
          <p class="text-main text-white d-block m-0 mb-1 user-select-none add_cart">Add Card</p>
        </div>
      </div>`
      main_product.appendChild(product_item);
    }
  }
}

// evaluation product use start 
evaluation();

// if add product in cart
let arrayOfProductCart = [];
let btn_add_cart = document.querySelectorAll(".add_cart");

// check cart product in localStorage
if(window.localStorage.getItem("cartItems")) {
  arrayOfProductCart = JSON.parse(window.localStorage.getItem("cartItems"));
}

// if click add cart 
btn_add_cart.forEach((productAddCart,proIndex) => {
  productAddCart.addEventListener("click", () => {
    countNewProductOfCart.style.display = "inline";
    notices.innerHTML++;
    window.localStorage.setItem("notices",notices.innerHTML);
    let quantityProduct = productAddCart.parentElement.querySelector(".value-quantity").textContent;
    let priceProduct = parseInt(productAddCart.parentElement.querySelector(".price").textContent);
    addProductToArrayCart(proIndex,quantityProduct,priceProduct,productItems[proIndex].dataset.gender);
  })
})

// add Product To Array Cart
function addProductToArrayCart(productItem,quantityProduct,productPrice,gender) {
  const productItemFromCart = {
    id:productItem,
    quantity: quantityProduct,
    price: productPrice,
    type: gender,
    completed: false
  };
  arrayOfProductCart.unshift(productItemFromCart);
  addCartItemsToLocalStorage(arrayOfProductCart);
}

// storage product cart for localStorage  
function addCartItemsToLocalStorage(arrayOfProductCart) {
  window.localStorage.setItem("cartItems", JSON.stringify(arrayOfProductCart));
}

// if select categories filter
select_categories.forEach((title) => {
  title.addEventListener("click", () => {
    if (title.classList.contains("active")) {
      title.classList.remove("active");
      title.querySelector(".angle").className = "fa-solid fa-angle-down float-end bg-dark text-light angle";
    } else {
      select_categories.forEach((select) => {
        select.classList.remove("active");
        select.querySelector(".angle").className = "fa-solid fa-angle-down float-end bg-dark text-light angle";
      })
      title.classList.add("active");
      title.querySelector(".angle").className = "fa-solid fa-angle-up float-end bg-dark text-light angle";
    }
  })
})

// Categories Filter by type gender
function filterProducts() {
  type_filter_products.forEach((type_filter) => {
    type_filter.addEventListener("click", () => {
      type_filter_products.forEach((type_filter) => {
        type_filter.classList.remove("active");
      })
      type_filter.classList.add("active")
    })
  }) 
}

// show product default
function default_product_page() {
  angle_page_previous.classList.add("none_active");
  productItems.forEach((pro) => {
    pro.classList.remove("active");
  })
  productItems.forEach((pro, index_pro) => {
    if (index_pro <= 8) {
      pro.classList.add("active");
    }
  })
}

// if angle_page_next 
function next_product_page() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
  angle_page_previous.classList.remove("none_active")
  productItems.forEach((pro, index_pro) => {
    pro.classList.remove("active");
  })
  productItems.forEach((pro, index_pro) => {
    if((index_pro > numProductsDefaultPage) && (index_pro < numProductsGoalPage)) {
      pro.classList.add("active");
    }
  })
  if(main_product.lastElementChild.classList.contains("active")) {
    angle_page_next.classList.add("none_active")
  } else {
    numProductsDefaultPage = numProductsDefaultPage + 9;
    numProductsGoalPage = numProductsGoalPage + 9;
  }
}

// if angle_page_previous 
function previous_product_page() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
  angle_page_next.classList.remove("none_active")
  if (numProductsGoalPage == 18) {
    default_product_page();
  } else {
    numProductsDefaultPage = numProductsDefaultPage - 9;
    numProductsGoalPage = numProductsGoalPage - 9;
    productItems.forEach((pro, index_pro) => {
      pro.classList.remove("active");
    })
    productItems.forEach((pro, index_pro) => {
      if((index_pro > numProductsDefaultPage) && (index_pro < numProductsGoalPage)) {
        pro.classList.add("active");
      }
    })
  }
}

// Show All Products 
function show_products_all() {
  numProductsDefaultPage = 8;
  numProductsGoalPage = numProductsDefaultPage + 10;
  default_product_page();
  angle_page_next.classList.contains("none_active") ? angle_page_next.classList.remove("none_active") : "";
}

// Show man Products 
function show_products_man() {
  angle_page_next.classList.add("none_active")
  productItems.forEach((pro,index_pro) => {
    pro.classList.remove("active");
  })
  productItems.forEach((pro,index_pro) => {
    if(pro.dataset.gender == "man") {
      pro.classList.add("active");
    }
  })
}

// Show Woman Products 
function show_products_woman() {
  angle_page_next.classList.add("none_active")
  productItems.forEach((pro,index_pro) => {
      pro.classList.remove("active");
  })
  productItems.forEach((pro,index_pro) => {
    if(pro.dataset.gender == "woman") {
      pro.classList.add("active");
    }
  })
}

// evaluation function
function evaluation() {
  productItems.forEach((pro,index_pro) => {
    let li_start = pro.querySelectorAll(`.li-start`);
    let random_start = (Math.ceil(Math.random()* 5));
    li_start.forEach((start,index_start) => {
    index_start < random_start ? start.classList.add("text-warning") : start.classList.add("text-muted");
  })
})
}

// Initialize tooltips
let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
})

// quantity product
let selectQuantity = document.querySelectorAll(".select_quantity");
let valueQuantity = document.querySelector(".product-item .value-quantity");
let addQuantity = document.querySelector(".product-item .add-quantity");

selectQuantity.forEach((quantity) => {
  let subQuantity = quantity.querySelector(".sub-quantity");
  let valueQuantity = quantity.querySelector(".value-quantity");
  let addQuantity = quantity.querySelector(".add-quantity");
  subQuantity.addEventListener("click", () => {
    valueQuantity.innerHTML > "1"? subQuantity.classList.remove("no-drop"): subQuantity.classList.add("no-drop"); 
    valueQuantity.innerHTML != "1" ? valueQuantity.innerHTML--: false;
  })

  addQuantity.addEventListener("click", () => {
    valueQuantity.innerHTML > "1"? subQuantity.classList.remove("no-drop"): subQuantity.classList.add("no-drop"); 
    valueQuantity.innerHTML++;
  })
})