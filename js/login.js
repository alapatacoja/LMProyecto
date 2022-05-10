import {
  login,
} from "./js_general.js"

const loginForm = document.getElementById("login");

loginForm.addEventListener("submit",async (e) => {
  e.preventDefault();
  const userName = loginForm["username"];
  const pswd = loginForm["password"];


  try{
      console.log("Username "+userName.value+" Password: "+pswd.value);
      await login(userName.value,pswd.value);
  }catch (eror){
      console.log(error);
  }
});