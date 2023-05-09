const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const header = document.querySelector("header");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function logout(){
  localStorage.removeItem(USER_LS);
  deleteAllTodo();
  header.classList.remove(SHOWING_CN);
  form.classList.add(SHOWING_CN);
  greeting.classList.remove(SHOWING_CN);
  input.value = "";
}

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(e){
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName(){
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerHTML=`Hello ! ${text}`;
  header.classList.add(SHOWING_CN);

  header.addEventListener("click", logout);
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  }else{
    paintGreeting(currentUser);
  }
}

function init(){
  loadName();
  header.addEventListener("click", logout);
}
// 새로고침할 경우 임시로 값 삭제하는 코드
init();


