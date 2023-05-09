const form2 = document.querySelector(".js-toDoForm");
const input2 = form2.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteTodo(e){
  const delete_btn = e.target;
  const delete_li = delete_btn.parentNode;
  toDoList.removeChild(delete_li);
  
  const cleanTodos = toDos.filter(function(todo){
    return todo.id !== parseInt(delete_li.id);
  });
  console.log(cleanTodos);
  toDos = cleanTodos;
  saveTodo();
}

function saveTodo(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length+1;
  
  delBtn.innerHTML = "❌";
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;

  delBtn.addEventListener("click",deleteTodo);

  toDoList.appendChild(li);

  const toDoObj = {
    text : text,
    id : newId
  }
  toDos.push(toDoObj);
  saveTodo();
}

function handleSubmit(e){
  e.preventDefault();
  paintTodo(input2.value);
  input2.value = "";
}
function loadTodo(){
  const currentTodos = localStorage.getItem(TODOS_LS);
  if(currentTodos !== null){
    console.log(currentTodos);
    const parsedTodos = JSON.parse(currentTodos);
    parsedTodos.forEach(function(todo){
      paintTodo(todo.text);
    })
  }
}

function init(){
  loadTodo();
  form2.addEventListener("submit", handleSubmit);
}

init();