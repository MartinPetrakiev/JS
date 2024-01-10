/*
Implement a linked list using ES6 classes. Use two classes - LinkedList and listNode. 
Look at the hints at the bottom of the description. 

Your class implementation should:

Getters
    have a getter first - return the value of the first node in the list
    have a getter last - return the value of the last node in the list
    have a getter length for the length of the linked list
Methods
    1)  provide a method append(el1, el2, el3...) that adds the provided elements to the end of the list
        should enable chaining

        const list = new LinkedList();
        list.append(1, 2, 3).append(4);
        // list should contain 1, 2, 3 and 4

    2)  provide a method prepend(el1, el2, el3...) that adds the provided elements to the beginning of the list
        should enable chaining

        const list = new LinkedList();
        list.append(4, 5, 6).prepend(1, 2, 3);
        // should contain 1, 2, 3, 4, 5, 6 in that order

    3)  provide a method insert(index, el1, el2, el3...) for inserting values at the specified index
        should enable chaining
        const list = new LinkedList();
        list.append(1, 4, 5).insert(1, 2, 3);
        // list should contain 1, 2, 3, 4, 5

    4)  provide a method at(index[, value]) for indexing
        when passed an index, it should return the element at that index
        when passed an index and a value, should change the value of the element at that index

        const list = new LinkedList();
        list.append(1, 2, 3, 4, 5, 6);
        console.log(list.at(2)); // 3
        list.at(2, 'gosho');
        console.log(list.at(2)); // gosho

    5)  provide a method removeAt(index) that removes an element at a given index
        should return the removed element

        const list = new LinkedList();
        const removed = list.append(1, 2, 3, 4, 5).removeAt(1);
        // removed should be 2
        // the list should contain 1, 3, 4, 5

    6)  your class should be iterable with a for-of loop
        you must use Symbol.iterator

        class LinkedList {
            /
                other code here
            /

                * [Symbol.iterator] {
                // iterator code
            }
        }

        const list = new LinkedList().append(6, 7, 8).prepend(1, 2, 3, 4, 5);

        for(const value of list) {
            console.log(value);
        }
        // output should be the numbers [1..8], each on a separate line

    7)  provide a toArray() method, that converts the linked list to an array

        const list = new LinkedList();
        list.append(1, 2, 3, 4, 5, 6);
        const arr  = list.toArray();
        console.log(arr); // [1, 2, 3, 4, 5, 6]
        console.log(arr instanceof Array); // true

    8)  provide method toString(), which should return a string representation of the linked list - the values of the elements, separated by ' -> '

        const list = new LinkedList();
        list.append(1, 2, 3, 4, 5, 6);
        console.log(list.toString()); // 1 -> 2 -> 3 -> 4 -> 5 -> 6
*/

class listNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    get first() {
        return this._head ? this._head.data : null;
    }

    get last() {
        return this._tail ? this._tail.data : null;
    }

    get length() {
        return this._length;
    }

    at(index, value) {
        let current = this._head;
        if (index >= 0 && index < this._length) {
            if (value) {
                for (let i = 0; i < index; i++) {
                    current = current.next;
                }
                current.data = value;
            } else {
                for (let i = 0; i < index; i++) {
                    current = current.next;
                }
                return current.data;
            }
        } else {
            return;
        }
    }

    append(...data) {
        for (const element of data) {
            const newNode = new listNode(element);

            if (!this._head) {
                this._head = newNode;
                this._tail = newNode;
            } else {
                this._tail.next = newNode;
                this._tail = newNode;
            }

            this._length++;
        }

        return this;
    }

    prepend(...data) {
        for (const element of data.reverse()) {
            const newNode = new listNode(element);
            newNode.next = this._head;
            this._head = newNode;

            if (!this._tail) {
                this._tail = newNode;
            }

            this._length++;
        }

        return this;
    }

    insert(index, ...data) {
        if (index === 0) {
            this.prepend(...data);
        } else if (index > 0 && index < this._length) {
            let current = this._head;

            for (let i = 0; i < index - 1; i++) {
                current = current.next;
            }

            for (const element of data) {
                const newNode = new listNode(element);
                newNode.next = current.next;
                current.next = newNode;
                this._length++;
                current = newNode;
            }
        } else {
            return this;
        }

        return this;
    }

    removeAt(index) {
        if (index >= 0 && index < this._length) {
            let removedElement;

            if (index === 0) {
                removedElement = this._head.data;
                this._head = this._head.next;
                if (!this._head) {
                    this._tail = null;
                }
            } else {
                let current = this._head;
                for (let i = 0; i < index - 1; i++) {
                    current = current.next;
                }
                removedElement = current.next.data;
                current.next = current.next.next;
                if (!current.next) {
                    this._tail = current;
                }
            }

            this._length--;

            return removedElement;
        } else {
            return;
        }
    }

    *[Symbol.iterator]() {
        let current = this._head;

        while (current) {
            yield current.data; //console.log(current.data);
            current = current.next;
        }
    }

    toArray() {
        const array = [];
        let current = this._head;
        for (let i = 0; i < this._length; i++) {
            array.push(current.data);
            current = current.next;
        }

        return array;
    }

    toString() {
        let result = '';
        let current = this._head;
        for (let i = 0; i < this._length; i++) {
            if (i + 1 === this._length) {
                result += current.data;
                break;
            }

            result += `${current.data} -> `;
            current = current.next;
        }

        return result;
    }
}

console.log('Test append');
let list = new LinkedList();
list.append(1, 2, 3).append(4);
console.log(list.toArray()); // list should contain 1, 2, 3 and 4

console.log('\nTest prepend');
list = new LinkedList();
list.append(4, 5, 6).prepend(1, 2, 3);
console.log(list.toArray()); // should contain 1, 2, 3, 4, 5, 6 in that order

console.log('\nTest insert(index, el1, el2, el3...)');
list = new LinkedList();
list.append(1, 4, 5).insert(1, 2, 3);
console.log(list.toArray()); // list should contain 1, 2, 3, 4, 5

console.log('\nTest at(index[, value]):');
list = new LinkedList();
list.append(1, 2, 3, 4, 5, 6);
console.log(list.at(2)); // 3
list.at(2, 'gosho');
console.log(list.at(2)); // gosho

console.log('\nTest removeAt:');
list = new LinkedList();
const removed = list.append(1, 2, 3, 4, 5).removeAt(1);
console.log(removed); // removed should be 2
console.log(list.toArray()); // the list should contain 1, 3, 4, 5

console.log('\nTest iterator:')
list = new LinkedList().append(6, 7, 8).prepend(1, 2, 3, 4, 5);
for(const value of list) {
    console.log(value);
}

console.log('\nTest toArray():')
list = new LinkedList();
list.append(1, 2, 3, 4, 5, 6);
const arr  = list.toArray();
console.log(arr); // [1, 2, 3, 4, 5, 6]
console.log(arr instanceof Array); // true

console.log('\nTest toString():')
list = new LinkedList();
list.append(1, 2, 3, 4, 5, 6);
console.log(list.toString()); // 1 -> 2 -> 3 -> 4 -> 5 -> 6
