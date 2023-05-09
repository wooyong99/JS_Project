const form2 = document.querySelector(".js-toDoForm");
const input2 = form2.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDos";

let toDos = [];

function deleteTodo(e){
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(abc){
    return abc.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();

}

function saveToDos(){
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintTodo(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length+1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteTodo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text : text,
    id : newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(e){
  e.preventDefault();
  const currentValue = input2.value;
  paintTodo(currentValue);
  input2.value="";
}

function loadTodo(){
  const currentTodos = localStorage.getItem(TODO_LS);
  console.log(currentTodos);
  if(currentTodos !== null){
    const parsedTodos = JSON.parse(currentTodos);
    parsedTodos.forEach(function(todos){
      console.log(todos);
    })
    parsedTodos.forEach(function(todos){
      paintTodo(todos.text);
    })
    
  }
}

function init(){
  loadTodo();
  form2.addEventListener("submit", handleSubmit);
}
init();