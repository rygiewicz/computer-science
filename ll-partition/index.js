LinkedList.prototype.partition = function (el) {
  const size = this.size();
  let tail = this.tail();
  let current = this.head;

  for (let i = 0; i < size; i++) {
    if (current.data >= el.data) {
      const newTail = new LinkedListNode(current.data);
      tail.next = newTail;
      tail = newTail;

      current.data = current.next.data;
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
}

LinkedList.prototype.tail = function () {
  let tail = this.head;

  while (tail && tail.next) {
    tail = tail.next;
  }

  return tail;
}

test();

function test() {
  shouldPartition();
}

function shouldPartition() {
  const list = new LinkedList();

  list.add(6);
  list.add(2);
  list.add(3);
  list.add(6);
  list.add(5);
  list.add(7);
  list.add(2);

  const el = list.get(4); // data === 5

  list.partition(el);

  if (list.get(0).data >= 5 || list.get(1).data >= 5 || list.get(2).data >= 5) {
    throw new Error('shouldPartition');
  }

  console.log('OK');
}
