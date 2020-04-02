LinkedList.prototype.removeDuplicates = function () {
  this.sort();

  let current = this.head;

  while (current && current.next) {
    const next = current.next;

    if (current.data === next.data) {
      current.next = next.next;
    }

    current = current.next;
  }
}

LinkedList.prototype.removeDuplicates2 = function () {
  let current = this.head;

  while (current) {
    removeDuplicates2(current);
    current = current.next;
  }
}

function removeDuplicates2(head) {
  let previous = head;
  let current = head.next;

  while (current) {
    if (current.data === head.data) {
      previous.next = current.next;
    }

    previous = current;
    current = current.next;
  }
}

test();

function test() {
  shouldBeUnique();
  shouldBeUnique2();
}

function shouldBeUnique() {
  const list = new LinkedList();

  list.add(6);
  list.add(2);
  list.add(3);
  list.add(6);
  list.add(5);
  list.add(7);
  list.add(2);

  list.removeDuplicates();

  if (list.get(0).data !== 2 || list.get(1).data !== 3 || list.get(2).data !== 5 || list.get(3).data !== 6 ||
    list.get(4).data !== 7) {
    throw new Error('shouldBeUnique');
  }

  console.log('OK');
}


function shouldBeUnique2() {
  const list = new LinkedList();

  list.add(6);
  list.add(2);
  list.add(3);
  list.add(6);
  list.add(5);
  list.add(7);
  list.add(2);

  list.removeDuplicates2();

  if (list.get(0).data !== 6 || list.get(1).data !== 2 || list.get(2).data !== 3 || list.get(3).data !== 5 ||
    list.get(4).data !== 7) {
    throw new Error('shouldBeUnique2');
  }

  console.log('OK');
}