function HashMap(size = 10) {
  this.data = [];
  this.size = size;
}

HashMap.prototype.getHash = function (key) {
  key = String(key);

  return key.length;
};

HashMap.prototype.getIndex = function (key) {
  return this.getHash(key) % this.size;
}

HashMap.prototype.set = function (key, value) {
  const index = this.getIndex(key);

  this.data[index] = this.data[index] || [];

  const existing = this.data[index].find((keyValue) => keyValue[0] === key);

  if (existing) {
    existing[1] = value;
  } else {
    this.data[index].push([key, value]);
  }
}

HashMap.prototype.get = function (key) {
  const index = this.getIndex(key);
  const keyValuePair = this.data[index].find((keyValue) => keyValue[0] === key);

  return keyValuePair && keyValuePair[1];
}

HashMap.prototype.delete = function (key) {
  const index = this.getIndex(key);

  if (!this.data[index]) {
    return;
  }

  this.data[index] = this.data[index].filter((keyValue) => keyValue[0] !== key);
}

test();

function test() {
  shouldSetValue();
  shouldOverwriteValue();
  shouldDeleteValue();
}

function shouldSetValue() {
  const map = new HashMap();
  const expectedValue = 'Roll up to the crib with some Bartles and James';

  map.set('lyrics', expectedValue);

  const value = map.get('lyrics');

  if (value !== expectedValue) {
    throw new Error('shouldSetValue');
  }

  console.log('OK');
}

function shouldOverwriteValue() {
  const map = new HashMap();
  const expectedValue = 'Roll up to the crib with some Bartles and James';

  map.set('lyrics', 'Hop off the bus with the Alizé');
  map.set('lyrics', expectedValue);

  const value = map.get('lyrics');

  if (value !== expectedValue) {
    throw new Error('shouldOverwriteValue');
  }

  console.log('OK');
}

function shouldDeleteValue() {
  const map = new HashMap();

  map.set('lyrics', 'Roll up to the crib with some Bartles and James');
  map.delete('lyrics');

  const value = map.get('lyrics');

  if (value) {
    throw new Error('shouldDeleteValue');
  }

  console.log('OK');
}
