function permutations(text, prefix = '', result = []) {
  if (!text.length) {
    result.push(prefix);
  } else {
    for (let i = 0; i < text.length; i++) {
      permutations(text.slice(0, i) + text.slice(i + 1), prefix + text[i], result);
    }
  }

  return result;
}

test();

function test() {
  shouldProduceCorrectResult()
}

function shouldProduceCorrectResult() {
  const text = 'renault';

  const result = permutations(text);

  if (result.length !== 5040) {
    throw new Error('shouldProduceCorrectResult');
  }

  console.log('OK');
}
