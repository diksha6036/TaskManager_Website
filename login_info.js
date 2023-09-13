function checkDetails(){
    let email=document.getElementById("email").value;
    let pass=document.getElementById("pass").value;

    let getemail=localStorage.getItem("UserEmail");
    let getpass=localStorage.getItem("UserPass");
    let regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    if(email===getemail && email.match(regex)){
        if(pass===getpass){
           window.location.assign("task_manager_page.html");
        }
        else{
            alert("Wrong Password");
        }
    }
    else{
        alert("Invalid Details");
    }
   
}

function redirect () {
alert('Logged In Successfully')
  }