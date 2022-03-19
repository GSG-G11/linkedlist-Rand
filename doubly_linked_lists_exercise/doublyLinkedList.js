function Node(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList(array = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    if (Array.isArray(array)) {
        array.forEach(el => {
            this.push(el);
        });
    }
}

DoublyLinkedList.prototype.push = function (val) {
    let newNode = new Node(val);

    if (this.head === null) {
        this.head = newNode;
        this.tail = this.head;
    } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    this.length++;

    return this;
}

DoublyLinkedList.prototype.unshift = function (val) {
    let newNode = new Node(val);

    if (this.head === null) {
        this.head = newNode;
        this.tail = this.head;
    } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
    }
    this.length++;
    return this;
}

DoublyLinkedList.prototype.insert = function (index, val) {
    let newNode = new Node(val);
    if (index < 0 || index >= this.length) {
        return undefined;
    }

    // let current = this.head;
    // let counter = 0;
    // while(current) {
    //     if(counter === index-1) break;

    //     counter ++;
    //     current= current.next;
    // }

    let current = this.getNode(index - 1);

    newNode.next = current.next;
    newNode.prev = current;
    current.next = newNode;

    this.length++;

    return this.length;
}


DoublyLinkedList.prototype.getNode = function (index) {
    if (index < 0 || index >= this.length) {
        return undefined;
    }

    let current = this.head;
    let counter = 0;

    while (current) {
        if (counter === index) break;

        counter++;
        current = current.next;
    }

    return current;
}

DoublyLinkedList.prototype.get = function (index) {
    let node = this.getNode(index);
    return node ? node.val : null;
}

DoublyLinkedList.prototype.set = function (index, val) {
    let node = this.getNode(index);
    if (node) {
        node.val = val;
    } else {
        return undefined;
    }
}

DoublyLinkedList.prototype.pop = function () {
    if (this.length === 0) {
        return undefined;
    }

    let deleted = this.tail;
    this.tail = deleted.prev;
    deleted.prev = null;
    this.tail.next = null;

    this.length--;
    return deleted.val;
}

DoublyLinkedList.prototype.shift = function () {

    if (this.length === 0) {
        return undefined;
    }

    let deleted = this.head;
    if (this.length === 1) {
        this.head = null;
        this.tail = null
    } else {
        this.head = deleted.next;
        this.head.prev = null;
        deleted.next = null;
    }
    this.length--;

    return deleted.val;
}

DoublyLinkedList.prototype.remove = function (index) {

    let deleted = this.getNode(index);

    let prevNode = deleted.prev;
    let nextNode = deleted.next;

    deleted.next = null;
    deleted.prev = null;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
  
    this.length--;
    return deleted;
}

DoublyLinkedList.prototype.reverse = function () {

    let current = this.head;

    this.head = this.tail;

    this.tail = current;
    
    for (let i = 0; i< this.length; i++) {
        const { prev, next } = current;
        current.prev = next;
        current.next = prev;
        current = next;
    }
}