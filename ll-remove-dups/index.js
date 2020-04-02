
test();

function test() {
  shouldBeUnique();
}

function shouldBeUnique() {
  const list = new LinkedList();

  if (list.size() !== 0) {
    throw new Error('shouldBeUnique');
  }

  console.log('OK');
}
