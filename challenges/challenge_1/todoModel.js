import {readFromLocalStorage, writeToLocalStorage} from './local_storage_helpers.js';
//task: { id : timestamp, content: string, completed: bool }
const taskListKey = 'taskListKey';

export default class ToDoApp {
    constructor() {
        this.taskList = readFromLocalStorage(taskListKey);
        if (this.taskList === null) {
            this.taskList = [];
        }
    }

    addTask(timestamp, title, completed) {
        if (typeof timestamp === 'number' && typeof title === 'string' && typeof completed === 'boolean') {
            this.taskList.push({id: timestamp, title, completed})
            this.saveTasks();
        }
    }

    removeTask(timestamp) {
        let index = this.getTaskIndex(timestamp);
        this.taskList.splice(index, 1);
        this.saveTasks();
    }

    setCompleted(timestamp, completed) {
        if (typeof timestamp === 'number' && typeof completed === 'boolean') {
            this.getTask(timestamp).completed = completed;
            this.saveTasks();
        }
    }

    saveTasks() {
        writeToLocalStorage(taskListKey, this.taskList);
    }

    getTaskIndex(timestamp) {
        let index = 0;
        for (let length = this.taskList.length; index < length; index++) {
            if (this.taskList[index].id === timestamp) {
                return index;
            }
        }
        return null;
    }
    getTask(timestamp) {
        return this.taskList[this.getTaskIndex(timestamp)];
    }

    getActiveTasks() {
        return this.getFilteredTasks(false);
    }
    getCompletedTasks() {
        return this.getFilteredTasks(true);

    }
    getFilteredTasks(completed) {
        return this.taskList.filter(task => task.completed === completed);
    }
}