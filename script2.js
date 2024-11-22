//login things
let auth = document.getElementById('auth')
let loginform = document.getElementById('loginform')
let loginemail = document.getElementById('email')
let loginpassword = document.getElementById('password')
let loginbtn = document.getElementById('loginbtn')
let loginerror = document.getElementById('error')
let registerButton = document.getElementById('registerButton')

//register
let register = document.getElementById('register')
let backToLogin = document.getElementById('backToLogin')
let registerForm = document.getElementById('registerForm')
let registerEmail = document.getElementById('registerEmail')
let registerPassword = document.getElementById('registerPassword')
let registerError = document.getElementById('registerError')

//welcome
let welcome = document.getElementById('welcome')

function toggleview(view) {
    auth.style.display = view === "auth" ? "block" : "none"
    register.style.display = view === "register" ? "block" : "none"
    welcome.style.display = view === "welcome" ? "block" : "none"
}

registerButton.addEventListener('click', () => toggleview("register"))
backToLogin.addEventListener('click', () => toggleview("auth"))

loginform.addEventListener('submit', handlelogin)

registerForm.addEventListener('submit', handleregister)

async function handlelogin(e) {
    e.preventDefault()

    let email = loginemail.value
    let password = loginpassword.value

    console.log(email);
    console.log(password);

    const response = await fetch('http://localhost:3000/users');
    const users = await response.json()

    console.log(users);


    const user = users.find(u => u.e === email && u.p === password)

    if (user) {

        console.log('login');
        toggleview("welcome");

    }
    else {
        console.log('not found');

    }

}

async function handleregister(e) {
    e.preventDefault();
    let resemail = registerEmail.value.trim()
    let respwd = registerPassword.value.trim()
    console.log(resemail + " " + respwd);
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json()

    console.log(users);
    const user = users.find(u => u.e === email && u.p === password)

    if(user){
        registerError.innerText="user already exits"
        return
    }
    
    fetch('http://localhost:3000/users',{
        method:'post',
        headers:{
            content:"application/json"
    },
     body:JSON.stringfy({email:resemail,password:respwd})
    })
    toggleview("auth")

}