function MyQueue() {
  this.mainStack = [];
  this.tempStack = [];
}

MyQueue.prototype.size = function () {
  return this.mainStack.length;
}

MyQueue.prototype.add = function (item) {
  this.mainStack.push(item);
}

MyQueue.prototype.remove = function () {
  this.tempStack = [];

  while (this.mainStack.length) {
    this.tempStack.push(this.mainStack.pop());
  }

  const result = this.tempStack.pop();

  while (this.tempStack.length) {
    this.mainStack.push(this.tempStack.pop());
  }

  return result;
}

test();

function test() {
  shouldAdd();
  shouldRemove();
}

function shouldAdd() {
  const queue = new MyQueue();
  const initialSize = queue.size();

  queue.add(1);
  queue.add(2);
  queue.add(3);
  queue.add(4);
  queue.add(5);
  queue.add(6);

  const currentSize = queue.size();

  if (initialSize !== 0 || currentSize !== 6) {
    throw new Error('shouldAdd');
  }

  console.log('OK');
}

function shouldRemove() {
  const queue = new MyQueue();
  const initialSize = queue.size();

  queue.add(1);
  queue.add(2);
  queue.add(3);
  queue.add(4);
  queue.add(5);
  queue.add(6);

  const result1 = queue.remove();
  const result2 = queue.remove();

  const currentSize = queue.size();

  if (initialSize !== 0 || currentSize !== 4 || result1 !== 1 || result2 !== 2) {
    throw new Error('shouldAdd');
  }

  console.log('OK');
}
