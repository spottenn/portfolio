export default class CircularArray {
    constructor(size) {
        this.array = [];
        this.size = size;
        this.index = 0;
        this.lastIndex = null;
    }

    push(value) {
        this.lastIndex = this.index;
        this.array[this.index++] = value;
        if (this.index >= this.size) {
            this.index = 0;
        }
        //the same way as a one-liner
        this.index < this.size ? this.array[this.lastIndex = this.index++] =  value : this.array[this.index = 0] = value;
    }

    getArray() {
        return this.array;
    }

    getLastItem() {
        return this.lastIndex !== null ? this.array[this.lastIndex] : null;
    }
}