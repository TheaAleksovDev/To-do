let taskTypes = ["Personal", "Work", "Important"]
const addTaskBtn = document.querySelector(".add-task")
const listContainer = document.querySelector(".container")
const taskInput = document.querySelector(".task-name")
const saveNewTaskBtn = document.querySelector(".save-btn")
const makeTaskBox = document.querySelector(".make-task")
const typesOfTask = document.querySelector(".types")
const resetBtn = document.querySelector(".reset")
const app = document.querySelector(".app")
window.addEventListener('load', ()=>{
    onLoad()
} )


function onLoad(){
    if(localStorage){
        getItemsFromLocalStorage()
    }else{
        listContainer.innerHTML = `<h1>Nothing here</h1>`
    }
}

addTaskBtn.addEventListener('click', displayNewTaskSettings)

typesOfTask.addEventListener('click', e => {
    e.target.classList.toggle("selected")
})
saveNewTaskBtn.addEventListener('click',()=>{createNewTask(taskInput.value,selectType())})


function displayNewTaskSettings(){
    app.classList.toggle("overlay")
    makeTaskBox.style.display = "flex"
    typesOfTask.innerHTML = taskTypes.map(type=>{
         return `<button class="type-btn">${type}</button>`
    })

}

function createNewTask(task,type){
    app.classList.remove("overlay")
    localStorage.setItem(task,type)
    taskInput.value = ""
    makeTaskBox.style.display = "none"
    let template = `<li>
    <i class="fa-solid fa-circle"></i><h2 class="todo-item">${task}</h2>
    <h4 class="type">${type}</h4>
    <i class="fa-solid fa-square-check complete-item" onclick="completedTask()"></i>
    <i class="fa-solid fa-trash-can delete-item" onclick="deleteTask()"></i> 
    </li>`
     listContainer.innerHTML = template + listContainer.innerHTML
}

function selectType(){
    let types = document.querySelectorAll(".type-btn");
        for(let i=0; i<types.length; i++){
            if(types[i].classList.contains("selected")){
                console.log(types[i].textContent )   
            return types[i].textContent 
                    
        }else{
            console.log("error")
        }          
    }
    
}

function getItemsFromLocalStorage(){
    const localStorageArray = SortLocalStorage()
    console.log(localStorageArray)
        for(let i=0;  i<localStorageArray.length; i++){
            let task = localStorageArray[i]
            let type = localStorage.getItem(task)
            createNewTask(task,type)
        }
}
let localStorageArray = []
function SortLocalStorage(){
   if(localStorage.length > 0){
      var localStorageArray = new Array();
      for (i=0;i<localStorage.length;i++){
          localStorageArray[i] = localStorage.key(i)
      }
   }
   var sortedArray = localStorageArray.sort();
   return sortedArray;
}

function deleteTask(){
    let deleteBtns = document.querySelectorAll(".delete-item")
    for(let i=0; i<deleteBtns.length ; i++){
        deleteBtns[i].onclick = ()=>{
            let task = deleteBtns[i].parentNode.querySelector(".todo-item").textContent
            localStorage.removeItem(task)
            listContainer.textContent = ""
            getItemsFromLocalStorage()
        }
    }
}

function completedTask(){  
    let completed = document.querySelectorAll(".complete-item");
        for(let i=0; i<completed.length; i++){
            completed[i].onclick = function(){
                this.parentNode.style.textDecoration = "line-through";
                this.parentNode.style.opacity = "0.5";
                this.remove()
            }
        }
}