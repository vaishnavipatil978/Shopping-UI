if(localStorage.getItem("currentUser") != null){
  alert("Please logout first!");
  history.back();
}

async function loginUser(){

    console.log("user login");

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(!email || !password){
      alert("Please fill all fields...");
      return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var userIndex = -1;

    for(let i = 0 ; i < users.length ; i++){
      if(email == users[i].email){
        userIndex = i;
        break;
      }
    }

    if (userIndex==-1){ 
      alert("User does not exists ! Please sign up...");
      window.location.href="/signup/index.html";
      return;
    }

    if(users[userIndex].password != password){
        alert("Password is incorrect!")
        return;
    }

    var currentUser = {
      firstName: users[userIndex].firstName,
      lastName: users[userIndex].lastName,
      email: users[userIndex].email,
      password: users[userIndex].password,
      token : generateString(),
      id : userIndex
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    await fetchShopItems();
    
    window.location.href = "/shop/index.html";
}

function generateString() {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < 16; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

async function fetchShopItems(){
  console.log("fetching shop items...");
  // fetch data and call next function
  await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      console.log("fetching products ");
      // add color and size
      addColorAndSize(products);
    });
}

function addColorAndSize(products) {

  // array containing sizes and colors
  var colors = ["red", "blue", "black", "white", "green"];
  var sizes = ["S", "M", "L", "XL"];

  console.log("adding color");

  // assign randomly

  products.forEach((item) => {
    item.color = [];
    item.size = [];
    item.color[0] = colors[Math.floor(Math.random() * colors.length)];
    item.size[0] = sizes[Math.floor(Math.random() * sizes.length)];

    var nextColor = colors[Math.floor(Math.random() * colors.length)];
    var nextSize = sizes[Math.floor(Math.random() * sizes.length)];

    while (item.color.includes(nextColor)) {
      nextColor = colors[Math.floor(Math.random() * colors.length)];
    }

    while (item.size.includes(nextSize)) {
      nextSize = sizes[Math.floor(Math.random() * sizes.length)];
    }

    item.color[1] = nextColor;
    item.size[1] = nextSize;
    item.quantity = 0;
  });

  console.log("storing");

  // add to local storage
  localStorage.setItem("products", JSON.stringify(products));

}