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

test();

function test() {
  shouldSumListsReverse();
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

  result.print();

  if (result.get(0).data !== 2 || result.get(1).data !== 1 || result.get(2).data !== 9) {
    throw new Error('shouldSumLists');
  }

  console.log('OK');
}
