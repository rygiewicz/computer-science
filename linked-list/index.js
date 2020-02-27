function LinkedListNode(data) {
    this.data = data;
    this.next = null;
}

function LinkedList() {
    this.head = null;
}

LinkedList.prototype.add = function (data) {
    if (!this.head) {
        this.head = new LinkedListNode(data);
        return;
    }

    let tail = this.head;

    while (tail.next) {
        tail = tail.next;
    }

    tail.next = new LinkedListNode(data);
}

LinkedList.prototype.get = function (index) {
    if (typeof index !== 'number' || index < 0) {
        return null;
    }

    let idx = 0;
    let node = this.head;

    while (idx < index) {
        if (!node) {
            return null;
        }

        idx++;
        node = node.next;
    }

    return node;
}

LinkedList.prototype.delete = function (index) {
    const previous = this.get(index - 1);

    if (!previous) {
        return;
    }

    const current = previous.next;

    if (!current) {
        return;
    }

    previous.next = current.next;
}

LinkedList.prototype.size = function () {
    let count = 0;

    let tail = this.head;

    while (tail) {
        tail = tail.next;
        count++;
    }

    return count;
}

function test() {
    shouldBeEmpty();
    shouldAddNode();
    shouldGetFirstNode();
    shouldGetNode();
    shouldNotGetNode();
    shouldNotGetNegativeNode();
    shouldDeleteNode();
    shouldNotDeleteNode();
    shouldNotDeleteNegativeNode();
}

function shouldBeEmpty() {
    const list = new LinkedList();

    if (list.size() !== 0) {
        throw new Error('shouldBeEmpty');
    }

    console.log('OK');
}

function shouldAddNode() {
    const list = new LinkedList();

    list.add('something');

    if (list.size() !== 1) {
        throw new Error('shouldAddNode');
    }

    console.log('OK');
}

function shouldGetNode() {
    const list = new LinkedList();

    list.add('something');
    list.add('more');

    const node = list.get(1);

    if (node.data !== 'more') {
        throw new Error('shouldGetNode');
    }

    console.log('OK');
}

function shouldGetFirstNode() {
    const list = new LinkedList();

    list.add('something');
    list.add('more');

    const node = list.get(0);

    if (node.data !== 'something') {
        throw new Error('shouldGetFirstNode');
    }

    console.log('OK');
}

function shouldNotGetNode() {
    const list = new LinkedList();

    list.add('something');
    list.add('more');

    const node = list.get(5);

    if (node) {
        throw new Error('shouldNotGetNode');
    }

    console.log('OK');
}

function shouldNotGetNegativeNode() {
    const list = new LinkedList();

    list.add('something');
    list.add('more');

    const node = list.get(-3);

    if (node) {
        throw new Error('shouldNotGetNegativeNode');
    }

    console.log('OK');
}

function shouldDeleteNode() {
    const list = new LinkedList();

    list.add('something');
    list.add('more');
    list.add('even');

    list.delete(1);

    if (list.size() !== 2) {
        throw new Error('shouldDeleteNode');
    }

    console.log('OK');
}

function shouldNotDeleteNode() {
    const list = new LinkedList();

    list.add('something');
    list.add('more');
    list.add('even');

    list.delete(6);

    if (list.size() !== 3) {
        throw new Error('shouldNotDeleteNode');
    }

    console.log('OK');
}

function shouldNotDeleteNegativeNode() {
    const list = new LinkedList();

    list.add('something');
    list.add('more');
    list.add('even');

    list.delete(-5);

    if (list.size() !== 3) {
        throw new Error('shouldNotDeleteNode');
    }

    console.log('OK');
}

test();
