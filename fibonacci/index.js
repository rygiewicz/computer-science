function fib(n, memo) {
    if (memo && memo[n] >= 0) {
        return memo[n];
    }

    if (n === 0) {
        return 0;
    }

    if (n === 1) {
        return 1;
    }

    const result = fib(n - 1, memo) + fib(n - 2, memo);

    if (memo) {
        memo[n] = result;
    }

    return result;
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
    console.time('cache');

    console.log(fib(36, []));

    console.timeEnd('cache');

    console.time('no-cache');

    console.log(fib(36));

    console.timeEnd('no-cache');
}
