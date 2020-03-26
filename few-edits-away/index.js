const allowedDiff = 1;

function areFewEditsAway(stringA, stringB) {
  const lengthDiff = Math.abs(stringA.length - stringB.length);

  if (lengthDiff > allowedDiff) {
    return false;
  }

  const isALonger = stringA.length > stringB.length;

  const longer = isALonger ? stringA : stringB;
  const shorter = isALonger ? stringB : stringA;
  let missingCount = 0;
  let wrongCount = 0;

  for (let i = 0; i < longer.length; i++) {
    const j = i - missingCount;

    if (shorter[j] !== longer[i]) {
      if (shorter[j + 1] !== longer[i + 1]) {
        missingCount++;
      } else {
        wrongCount++;
      }
    }

    if (missingCount + wrongCount > allowedDiff) {
      return false;
    }
  }

  return true;
}

test();

function test() {
  shouldDetermineIfAreFewEditsAway();
}

function shouldDetermineIfAreFewEditsAway() {
  const negative = areFewEditsAway('pales', 'ple');
  const positive = areFewEditsAway('pales', 'ples');
  const positive2 = areFewEditsAway('pale', 'ple');
  const positive3 = areFewEditsAway('pales', 'pale');
  const positive4 = areFewEditsAway('pale', 'bale');
  const negative2 = areFewEditsAway('pale', 'bae');

  if (negative !== false || positive !== true || positive2 !== true || positive3 !== true ||
    positive4 !== true || negative2 !== false) {
    throw new Error('shouldDetermineIfAreFewEditsAway');
  }

  console.log('OK');
}
