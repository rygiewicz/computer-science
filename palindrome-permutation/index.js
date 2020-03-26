function isPalindromePermutation(string) {
  string = String(string);

  let trueLength = 0;
  const letterCount = {};

  for (let i = 0; i < string.length; i++) {
    const value = string[i].toLowerCase();

    if (isLetter(value)) {
      trueLength++;
      letterCount[value] = letterCount[value] || 0;
      letterCount[value]++;
    }
  }

  const allowedOddCount = isEven(trueLength) ? 0 : 1;
  let oddCount = 0;

  return !Object.keys(letterCount).find((key) => {
    const count = letterCount[key];

    if (!isEven(count)) {
      oddCount++;
    }

    if (oddCount > allowedOddCount) {
      return true;
    }
  });
}

function isEven(number) {
  number = Number(number);

  return !(number % 2);
}

function isLetter(letter) {
  letter = String(letter);

  if (letter.length !== 1) {
    return false;
  }

  const lcLetter = letter.toLowerCase();

  return lcLetter >= 'a' && lcLetter <= 'z';
}

test();

function test() {
  shouldDetermineIfIsLetter();
  shouldDetermineIfIsEven();
  shouldDetermineIfIsPalindromePermutation();
}

function shouldDetermineIfIsLetter() {
  const notLetter = isLetter('!');
  const yesLetter = isLetter('G');
  const notLetter2 = isLetter('dog');

  if (notLetter !== false || yesLetter !== true || notLetter2 !== false) {
    throw new Error('shouldDetermineIfIsLetter');
  }

  console.log('OK');
}

function shouldDetermineIfIsEven() {
  const notEven = isEven(5);
  const yesEven = isEven(8);
  const yesEven2 = isEven(0);

  if (notEven !== false || yesEven !== true || yesEven2 !== true) {
    throw new Error('shouldDetermineIfIsEven');
  }

  console.log('OK');
}

function shouldDetermineIfIsPalindromePermutation() {
  const notPP = isPalindromePermutation('Tact Coal');
  const yesPP = isPalindromePermutation('Tact Coa');
  const yesPP2 = isPalindromePermutation('Tact l Coal');

  if (notPP !== false || yesPP !== true || yesPP2 !== true) {
    throw new Error('shouldDetermineIfIsPalindromePermutation');
  }

  console.log('OK');
}
