document.getElementById('saveToDo').addEventListener('click', saveToDo);
document.getElementById('showTasks').addEventListener('click', showUserTasks);
document.getElementById('addTodo').addEventListener('click', addTodo);
document.getElementById('updateToDo').addEventListener('click', saveUpdate);

function addTodo() {
    document.getElementById("todoList").classList.add('hide');
    document.querySelector('#form').classList.remove('hide');
}
let taskID;

function saveToDo(e) {
    e.preventDefault();
    let desc = document.getElementById('description').value; //get the to-do description, the user will enter it
    let dueDate = document.getElementById('dueDate').value; //get the to-do description, the user will enter it
    let status = document.getElementById('status').value;
    let newTask = {
        title: desc,
        status: status,
        due_on: dueDate,
        user_id: `${userData.id}`
    }
    newTask = JSON.stringify(newTask);
    createPostRequest(`users/${userData.id}/todos`, onAddTodoResponseRecieved, newTask);
}

function onAddTodoResponseRecieved(e) {
    let xhr = e.target;
    if (xhr.status >= 200 && xhr.status < 300) {
        alert('your to-do was added successfully');
        document.getElementById('form').classList.add('hide');
    } else {
        alert('something bad occurred');
    }
}

function showUserTasks(e) {
    e.preventDefault();
    document.getElementById('form').classList.add('hide');
    document.getElementById("todoList").classList.remove('hide');
    createGetRequest(`users/${userData.id}/todos`, onShowTodoResponse);
}

function onShowTodoResponse(e) {
    let xhr = e.target;
    if (xhr.status >= 200 && xhr.status < 300) {
        let arr = JSON.parse(xhr.responseText);
        let todoList = document.getElementById("todoList");
        todoList.innerHTML = '';
        arr.forEach(element => {
            todoList.insertAdjacentHTML("beforeend", `<li id=${element.id}><p class="text">
          Title:${element.title}.<br>
          Due-On:${element.due_on}.<br>
          Status:${element.status}.</p>
          <button id=${element.id} class="updateTask">Update Task</button>
          <button id=${element.id} class="deleteTask">Delete Task</button>
          </li><br>`);
        });
        document.querySelectorAll('.updateTask').forEach(element => element.addEventListener('click', updateTask));
        document.querySelectorAll('.deleteTask').forEach(element => element.addEventListener('click', deleteTask));
    }
}

function saveUpdate(e) {
    e.preventDefault();
    let desc = document.getElementById('updateDesc').value; //get the to-do description, the user will enter it
    let dueDate = document.getElementById('updateDueDate').value; //get the to-do description, the user will enter it
    let status = document.getElementById('updateStatus').value;
    let newTask = {
        title: desc,
        status: status,
        due_on: dueDate
    }
    newTask = JSON.stringify(newTask);
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', `${baseURL}/todos/${taskID}`);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer e616dc1b37550426eca9574c1f6f9b2183b62a4aa22882fa3153338e0036fa24');
    xhr.addEventListener('load', onUpdateTask);
    xhr.send(newTask);
}

function updateTask(e) {
    document.getElementById('updateForm').classList.remove('hide');
    taskID = e.target.id;
}

function onUpdateTask(e) {
    if (e.target.status >= 200 && e.target.status < 300) {
        alert('Update');
        document.getElementById('updateForm').classList.add('hide');
    }
}

function deleteTask(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${baseURL}/todos/${e.target.id}`);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer e616dc1b37550426eca9574c1f6f9b2183b62a4aa22882fa3153338e0036fa24');
    xhr.addEventListener('load', onDeleteTask);
    xhr.send();
    document.getElementById(`${e.target.id}`).classList.add('hide')
}

function onDeleteTask(e) {
    if (e.target.status >= 200 && e.target.status < 300)
        alert('deleted');
}