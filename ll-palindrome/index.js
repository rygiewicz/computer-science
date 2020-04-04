function isPalindrome(list) {
  let slow = list.head;
  let fast = list.head;
  let first = '';
  let second = '';

  while (slow) {
    if (fast) {
      first = first.concat(slow.data);
    } else {
      second = slow.data.concat(second);
    }

    slow = slow.next;
    fast = fast && fast.next && fast.next.next;
  }

  for (let i = 0; i < second.length; i++) {
    if (first[i] !== second[i]) {
      return false;
    }
  }

  return true;
}

test();

function test() {
  shouldDetermineIfPalindrome();
  shouldDetermineIfPalindrome2();
  shouldDetermineIfPalindrome3();
}

function shouldDetermineIfPalindrome() {
  const list = new LinkedList();

  list.add('t');
  list.add('a');
  list.add('c');
  list.add('o');
  list.add('c');
  list.add('a');
  list.add('t');

  const expectTrue = isPalindrome(list);

  if (expectTrue !== true) {
    throw new Error('shouldDetermineIfPalindrome');
  }

  console.log('OK');
}

function shouldDetermineIfPalindrome2() {
  const list = new LinkedList();

  list.add('a');
  list.add('b');
  list.add('c');
  list.add('d');
  list.add('d');
  list.add('c');
  list.add('b');
  list.add('a');

  const expectTrue = isPalindrome(list);

  if (expectTrue !== true) {
    throw new Error('shouldDetermineIfPalindrome2');
  }

  console.log('OK');
}

function shouldDetermineIfPalindrome3() {
  const list = new LinkedList();

  list.add('g');
  list.add('o');
  list.add('o');
  list.add('d');
  list.add('d');
  list.add('o');
  list.add('g');

  const expectFalse = isPalindrome(list);

  if (expectFalse !== false) {
    throw new Error('shouldDetermineIfPalindrome3');
  }

  console.log('OK');
}
