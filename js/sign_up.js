import {
    register,
} from "./js_general.js"

const signForm = document.getElementById("signup");

signForm.addEventListener("submit",async (e) => {
    e.preventDefault();
    const userName = signForm["username"];
    const pswd = signForm["password"];


    try{
        console.log("Username "+userName.value+" Password: "+pswd.value);
        await register(userName.value,pswd.value);
    }catch (eror){
        console.log(error);
    }
});



//login slider uwu

const loginText = document.querySelector(".login-titulo");
const loginForm = document.querySelector("form.login");
const loginboton = document.querySelector("#login_radio");
const signupboton = document.querySelector("#sign_upRadio");
const linkregistro = document.querySelector(".link a");
console.log(linkregistro);

        signupboton.onclick = (()=>{
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        });

        loginboton.onclick = (()=>{
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
        });

        linkregistro.onclick = (()=>{
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
            return false;
        });
