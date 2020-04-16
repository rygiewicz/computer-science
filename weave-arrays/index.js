function weave(list1, list2, prefix = [], result = []) {
  if (list1.length) {
    weave(list1.slice(1), list2, [...prefix, list1[0]], result);
  }

  if (list2.length) {
    weave(list1, list2.slice(1), [...prefix, list2[0]], result);
  }

  if (!list1.length && !list2.length) {
    result.push(prefix);
  }

  return result;
}

test();

function test() {
  shouldProduceCorrectResult();
}

function shouldProduceCorrectResult() {
  const list1 = [1, 2];
  const list2 = [3, 4];

  const result = weave(list1, list2);

  if (!result || result.length !== 6) {
    throw new Error('shouldProduceCorrectResult');
  }

  console.log('OK');
}
