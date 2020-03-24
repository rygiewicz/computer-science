function octalToDecimal(octal) {
  return baseToDecimal(octal, 8);
}

function binaryToDecimal(binary) {
  return baseToDecimal(binary, 2);
}

function baseToDecimal(nonDecimal, base) {
  nonDecimal = String(nonDecimal);
  decimal = 0;

  for (let i = 0; i < nonDecimal.length; i++) {
    const digit = parseInt(nonDecimal[i]);
    const pow = nonDecimal.length - i - 1;

    decimal += digit * Math.pow(base, pow);
  }

  return decimal;
}

function decimalToBinary(decimal) {
  return decimalToBase(decimal, 2);
}

function decimalToOctal(decimal) {
  return decimalToBase(decimal, 8);
}

function decimalToBase(decimal, base) {
  let result = '';

  while (decimal > 0) {
    const quotient = Math.floor(decimal / base);
    const remainder = decimal % base;

    decimal = quotient;

    result = remainder + result;
  }

  return result;
}

test();

function test() {
  shouldConvertOctal();
  shouldConvertBinary();
  shouldConvertToBinary();
  shouldConvertToOctal();
}

function shouldConvertOctal() {
  const decimal = octalToDecimal('100');

  if (decimal !== 64) {
    throw new Error('shouldConvertOctal');
  }

  console.log('OK');
}

function shouldConvertBinary() {
  const decimal = binaryToDecimal('111001');

  if (decimal !== 57) {
    throw new Error('shouldConvertBinary');
  }

  console.log('OK');
}

function shouldConvertToBinary() {
  const binary = decimalToBinary(57);

  if (binary !== '111001') {
    throw new Error('shouldConvertToBinary');
  }

  console.log('OK');
}

function shouldConvertToOctal() {
  const octal = decimalToOctal(64);

  if (octal !== '100') {
    throw new Error('shouldConvertToOctal');
  }

  console.log('OK');
}
