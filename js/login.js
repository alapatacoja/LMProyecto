import {
  login,
} from "./js_general.js"

const loginForm = document.getElementById("loginForm");
console.log(loginForm);

loginForm.addEventListener("submit",async (e) => {
  e.preventDefault();
  const email = loginForm["emailLogin"];
  const pswd = loginForm["passwordLogin"];


  try{
      console.log("Username "+email.value+" Password: "+pswd.value);
      await login(email.value,pswd.value);
  }catch (eror){
      console.log(error);
  }
});