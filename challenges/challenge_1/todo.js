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
    filterAllBtn.addEventListener('click', () => displayToDos.renderTaskList(taskListDiv));
    //filter active
    filterActiveBtn.addEventListener('click', () => {
        displayToDos.renderTaskList(taskListDiv, toDoApp.getActiveTasks())
    });
    //filter completed
    filterCompletedBtn.addEventListener('click', () => {
        displayToDos.renderTaskList(taskListDiv, toDoApp.getCompletedTasks());
    });
});