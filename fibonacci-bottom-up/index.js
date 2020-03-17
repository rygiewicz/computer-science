function fib(n, memo = [0, 1]) {
  for (let i = 2; i <= n; i++) {
    const fibI = memo[i - 1] + memo[i - 2];

    memo[i] = fibI;
  }

  return memo[n];
}

test();

function test() {
  shouldHaveCorrectResult();
  benchmark();
}

function shouldHaveCorrectResult() {
  const result = fib(20);

  if (result !== 6765) {
    throw new Error('shouldHaveCorrectResult');
  }

  console.log('OK');
}

function benchmark() {
  const n = 1000;

  console.time(`fib(${n})`);

  console.log(fib(n));

  console.timeEnd(`fib(${n})`);
}
