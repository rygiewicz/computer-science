function getIntersectingNode(list1, list2) {
  let current1 = list1.head;

  while (current1) {
    let current2 = list2.head;

    while (current2) {
      if (current2 === current1) {
        return current2;
      }

      current2 = current2.next;
    }

    current1 = current1.next;
  }
}

test();

function test() {
  shouldDetermineIntersectingNode();
}

function shouldDetermineIntersectingNode() {
  const list1 = new LinkedList();
  const list2 = new LinkedList();
  const intersecting = new LinkedListNode(55);

  list1.add(6);
  list1.add(2);
  list1.add(3);
  list1.add(6);
  list1.addNode(intersecting);
  list1.add(7);
  list1.add(2);

  list2.add(12);
  list2.add(33);
  list2.add(26);
  list2.addNode(intersecting);
  list2.add(9);
  list2.add(60);
  list2.add(79);

  const result = getIntersectingNode(list1, list2);

  if (result !== intersecting) {
    throw new Error('shouldDetermineIntersectingNode');
  }

  console.log('OK');
}
