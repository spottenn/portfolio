export default class CircularArray {
    constructor(size) {
        this.array = [];
        this.size = size;
        this.index = 0;
    }
    push(value) {
        this.index++;
        if (this.index > this.size) {
            this.index = 0;
        }
        this.array[this.index] = value;
    }
    getArray() {
        return this.array;
    }
    getLastItem() {
        return this.array[this.index];
    }
}