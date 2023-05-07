if(localStorage.getItem("currentUser") != null){
    alert("Please logout first!");
    history.back();
}

function signupData() {

    console.log("here");

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;   
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if(firstName == "" || lastName == "" || email == "" || password == "" || confirmPassword == ""){
        alert("All fields are required");
        return;
    }

    if(password!= confirmPassword){
        alert("Passwords do not match");
        return;
    }

    if(password.length < 6){
        alert("Password must have at least 6 characters");
        return;
    }

    var newUser = userData(firstName, lastName, email, password);

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.find((user) => user.email === email);
    if (userExists) {
      alert("User already exists");
      window.location.href = "login.html";
      return;
    }

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "login.html";

}

function userData(firstName, lastName, email,password){
    return {firstName:firstName,lastName:lastName,email:email,password:password};
}