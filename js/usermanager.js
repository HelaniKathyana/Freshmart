var backendUrl = backendBaseUrl || "http://localhost:5000"
var userController = "/api/users/"

// Test Login
function loginTest(){
    login("timethsws@gmail.com","Qwerty1@")

}

// Login User
function login(username,password,redirect){
    var body = {
        username,
        password
    }
    var xhr = new XMLHttpRequest();

    xhr.open("POST", backendUrl+userController +"login", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
    xhr.onload = function (){
        var response = JSON.parse(this.responseText);
        console.log(response)
        if(response.status == true){
            var user = response.value
            localStorage.setItem("user",JSON.stringify(user));
            window.location.href = redirect || "UserHome.html"
        }
    }
}

// Test Signup
function signupTest(){
    signup("timethsws@gmail.com","Qwerty1@","Timeth Subasinghe")
}

// User sign up
function signup(userName,email,password,gender){
    var body = {
        id: "00000000-0000-0000-0000-000000000000",
        email,
        password,
        userName,
        gender:parseInt,
    }
    var xhr = new XMLHttpRequest();

    xhr.open("POST", backendUrl+"/api/users/register", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
    xhr.onload = function (response){
        if(response.status == true){

            window.location.href = "login.html"
        }

    }
}

// Check if a user is logged in
function CheckUser(){
    var user = localStorage.getItem("user");
    if(user != undefined && user != null){
        return true;
    }
    return false;
}

function getUser(){
    var user = localStorage.getItem("user");
    if(user != undefined && user != null){
        return JSON.parse(user);
    }
    window.location.href = "login.html"
}

// Logout a user
function logout(){
    localStorage.removeItem("user")
    window.location.href = "login.html"
}
