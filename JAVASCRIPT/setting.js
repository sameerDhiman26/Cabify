let form = document.getElementById("passwordForm");
form.addEventListener("submit",async (e) => {
    e.preventDefault();

let currentPassword = document.getElementById("currentPassword").value;
let newPassword = document.getElementById("newPassword").value;
let confirmPassword = document.getElementById("confirmPassword").value;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(currentUser)
if(currentPassword==="" || newPassword==="" || confirmPassword===""){
    alert("fill form")
    return ;
}
if(currentPassword!==currentUser.password){
    alert("password is wrong");
    return;
}
if(confirmPassword!==newPassword){
    alert("new password not match");
    return;
}
   let updatedUser ={
    ...currentUser,
    password:newPassword
    
   }
   let res = await fetch(`http://localhost:3000/users/${currentUser.id}`,{
    "method":"PUT",
     headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
   })
    if (res.ok) {
        alert("Password updated successfully");

       
        currentUser.password = newPassword;
        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );

        form.reset();
    } else {
        alert("Failed to update password");
    }
});