let todoList = []
let taskTypes = ["Personal", "Work", "Important"]
const addTaskBtn = document.querySelector(".add-task")
const listContainer = document.querySelector(".container")
const taskInput = document.querySelector(".task-name")
const saveNewTaskBtn = document.querySelector(".save-btn")
const makeTaskBox = document.querySelector(".make-task")
const typesOfTask = document.querySelector(".types")
const resetBtn = document.querySelector(".reset")


window.addEventListener("load", onLoad());

function onLoad(){
    if(localStorage){
        getItemsFromLocalStorage()
    }else{
        listContainer += `<h1>Nothing here</h1>`
    }
}
addTaskBtn.addEventListener('click', displayNewTaskSettings)
saveNewTaskBtn.addEventListener('click',()=>{
    createNewTask(taskInput.value,selectType())
})
taskInput.addEventListener('keypress',function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    createNewTask(taskInput.value,selectType());
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
            }
        }
}
function deleteTask(){
    let current_tasks = document.querySelectorAll(".delete-item");
        for(let i=0; i<current_tasks.length; i++){
            
            current_tasks[i].onclick = function(){
                let list = localStorage.getItem("todoList")
                let item = current_tasks[i].parentNode.querySelector(".todo-item").textContent
                localStorage.removeItem(item)
                this.parentNode.remove();
            }
        }
}



// function saveNewTask(){
//     const task = taskInput.value
//     const type = 
//     localStorage.setItem(task,type)
//     todoList.push(task)
//     localStorage.setItem("todoList", todoList)   
//     const newTask = createNewTask(task, type)
    
    
//     taskInput.value = ""
//     makeTaskBox.style.display = "none"
//     console.log(todoList)
// }
function createNewTask(task, type){
    
    todoList.push(task)
    // localStorage.setItem("todoList", todoList)   
      if (task && type) {
    const count = localStorage.length;
    const val = {
      task,
      order: count,
    }
    localStorage.setItem(task,type)
  }
    taskInput.value = ""
    makeTaskBox.style.display = "none"
    console.log(todoList)
    let template = `<li><h2 class="todo-item">${task}</h2>
    <h4>${type}</h4>
    <button class="complete-item" onclick="completedTask()">Yes</button>
    <button class="delete-item" onclick="deleteTask()">X</button>    
    </li>`
    listContainer.innerHTML = template + listContainer.innerHTML
    
}
// function getItemsFromLocalStorage(task){
//     for(var i=0;  i<localStorage.length; i++){
//         var list = localStorage.getItem("todoList")
//         var key = localStorage.key(i);       
//         var value = localStorage[key];

//         for(var i=0; i<list.length; i+=2 ){
//             const newTask = createNewTask(list[i], value)
//         }
        
//         // console.log(list)
//     }
// }

// function getItemsFromLocalStorage(){
//     const items = [];
//     for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const value = localStorage.getItem(key);
//     items.push({key, value});
//     }
//     items.sort((a, b) => a.value.order - b.value.order).forEach(item => {
//     var li = document.createElement("li");
//     li.textContent = `${item.key}: ${item.value.value}</li>`;
//     output.appendChild(li);
//     })
// }

// function getItemsFromLocalStorage(){
//     const items = [];
//     for(var i=0;  i<localStorage.length; i++){
//         let task = localStorage.key(i)
//         let type = localStorage.getItem(task)
//         items.push({task, type})
//         console.log(task +" " +type)
//         items.sort((a, b) => a.value.order - b.value.order).forEach(item => {
//         createNewTask(task,type)})
//     }
//     }
    




// function getItemsFromLocalStorage(){
//     let list = []
//     if(localStorage.getItem("todoList")){
//         list = localStorage.getItem("todoList").split(",")
//     }
//     console.log(list)
//     for(let i=0; i<list.length; i++){
//         let task = localStorage.key(i)
//         let type = localStorage.getItem(list[i])
//         let newTask = createNewTask(task,type)
//         console.log(newTask)
//     }
// }
// console.log(localStorage.getItem("todoList"))
