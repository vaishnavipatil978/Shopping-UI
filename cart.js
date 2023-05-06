if(localStorage.getItem("currentUser") == null){
    alert("Please login!");
    window.location.href = "/login.html"
}

var ItemsToRender = [];
loadItems();

function loadItems(){

    var products = JSON.parse(localStorage.getItem("products"));

    products.forEach((item)=>{
        if(item.quantity > 0){
            ItemsToRender.push(item)
        }
    });

    if(ItemsToRender.length == 0){

        document.getElementById("main_card").style.display="none";
       
        document.getElementById("no_item_card").innerHTML=`No Item Added To Cart
        <div><a href="/shop.html">Shop Now</a></div>`;
    
        return;
    }

    document.getElementById("no_item_card").style.display="none";

    renderItems();

}

function renderItems(){

    var item_container = document.getElementById("item_container");
    item_container.innerHTML="";

    console.log(ItemsToRender);

    for(let i = 0 ; i < ItemsToRender.length ; i++){
        var product = ItemsToRender[i];
        var productDiv = document.createElement("div");
        productDiv.classList.add("card");

        productDiv.innerHTML = `
              <div>
                <img src=${product.image} alt="">
              </div>

              <div class="infoDiv">
                <div>Title : ${product.title.substring(0,15)} </div>
                <div>Price : ${product.price*product.quantity} (${product.quantity})</div>
              </div>

              <div>
                <button onclick="removeItem(${i})">Remove From Cart</button>
              </div>`;

        item_container.appendChild(productDiv);
    };

    renderList();
}

function renderList(){
    var list_container = document.getElementById("items_list");

    let index =1;
    let total = 0;

    list_container.innerHTML="";

    ItemsToRender.forEach((data)=>{
        var product = document.createElement("div");
        product.classList.add("item");

            product.innerHTML = `
            <div>${index}. ${data.title.substring(0,15)+"..."}</div>
            <div>$${data.price*data.quantity}</div>`;

            total += data.price*data.quantity;

            index++;
        list_container.appendChild(product);
    })

    document.getElementById("items_total").innerHTML = `$${total.toFixed(2)}`;
}

function removeItem(index){
    console.log(index+" index");
    var product = ItemsToRender[index];
    var product_id = product.id;

    console.log(product_id+ " product id");

    var products = JSON.parse(localStorage.getItem('products'));
    products[product_id-1].quantity = 0;
    localStorage.setItem("products",JSON.stringify(products));

    ItemsToRender.splice(index,1);
    console.log(ItemsToRender+ " items after removing")
    renderItems();
}

function checkOut(){
    
     var products = JSON.parse(localStorage.getItem("products"));
     
     products.forEach((item)=>{
        item.quantity = 0;
     });

     localStorage.setItem("products",JSON.stringify(products));

     alert("Order Placed Successfully!");
     window.location.href = "/shop.html";
}