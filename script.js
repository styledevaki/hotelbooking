//login things
let auth=document.getElementById('auth')
let loginForm=document.getElementById('loginForm')
let loginemail=document.getElementById('email')
let loginpassword=document.getElementById('password')
let loginbtn=document.getElementById('loginbtn')
let loginerror=document.getElementById('error')
let registerButton=document.getElementById('registerButton')


//register
let register=document.getElementById('register')
let backtologin=document.getElementById('backToLogin')
let registerForm=document.getElementById('registerForm')
let registerEmail=document.getElementById('registerEmail')
let registerPassword=document.getElementById('registerPassword')
let registerError=document.getElementById('registerError')


//welcome
let welcome=document.getElementById('welcome')

function toggleview(view){
     auth.style.display=view==="auth"?"block":"none"
     register.style.display=view==="register"?"block":"none"
     welcome.style.display=view==="welcome"?"block":"none"
}

registerButton.addEventListener('click',()=>toggleview("register"))
backtologin.addEventListener('click',()=>toggleview("auth"))

loginForm.addEventListener('submit',handleLogin)

registerForm.addEventListener('submit',handleregister)


async function handleLogin(e) {
    e.preventDefault();
    const email = loginemail.value.trim();
    const password = loginpassword.value.trim();

    const res=await fetch('http://localhost:3000/users')
    const users= await res.json();

    console.log(users);

   const user=users.find(u=>u.email===email && u.password===password)

   if(user){
    console.log('found');
    toggleview("welcome")
    
   }else{
    console.log("not found");
    
   }
    
    
    
}

async function handleregister(e){
    e.preventDefault();
    let resemail=registerEmail.value.trim()
    let respwd=registerPassword.value.trim()
    console.log(resemail +"   "+respwd);
    const res=await fetch('http://localhost:3000/users')
    const users= await res.json();

    console.log(users);

   const user=users.find(u=>u.email===email && u.password===password)
   console.log(user);
   
   if(user){
    registerError.innerText="user already exist"
    return
   }
  
   fetch('http://localhost:3000/users',{
    method:'post',
    headers:{
        content:"application/json"
    },
    body:JSON.stringify({email:resemail,password:respwd})
})
 toggleview("auth")
    
}
