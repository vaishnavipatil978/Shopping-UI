
if(localStorage.getItem("currentUser") == null){
    alert("Please login!");
    window.location.href = "login.html"
}

var currentUser;
var users;
var userIndex;

var msgDiv1 = document.getElementById("msgDiv1");

var msgDiv2 = document.getElementById("msgDiv2");

function fillDefault(){
    console.log("fillDefault");

    users = JSON.parse(localStorage.getItem('users'));

    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    userIndex = currentUser.id;

    document.getElementById("firstName").value = currentUser.firstName;
    document.getElementById("lastName").value = currentUser.lastName;
}

function hideMsg(msgDiv) {
    msgDiv.innerHTML ='';
    msgDiv.style.visibility = "hidden";
}

function saveInfo(){
    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("lastName").value;

    if(!firstname || !lastname){
        msgDiv1.innerHTML = "Please fill both values.";
        msgDiv1.style.color = "red";
        msgDiv1.style.visibility = "visible";
        return;
    }

    users[userIndex].firstName = firstname;
    users[userIndex].lastName = lastname;
    currentUser.firstName = firstname;
    currentUser.lastName = lastname;

    msgDiv1.innerHTML = "Information saved successfully";
    msgDiv1.style.color = "green";
    msgDiv1.style.visibility = "visible";

    console.log(msgDiv1);

    saveToStorage()
}

function saveToStorage(){
    console.log(users);
    localStorage.setItem('users', JSON.stringify(users));
}

function changePassword(){

    var oldPassword = document.getElementById('oldPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmNewPassword').value;


    if(!oldPassword || !newPassword || !confirmPassword){
        msgDiv2.innerHTML = "Please fill all values.";
        msgDiv2.style.color = "red";
        msgDiv2.style.visibility = "visible";
        return;
    }

    if(currentUser.password != oldPassword){
        msgDiv2.innerHTML = "User password do not match.";
        msgDiv2.style.color = "red";
        msgDiv2.style.visibility = "visible";
        return;
    }

    if(newPassword.length < 6){
        msgDiv2.innerHTML = "New password must have at least 6 characters";
        msgDiv2.style.color = "red";
        msgDiv2.style.visibility = "visible";
        return;
    }

    if(newPassword!= confirmPassword){
        msgDiv2.innerHTML = "New passwords do not match.";
        msgDiv2.style.color = "red";
        msgDiv2.style.visibility = "visible";
        return;
    }

    users[userIndex].password=newPassword;
    currentUser.password=newPassword;

    msgDiv2.innerHTML = "Password changed successfully";
    msgDiv2.style.color = "green";
    msgDiv2.style.visibility = "visible";

    saveToStorage();

}

function logoutUser(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("products");
    window.location.href = "index.html";
}