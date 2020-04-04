function getLoopStart(list) {
  let slow = list.head;
  let fast = list.head;

  while (slow && fast) {
    slow = slow.next;
    fast = fast.next && fast.next.next;

    if(slow === fast) {
      break;
    }
  }

  if (slow !== fast) {
    return;
  }

  slow = list.head;

  while (slow && fast && slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}

test();

function test() {
  shouldDetermineLoopStart();
}

function shouldDetermineLoopStart() {
  const list = new LinkedList();
  const nodeStart = new LinkedListNode(66);
  const nodeEnd = new LinkedListNode(77);
  nodeEnd.next = nodeStart;

  list.add(6);
  list.add(2);
  list.add(3);
  list.addNode(nodeStart);
  list.add(32);
  list.add(21);
  list.add(53);
  list.add(7);
  list.add(2);
  list.addNode(nodeEnd);

  const result = getLoopStart(list);

  if (result !== nodeStart) {
    throw new Error('shouldDetermineLoopStart');
  }

  console.log('OK');
}
