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
const loginboton = document.querySelector("label.login_radio");
const signupboton = document.querySelector("label.sign_upRadio");
const linkregistro = document.querySelector("form .link a");

        signupboton.onclick = (()=>{
            loginForm.style.marginLeft = "-50%";
            loginText.style.marginLeft = "-50%";
        });

        loginboton.onclick = (()=>{
            loginForm.style.marginLeft = "0%";
            loginText.style.marginLeft = "0%";
        });

        linkregistro.onclick = (()=>{
            signupboton.onclick();
            return false;
        });
