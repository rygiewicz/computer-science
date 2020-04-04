function sumListsReverse(list1, list2) {
  const summedList = new LinkedList();

  let current1 = list1.head;
  let current2 = list2.head;
  let extra = 0;

  while (current1 || current2 || extra) {
    const value1 = current1 ? current1.data : 0;
    const value2 = current2 ? current2.data : 0;
    const sum = value1 + value2 + extra;
    const remainder = sum % 10;

    summedList.add(remainder);

    extra = (sum - remainder) / 10;

    current1 = current1 && current1.next;
    current2 = current2 && current2.next;
  }

  return summedList;
}

function sumListsForward(list1, list2) {
  equalizeLength(list1, list2);

  sum = sumForward(list1.head, list2.head);
  result = sum[0];
  extra = sum[1];

  if (extra) {
    const node = new LinkedListNode(extra);

    node.next = result.head;
    result.head = node;
  }

  return result;
}

function sumForward(head1, head2) {
  let result;
  let extra;

  if (head1.next || head2.next) {
    nextSum = sumForward(head1.next, head2.next);
    result = nextSum[0];
    extra = nextSum[1];
  } else {
    result = new LinkedList();
    extra = 0;
  }

  const sum = head1.data + head2.data + extra;
  const remainder = sum % 10;
  const carry = (sum - remainder) / 10;

  const node = new LinkedListNode(remainder);

  node.next = result.head;
  result.head = node;

  return [result, carry];
}

function equalizeLength(list1, list2) {
  const length1 = list1.size();
  const length2 = list2.size();

  if (length1 === length2) {
    return;
  }

  const target = length1 > length2 ? list2 : list1;

  for (let i = 0; i < Math.abs(length1 - length2); i++) {
    const zero = new LinkedListNode(0);

    zero.next = target.head;
    target.head = zero;
  }
}

test();

function test() {
  shouldEqualizeLength();
  shouldSumListsReverse();
  shouldSumListsForward();
  shouldSumListsForward2();
}

function shouldEqualizeLength() {
  const list1 = new LinkedList();
  const list2 = new LinkedList();

  list1.add(7);
  list1.add(1);
  list1.add(6);

  list2.add(5);

  equalizeLength(list1, list2);

  if (list2.size() !== 3 || list2.get(0).data !== 0 || list2.get(1).data !== 0 || list2.get(2).data !== 5) {
    throw new Error('shouldEqualizeLength');
  }

  console.log('OK');
}

function shouldSumListsReverse() {
  const list1 = new LinkedList();
  const list2 = new LinkedList();

  list1.add(7);
  list1.add(1);
  list1.add(6);

  list2.add(5);
  list2.add(9);
  list2.add(2);

  result = sumListsReverse(list1, list2);

  if (result.get(0).data !== 2 || result.get(1).data !== 1 || result.get(2).data !== 9) {
    throw new Error('shouldSumListsReverse');
  }

  console.log('OK');
}

function shouldSumListsForward() {
  const list1 = new LinkedList();
  const list2 = new LinkedList();

  list1.add(6);
  list1.add(1);
  list1.add(7);

  list2.add(2);
  list2.add(9);
  list2.add(5);

  result = sumListsForward(list1, list2);

  if (result.get(0).data !== 9 || result.get(1).data !== 1 || result.get(2).data !== 2) {
    throw new Error('shouldSumListsForward');
  }

  console.log('OK');
}

function shouldSumListsForward2() {
  const list1 = new LinkedList();
  const list2 = new LinkedList();

  list1.add(6);
  list1.add(1);
  list1.add(7);

  list2.add(3);
  list2.add(9);
  list2.add(5);

  result = sumListsForward(list1, list2);

  if (result.get(0).data !== 1 || result.get(1).data !== 0 || result.get(2).data !== 1 || result.get(3).data !== 2) {
    throw new Error('shouldSumListsForward2');
  }

  console.log('OK');
}