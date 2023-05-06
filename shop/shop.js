if(localStorage.getItem("currentUser") == null){
  alert("Please login!");
  history.back();
}


onload();

function onload(){
  console.log("onload");
  // get all products
  products = JSON.parse(localStorage.getItem("products"));

  renderItems();
}

var products;
// render to HTML
function renderItems(){

  console.log("rendering items ");

  document.getElementById("filteredProducts").style.display = "none";
  document.getElementById("loadedProducts").style.display = "block";

  var mensSection = document.getElementById("men_clothing");
  var womensSection = document.getElementById("women_clothing");
  var jewelerySection = document.getElementById("jewelery");
  var electronicsSection = document.getElementById("electronics");

  mensSection.innerHTML = "";
  womensSection.innerHTML = "";
  jewelerySection.innerHTML = "";
  electronicsSection.innerHTML = "";

  products.forEach(function (product) {
    var newdiv = document.createElement("div");
    newdiv.classList.add("item");
    newdiv.classList.add("card");
    var filler = (product.title.length>40?'...':'');
    newdiv.innerHTML = `<div class="image_container">
           <img src=${product.image} alt="Item" class="card_image"/>
        </div>
        <h4>${product.title.substring(0,40)}${filler}</h4>
        <div class="info">
          <div class="row">
            <div class="price">$${product.price}</div>
            <div class="sized">${product.size[0]} ${product.size[1]}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              <div class="circle" style="background-color: ${product.color[0]}"></div>
              <div class="circle" style="background-color: ${product.color[1]}"></div>
            </div>
          </div>
          <div class="row">Rating: <b>${product.rating.rate}</b> (${product.rating.count})</div>
        </div>`;

        if(product.quantity == 0){
          newdiv.innerHTML += `<div class="btn_container" id="${product.id+"btnId"}">
              <div onclick="addToCart(${product.id})" class="add_to_cart_btn" >Add To Cart</div>
          </div>`;
        }
        else{

          newdiv.innerHTML += `<div class="btn_container" id="${product.id+"btnId"}">
              <div class="modify_btn" onclick="decrement(${product.id})">-</div>
              <div>${product.quantity}</div>
              <div class="modify_btn"  onclick="increment(${product.id})">+</div>
          </div>`;

        }

    if (product.category == "men's clothing") {
      mensSection.appendChild(newdiv);
    } else if (product.category == "women's clothing") {
      womensSection.appendChild(newdiv);
    } else if (product.category == "jewelery") {
      jewelerySection.appendChild(newdiv);
    } else {
      electronicsSection.appendChild(newdiv);
    }
  });

  console.log("finished rendering");

}


//filtering functions
var color_filters = [];
var size_filters=[];
var price_filters = [];
var selectedCartegory = "all";

//check filters
function check_filters(){
  console.log("checking filters ",size_filters.length==0);

  if(color_filters.length==0 && price_filters.length==0  && size_filters.length==0 && document.getElementById("range").value==0 && selectedCartegory=="all"){
    console.log("No filters")
    renderItems();
    return;
  }

  ApplyFilters();
}

function ratingChanged(){
  console.log("rating changed");
  check_filters();
}

// filter by category
function category_filter(category){
  console.log("changed category");

  document.getElementById(selectedCartegory).classList.remove("active");
  document.getElementById(category).classList.add("active");
  selectedCartegory = category;

  check_filters();
}

// filter by size
function filterByColor(ele) {
  console.log("color filter");
  if (ele.checked) {
    color_filters.push(ele.value);
  } 
  else {
    color_filters.splice(color_filters.indexOf(ele.value), 1);
  }

  check_filters();
}


//filter by color
function filterBySize(ele){
  console.log("size filter");
  if (ele.checked) {
    size_filters.push(ele.value);
  } else {
    size_filters.splice(size_filters.indexOf(ele.value), 1);
  }

  check_filters();
}

// filter by price
function filterByPrice(ele,letter){

  if(ele.checked) {
    price_filters.push(letter);
  }
  else{
    price_filters.splice(price_filters.indexOf(letter), 1);
  }

  check_filters();
}


// functions to apply filters
function ApplyFilters(){

  var products = localStorage.getItem("products");
  products=JSON.parse(products);

  console.log("all products",products);

  var filteredProducts = [];

  products.forEach(function(item){

    if( color_filters.length==0 || (color_filters.includes(item.color[0]) || color_filters.includes(item.color[1])) ) {
      
      if( size_filters.length==0 || (size_filters.includes(item.size[0]) || size_filters.includes(item.size[1])) ) {
        if(item.rating.rate >= document.getElementById("range").value){

          if(checkPrices(item.price)){

            if(selectedCartegory=="all" || item.category.startsWith(selectedCartegory)){
              console.log("matched");
              filteredProducts.push(item);
            }

          }
        }
      }
    }
  });

  console.log(filteredProducts);

  renderFilteredItems(filteredProducts);
}

