function addData(){
let email=document.getElementById("email").value;
let pass=document.getElementById("pass").value;

 localStorage.setItem("UserEmail",email);
 localStorage.setItem("UserPass",pass);
}
