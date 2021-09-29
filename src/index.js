const addTaksBtn = document.querySelector('.add-task-btn');
const taskInp = document.querySelector('.todo__text');
// console.log(taskInp);
const todosContainer = document.querySelector('.todo_items');

let allTasks;

/**
 *  check LS
 */
if (!localStorage) allTasks = [];
else allTasks = JSON.parse(localStorage.getItem('tasks'));

/*
1pc item in local storage

const taskItem = {
    description: "task text",
    completed: false
}
*/

/**
 * 
 * @param {text task name} description 
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
    <div class="input-group mb-3 todo__item">
        <div class="input-group-text">
          <input class="form-check-input mt-0 task-input" type="checkbox" value=""
            aria-label="Checkbox for following text input">
          <!-- <button type="button" class="btn-close" aria-label="Close"></button> -->
        </div>
        <div class="form-control todo__item_text" aria-label="Text input with checkbox">
        ${task.description}
        </div>
      </div>
    `)
}

/**
 * fill all tasks in HTML list
 * @returns 
 */
const fillHtmlList = () => {
    todosContainer.innerHTML = '';
    if (allTasks.length > 0) {
        allTasks.forEach((item, index) => {
            todosContainer.innerHTML += createTemplate(item, index);
        });
    }
}


/**
 * update localStorage > JSON
 */
const updatelS = () => {
    localStorage.setItem('tasks', JSON.stringify(allTasks))
}

/**
 * send description(taskInp) in Task 
 */
addTaksBtn.addEventListener('click', () => {
    allTasks.push(new Task(taskInp.value));
    console.log(allTasks);
    updatelS();
})