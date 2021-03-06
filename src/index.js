const addTaksBtn = document.querySelector('.add-task-btn');
const taskInp = document.querySelector('.todo__text');
console.log(taskInp.value);
const todosContainer = document.querySelector('.todos-container');
const statSelect = document.querySelector('.select-status');

let allTasks = [], activeTsk = [], completeTsk = [];
// console.log(allTasks, activeTsk, completeTsk, localStorage, allTasks.length);

/**
 *  check LS
 */
if (!localStorage.tasks || localStorage == undefined) allTasks = [];
else allTasks = JSON.parse(localStorage.getItem('tasks'));

/**
 * all todo__item's from CSS class ="todo__item"
 */
let todoItems = [];

/**
 * 
 * @param {text task name} description 
 * 
1pc item in local storage
const taskItem = {
    description: "task text",
    completed: false
}
 */
function Task(description) {
    this.description = description;
    this.completed = false;
}

/**
 * item, index => in HTML
 * @param {from fillHtmlList(item)} task 
 * @param {from fillHtmlList(index)} index 
 * @returns 
 */
const createTemplate = (task, index) => {
    return (`
    <div class="input-group mb-3 todo__item ${task.completed ? 'checked' : ''}">
        <div class="input-group-text">
          <input onclick="completeTask(${index})" class="form-check-input mt-0 task-input" type="checkbox" value=""
            aria-label="Checkbox for following text input" ${task.completed ? 'checked' : ''}>          
        </div>
        <div class="form-control todo__item_text" aria-label="Text input with checkbox">
        ${task.description}
        <button onclick="delTask(${index})" type="button" class="btn-close btn-delete" aria-label="Close"></button>
        </div>
        
      </div>
    `)
}

/**
 * sort array allTasks in localStorage
 */
const filterTasks = () => {
    activeTsk = allTasks.length && allTasks.filter(item => item.completed == false);
    completeTsk = allTasks.length && allTasks.filter(item => item.completed == true);
    allTasks = [...activeTsk, ...completeTsk];
}

//TODO поставить слушатель на выпадающий select , при смене менять selected и удалять у пердыдущего, после чего запускать фильтрацию, после чего условием заполнять active allTasks = [...activeTsk]; complete allTasks = [...completeTsk]; all allTasks = [...activeTsk, ...completeTsk];
statSelect.addEventListener('change', () => {
    fillHtmlList();
});

/**
 * fill all tasks in HTML list
 * @returns 
 * 
 */
const fillHtmlList = () => {
    todosContainer.innerHTML = '';
    //TODO можно оптимизировать
    if (allTasks.length > 0 && statSelect.value == 'all') {
        filterTasks();
        allTasks.forEach((item, index) => {
            todosContainer.innerHTML += createTemplate(item, index);
        });
    }

    else if (activeTsk.length > 0 && statSelect.value == 'active') {
        filterTasks();
        activeTsk.forEach((item, index) => {
            todosContainer.innerHTML += createTemplate(item, index);
        });
    }

    else if (completeTsk.length > 0 && statSelect.value == 'completed') {
        filterTasks();
        completeTsk.forEach((item, index) => {
            todosContainer.innerHTML += createTemplate(item, index);
        });
    }

    else {
        console.log("allTasks length = 0")
    }
    todoItems = document.querySelectorAll('.todo__item');
}

fillHtmlList();

/**
 * update localStorage > JSON
 */
function updatelS() {
    localStorage.setItem('tasks', JSON.stringify(allTasks))
}

/**
 * 
 * @param index 
 */
const completeTask = (index) => {
    console.log(index);
    allTasks[index].completed = !allTasks[index].completed;
    if (allTasks[index].completed) todoItems[index].classList.add('checked');
    else todoItems[index].classList.remove('checked');
    updatelS();
    fillHtmlList();
}

/**
 * send description(taskInp) in Task 
 */
addTaksBtn.addEventListener('click', () => {
    if (taskInp.value != '') allTasks.push(new Task(taskInp.value));
    updatelS();
    fillHtmlList();
    taskInp.value = '';
})

/**
 * delete task from array and updateLS
 * @param  index 
 */
const delTask = (index) => {
    console.log(index);
    todoItems[index].classList.add('deleted')
    setTimeout(() => {
        allTasks.splice(index, 1);
        updatelS();
        fillHtmlList();
    }, 500)
}