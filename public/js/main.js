//
const loginBtn = document.querySelector(".login__button");
const registerBtn = document.querySelector(".register__button");

openAnotherWindow = (button, path) => {
  button.addEventListener("click", () => {
    window.location.href = path;
  });
};

openAnotherWindow(registerBtn, "/user/register");
openAnotherWindow(loginBtn, "/user/login");

const registerForm = document.querySelector("#register-form");
