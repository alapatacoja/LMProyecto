import {
    register,
} from "./js_general.js"

const signForm = document.getElementById("signupForm");

signForm.addEventListener("submit",async (e) => {
    e.preventDefault();
    const email = signForm["emailRegistro"];
    const pswd = signForm["passwordRegistro"];
    const pswdConfirm = signForm["confirmPasswordRegistro"];
    const message = document.getElementById("passwordErronea");


    try{

        let psString = pswd.value;
        let psConfirmString = pswdConfirm.value;
        let contMinus = hasLowerCase(psString);
        let contMayus = hasUpperCase(psString);

        if (!contMinus){
            message.innerText = "El email no contiene ninguna minuscula";
        }
        else if(!contMayus){
            message.innerText = "El email no contiene ninguna mayuscula";
        }
        else if(psString !== psConfirmString){
            message.innerText = "Ambas contraseñas no son iguales";
        }
        /**
        else if(psString.length < 8){
            message.innerText = "La contraseña debe tener como mínimo 8 caracteres";
        }
        */
        else{
            console.log("email:  "+email.value+" Password: "+psString);
            await register(email.value,pswd.value);
        }
    }catch (eror){
        console.log(error);
    }
});

    function hasUpperCase(str){
        let contMinus = false;
        for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0) && contMinus == false; i++){
            let charac = String.fromCharCode(i);
            if (str.includes(charac)){
                contMinus = true;
            }
        }
        return contMinus;
    }

    function hasLowerCase(str){
        let contMinus = false;
        for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0) && contMinus == false; i++){
            let charac = String.fromCharCode(i);
            if (str.includes(charac)){
                contMinus = true;
            }
        }
        return contMinus;
    }


//login slider uwu

const loginText = document.querySelector(".titulo-texto .login");
const loginForm = document.querySelector("form.login");
const loginboton = document.querySelector("#login_radio");
const signupboton = document.querySelector("#sign_upRadio");
const linkregistro = document.getElementById('enlace');

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
            signupboton.onclick();
            signupboton.checked = true;
            return false;
        });
