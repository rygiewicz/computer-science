function compress(string) {
  let prevChar = '';
  let count = 0;
  let result = '';

  for (let i = 0; i <= string.length; i++) {
    const char = string[i];
    
    if(i === 0) {
      prevChar = char;
    }

    if(char !== prevChar) {
      result = result.concat(prevChar, count);
      count = 0;
      prevChar = char;
    }

    count++;
  }

  return result;
}

test();

function test() {
  shouldCompress();
}

function shouldCompress() {
  const input = 'aabcccccaaa';
  const expected = 'a2b1c5a3';
  const result = compress(input);

  if (result !== expected) {
    throw new Error('shouldCompress');
  }

  console.log('OK');
}
