function Stack() {
  const stack = [];

  stack.peek = function () {
    return this[this.length - 1];
  }

  return stack;
}

function sortStack(stack) {
  const sorted = Stack();

  while (stack.length) {
    const tmp = stack.pop();

    while (sorted.peek() > tmp) {
      stack.push(sorted.pop());
    }

    sorted.push(tmp);
  }

  while (sorted.length) {
    stack.push(sorted.pop());
  }
}

test();

function test() {
  shouldSort();
}

function shouldSort() {
  const stack = Stack();

  stack.push(1);
  stack.push(8);
  stack.push(3);
  stack.push(40);
  stack.push(12);
  stack.push(18);
  stack.push(66);

  const initialLength = stack.length;
  sortStack(stack);

  if (stack.length !== initialLength || stack.pop() !== 1 || stack.pop() !== 3 || stack.pop() !== 8 ||
    stack.pop() !== 12 || stack.pop() !== 18 || stack.pop() !== 40 || stack.pop() !== 66) {
    throw new Error('shouldSort');
  }

  console.log('OK');
}