function checkPrices(price) {
  return price_filters.length==0 || (price>=0 && price<=25 && price_filters.includes('a')) || (price>25 && price<=50 && price_filters.includes('b')) || (price>50 && price<=100 && price_filters.includes('c'))|| (price>100 && price_filters.includes('d'));
}


// filtering by search inputs
function filterItems() {

  console.log("searching by search inputs");

  var searchValue = document.getElementById("search").value;

  if(!searchValue){
    renderItems();
    return;
  }

  var products = localStorage.getItem("products");
  products=JSON.parse(products);

  var filteredItems = products.filter((item) => {
    var stringifiedItem = JSON.stringify(item);
    return stringifiedItem.toLowerCase().includes(searchValue.toLowerCase());
  });

  renderFilteredItems(filteredItems);
}

function renderFilteredItems(filteredItems) {
  document.getElementById("loadedProducts").style.display = "none";

  var filteredDiv = document.getElementById("filteredProducts");
  filteredDiv.innerHTML = "";
  filteredDiv.style.display = "flex";

  if(filteredItems.length == 0) {
    filteredDiv.innerHTML = `<div id="errorDiv">Couldn't find any...</div>`;
    return;
  }

  console.log("calling renderFilteredItems")

  filteredItems.forEach(function (product) {
    var newdiv = document.createElement("div");
    newdiv.classList.add("item");
    newdiv.classList.add("card");
    var filler = (product.title.length>40?'...':'');
    newdiv.innerHTML = `<div class="image_container">
           <img src=${product.image} alt="Item" class="card_image"/>
        </div>
        <h4>${product.title.substring(0,40)}${filler}</h4>
        <div class="info">
          <div class="row">
            <div class="price">$${product.price}</div>
            <div class="sized">${product.size[0]} ${product.size[1]}</div>
          </div>
          <div class="colors">
            Colors:
            <div class="row">
              <div class="circle" style="background-color: ${product.color[0]}"></div>
              <div class="circle" style="background-color: ${product.color[1]}"></div>
            </div>
          </div>
          <div class="row">Rating: <b>${product.rating.rate}</b> (${product.rating.count})</div>
        </div>`;

        if(product.quantity == 0){
          newdiv.innerHTML += `<div class="btn_container" id="${product.id+"btnId"}">
              <div onclick="addToCart(${product.id})" class="add_to_cart_btn" >Add To Cart</div>
          </div>`;
        }
        else{

          newdiv.innerHTML += `<div class="btn_container" id="${product.id+"btnId"}">
              <div class="modify_btn" onclick="decrement(${product.id})">-</div>
              <div>${product.quantity}</div>
              <div class="modify_btn"  onclick="increment(${product.id})">+</div>
          </div>`;

        }

        filteredDiv.appendChild(newdiv);
      
      });
}


// adding 1 quantity
function addToCart(index){
  console.log("adding to cart");

  var products = JSON.parse(localStorage.getItem("products"));
  products[index-1].quantity = 1;

  var btn_container=document.getElementById(index+"btnId");
  btn_container.innerHTML = `<div class="modify_btn" onclick="decrement(${index})">-</div>
  <div>${products[index-1].quantity}</div>
  <div class="modify_btn"  onclick="increment(${index})">+</div>`;

  localStorage.setItem("products", JSON.stringify(products));
}

// adding more quantities
function increment(index) {
  console.log("increment item: " + index);

  var products = JSON.parse(localStorage.getItem("products"));
  products[index-1].quantity = products[index-1].quantity+1;

  var btn_container=document.getElementById(index+"btnId");
  btn_container.innerHTML = `<div class="modify_btn"  onclick="decrement(${index})">-</div>
  <div>${products[index-1].quantity}</div>
  <div class="modify_btn"  onclick="increment(${index})">+</div>`;

  localStorage.setItem("products", JSON.stringify(products));
}

// decrease quantity
function decrement(index){

  console.log("decrement item: " + index);

  var products = JSON.parse(localStorage.getItem("products"));
  products[index-1].quantity = products[index-1].quantity-1;

  var btn_container=document.getElementById(index+"btnId");

  if(products[index-1].quantity==0){
    btn_container.innerHTML = `<div onclick="addToCart(${index})" class="add_to_cart_btn">Add To Cart</div>`;
  }
  else{
     btn_container.innerHTML = `<div class="modify_btn" onclick="decrement(${index})">-</div>
     <div>${products[index-1].quantity}</div>
     <div class="modify_btn"  onclick="increment(${index})">+</div>`;
  }

  localStorage.setItem("products", JSON.stringify(products));

}
