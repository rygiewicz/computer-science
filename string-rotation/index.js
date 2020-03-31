function isSubstring(smaller, larger) {
  return larger.indexOf(smaller) !== -1;
}

function isRotated(subject, original) {
  if (subject.length !== original.length) {
    return false;
  }

  return isSubstring(subject, original + original);
}

test();

function test() {
  shouldDetermineRotated();
}

function shouldDetermineRotated() {
  if (isRotated('dino', 'dinosaur') || isRotated('dsaurino', 'dinosaur') || !isRotated('saurdino', 'dinosaur')) {
    throw new Error('shouldDetermineRotated');
  }

  console.log('OK');
}
