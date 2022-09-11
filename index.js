let todoList = []
let taskTypes = ["Personal", "Work", "Important"]
const addTaskBtn = document.querySelector(".add-task")
const listContainer = document.querySelector(".container")
const taskInput = document.querySelector(".task-name")
const saveNewTaskBtn = document.querySelector(".save-btn")
const makeTaskBox = document.querySelector(".make-task")
const typesOfTask = document.querySelector(".types")


window.addEventListener("load", getItemsFromLocalStorage());

addTaskBtn.addEventListener('click', displayNewTaskSettings)
saveNewTaskBtn.addEventListener('click',saveNewTask)
taskInput.addEventListener('keypress',function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    saveNewTask();
  }})

function displayNewTaskSettings(){
    makeTaskBox.style.display = "flex"
    typesOfTask.innerHTML = taskTypes.map(type=>{
         return `<button class="type-btn">${type}</button>`
     })
}
typesOfTask.addEventListener('click', e => {
    e.target.classList.toggle("selected")
})

function selectType(){
    let types = document.querySelectorAll(".type-btn");
        for(let i=0; i<types.length; i++){
            if(types[i].classList.contains("selected")){
            return types[i].textContent            
        }else{
            console.log("error")
        }          
    }
}
function completedTask(){  
    let current_tasks = document.querySelectorAll(".complete-item");
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.style.textDecoration = "line-through";
                this.parentNode.style.opacity = "0.5";
                this.remove()
                console.log("awfcaf")
            }
            console.log("alLl")
        }
        console.log("whwhw")
}
function deleteTask(){
    let current_tasks = document.querySelectorAll(".delete-item");
        for(let i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
                console.log("awfcaf")
            }
            console.log("alLl")
        }
        console.log("whwhw")
}

function saveNewTask(){
    const task = taskInput.value
    const type = selectType()
    todoList.push(task)
    const newTask = createNewTask(task, type)
    localStorage.setItem("task", newTask)
    taskInput.value = ""
    makeTaskBox.style.display = "none"
}

function createNewTask(task, type){
    let template = `<li><h2 class="todo-item">${task}</h2>
    <h4>${type}</h4>
    <button class="complete-item" onclick="completedTask()">Yes</button>
    <button class="delete-item" onclick="deleteTask()">X</button>    
    </li>`
    listContainer.innerHTML += template
    
}

function getItemsFromLocalStorage(){
    const data = localStorage.getItem("task")
    const tasksFromLocalStorage = data.forEach(task=>{
        return `<li>${task}</li>`
    })
}

