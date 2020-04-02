LinkedList.prototype.kthToLast = function (k) {
  if (k < 1) {
    return null;
  }

  let current = this.head;
  let runner = this.get(k - 1);

  while (current) {
    if (!runner.next) {
      return current;
    }

    current = current.next;
    runner = runner.next;
  }
}

test();

function test() {
  shouldGetSecondToLast();
}

function shouldGetSecondToLast() {
  const list = new LinkedList();

  list.add(6);
  list.add(2);
  list.add(3);
  list.add(6);
  list.add(5);
  list.add(7);
  list.add(2);

  const result = list.kthToLast(2);

  if (!result || result.data !== 7) {
    throw new Error('shouldGetSecondToLast');
  }

  console.log('OK');
}

function shouldGetFifthToLast() {
  const list = new LinkedList();

  list.add(6);
  list.add(2);
  list.add(3);
  list.add(6);
  list.add(5);
  list.add(7);
  list.add(2);

  const result = list.kthToLast(5);

  if (!result || result.data !== 3) {
    throw new Error('shouldGetFifthToLast');
  }

  console.log('OK');
}
