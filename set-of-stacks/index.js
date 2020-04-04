function MultiStack(capacity) {
  this.capacity = capacity;
  this.stacks = [[]];
  this.stackIndex = 0;
}

MultiStack.prototype.push = function (item) {
  if (this.stacks[this.stackIndex].length === this.capacity) {
    this.stacks.push([]);
    this.stackIndex++;
  }

  this.stacks[this.stackIndex].push(item);
}

MultiStack.prototype.pop = function () {
  if (this.stacks[this.stackIndex].length === 0) {
    this.stacks.pop();
    this.stackIndex--;
  }

  return this.stacks[this.stackIndex].pop();
}

MultiStack.prototype.popAt = function (stackIndex) {
  if (stackIndex > this.stackIndex) {
    return;
  }

  if (this.stacks[stackIndex].length === 0) {
    return;
  }

  return this.stacks[stackIndex].pop();
}

test();

function test() {
  shouldWorkAfterExceedingCapacity();
  shouldPopAt();
}

function shouldWorkAfterExceedingCapacity() {
  const stack = new MultiStack(2);

  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.push(4);
  stack.push(5);

  if (stack.pop() !== 5 || stack.pop() !== 4 || stack.pop() !== 3 || stack.pop() !== 2 || stack.pop() !== 1) {
    throw new Error('shouldWorkAfterExceedingCapacity');
  }

  console.log('OK');
}

function shouldPopAt() {
  const stack = new MultiStack(2);

  stack.push(1);
  stack.push(2);
  stack.push(3);
  stack.push(4);
  stack.push(5);

  if (stack.popAt(1) !== 4 || stack.popAt(1) !== 3 || stack.popAt(1) !== undefined) {
    throw new Error('shouldPopAt');
  }

  console.log('OK');
}
