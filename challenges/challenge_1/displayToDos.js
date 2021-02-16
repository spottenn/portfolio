export default class DisplayToDos {
    constructor(toDoApp) {
        this.toDoApp = toDoApp
    }

    renderTaskList(element, taskList = this.toDoApp.taskList){
        element.innerHTML = buildTaskListHtml(taskList);
        showTasksRemaining(this.toDoApp);
        addListEventListeners(this.toDoApp);
    }
}
//remove task


//mark task completed

function applyEventListeners(elementList, callback) {
    for (let i = 0, length = elementList.length; i < length; i++) {
        elementList[i].addEventListener('click', callback);
    }
}
function addListEventListeners(toDoApp) {
    let removeButtons = document.getElementsByClassName('remove_button')
    applyEventListeners(removeButtons, removeTask);
    let completedCheckboxes = document.getElementsByClassName('task_completed')
    applyEventListeners(completedCheckboxes, setCompleted);

    function removeTask() {
        toDoApp.removeTask(Number(this.parentElement.id));
        this.parentElement.remove();
    }

    function setCompleted() {
        toDoApp.setCompleted(Number(this.parentElement.id), Boolean(this.checked));
        showTasksRemaining(toDoApp);
    }
}

function buildTaskHtml(task) {
    let html = `<div id="${task.id}">
<input class="task_completed" type="checkbox" ${task.completed ? 'checked' : ''}>${task.title}
<button class="remove_button">x</button>
</div>`;
    return html;
}
function buildTaskListHtml(taskList) {
    let html = '';
    for (let i = 0, length = taskList.length; i < length; i++) {
        html += buildTaskHtml(taskList[i]);
    }
    return html;
}
function showTasksRemaining(toDoApp) {
    let tasksRemainingSpan = document.getElementById('tasks_remaining');
    //show tasks remaining
    let tasksRemaining = toDoApp.getActiveTasks().length;
    tasksRemainingSpan.innerHTML = `${tasksRemaining} ${tasksRemaining === 1 ? 'task' : 'tasks'} remaining`;

}