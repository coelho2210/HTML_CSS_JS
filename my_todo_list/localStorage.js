
let container = document.getElementById('todo__list');
let button = document.getElementById('add__todo');
let todoText = document.getElementById('todo__text');
var todoListModel = [];

window.onload = populateTodoList();

function addTodo(todoName = todoText.value, todoId = createRandomKey(7)) {
	let todo = document.createElement('li'),
			checkbox = document.createElement('input'),
			text = document.createElement('label'),
			deleteButton = document.createElement('button'),
			id = todoId,
			todoTitle = todoName;
	todo.setAttribute('class', 'todo__item');
	todo.setAttribute('id', id);
	checkbox.setAttribute('type', 'checkbox');
	text.innerText = todoTitle;
	deleteButton.setAttribute('class', 'btn icon danger delete__todo');
	deleteButton.setAttribute('type', 'button');
	deleteButton.setAttribute('name', id);
	deleteButton.setAttribute('onclick', 'deleteTodo(this)')
	deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;	
	todo.appendChild(checkbox);
	todo.appendChild(text);
	todo.appendChild(deleteButton);
	todoListModel.push({todoName: todoName, todoId: id});
	container.prepend(todo);
	todoText.value = "";
}

function deleteTodo(e) {
	let id = e.name;
	let todo = document.getElementById(id);
	todo.parentNode.removeChild(todo);
	for(let i = 0; i < todoListModel.length; i++) {
		if(todoListModel[i].todoId === id) {
			todoListModel.splice(todoListModel.indexOf(todoListModel[i]), 1);
			saveTodoList();
		}
	}
}

function populateTodoList() {
	let localTodos = JSON.parse(localStorage.getItem('to-dos'));
	console.log(localTodos);
	if(localTodos) {
		for(let i = 0; i < localTodos.length; i++) {
			addTodo(localTodos[i].todoName, localTodos[i].todoId);
		}
	}
}

function saveTodoList() {
	let toDos = JSON.stringify(todoListModel);
	console.log(toDos);
	localStorage.setItem('to-dos', toDos);
}

function createRandomKey(length) {
  let id = "";
  let possibleCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    id += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
  }
  return id;
}