import ToDoApp from "./todoModel.js";
import DisplayToDos from "./displayToDos.js";

window.addEventListener('load', () => {
    let toDoApp = new ToDoApp();
    let displayToDos = new DisplayToDos(toDoApp);
    let taskListDiv = document.getElementById('task_list');
    displayToDos.renderTaskList(taskListDiv);
    let addTaskDiv = document.getElementById('add_task');
    let newTaskTitleDiv = document.getElementById('new_task_title');

    let filterAllBtn = document.getElementById('filter_all');
    let filterActiveBtn = document.getElementById('filter_active');
    let filterCompletedBtn = document.getElementById('filter_completed');

    // add task
    addTaskDiv.addEventListener('click', () => {
        toDoApp.addTask(Date.now(), newTaskTitleDiv.value, false);
        newTaskTitleDiv.value = '';
        displayToDos.renderTaskList(taskListDiv);
    });





    //filter all
    filterAllBtn.addEventListener('click', handleFilter);
    //filter active
    filterActiveBtn.addEventListener('click', handleFilter);
    //filter completed
    filterCompletedBtn.addEventListener('click', handleFilter);
    function handleFilter() {
        if(this === filterActiveBtn) {
            displayToDos.renderTaskList(taskListDiv, toDoApp.getActiveTasks());
        } else if (this === filterCompletedBtn) {
            displayToDos.renderTaskList(taskListDiv, toDoApp.getCompletedTasks());
        } else {
            displayToDos.renderTaskList(taskListDiv);
        }
        removeFilterBtnHighlight();
        this.classList.add('highlighted');
    }
    function removeFilterBtnHighlight() {
        filterCompletedBtn.classList.remove('highlighted');
        filterAllBtn.classList.remove('highlighted');
        filterActiveBtn.classList.remove('highlighted');
    }
});