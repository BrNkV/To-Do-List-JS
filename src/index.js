
/**
 * main object
 */
const todo = {
    action(elem) { },
    add() { },

    /**
     * return task HTML
     * @param {todo text} text 
     * @returns HTML code task
     */
    create(text) {
        return `<li class="todo__item todo-active" todo-state="active">${text}</li>`;
    },

    /**
    * init ToDo List
    * get list todos items from storage
    * handler change => todo select
    */
    init() {
        const fromStorge = localStorage.getItem('todo');

        if (fromStorge) ('.todo__items').innerHTML = fromStorage;
        document.querySelector('.todo__options').addEventListener('change', this.update);

        /**
         * this.action.bind установили в качестве this текущий контекст. 
         * для получения в action() объекта todo с помощью this.
         */
        document.addEventListener('click', this.action.bind(this));
    },
    update() { },
    save() { }
}
