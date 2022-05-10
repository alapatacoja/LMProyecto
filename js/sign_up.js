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