function Matrix(width, height, data = []) {
  this.width = width;
  this.height = height;
  this.data = data;
}

Matrix.prototype.getValue = function (row, col) {
  const index = this.getIndex(row, col);

  return this.data[index];
}

Matrix.prototype.setValue = function (row, col, value) {
  if (value === 0) {
    return this.setZeroValue(row, col);
  }

  this._setValue(row, col, value);
}

Matrix.prototype._setValue = function (row, col, value) {
  const index = this.getIndex(row, col);
  this.data[index] = value;
}

Matrix.prototype.setZeroValue = function (row, col) {
  for (let c = 0; c < this.width; c++) {
    this._setValue(row, c, 0);
  }

  for (let r = 0; r < this.height; r++) {
    this._setValue(r, col, 0);
  }
}

Matrix.prototype.getIndex = function (row, col) {
  return (row * this.width) + col;
}

test();

function test() {
  shouldSetValue();
  shouldInit();
  shouldZeroRowAndCol();
}

function shouldInit() {
  const ex = 07;

  const matrix = new Matrix(4, 4, [
    01, 02, 03, 04,
    05, 06, ex, 08,
    09, 10, 11, 12,
    13, 14, 15, 16,
  ]);

  const value = matrix.getValue(1, 2);

  if (value !== ex) {
    throw new Error('shouldInit');
  }

  console.log('OK');
}

function shouldSetValue() {
  const matrix = new Matrix(20, 20);
  const expected = 777;

  matrix.setValue(2, 9, expected);

  const value = matrix.getValue(2, 9);

  if (value !== expected) {
    throw new Error('shouldSetValue');
  }

  console.log('OK');
}

function shouldZeroRowAndCol() {
  const matrix = new Matrix(5, 5, [
    01, 02, 03, 04, 05,
    06, 07, 08, 09, 10,
    11, 12, 13, 14, 15,
    16, 17, 18, 19, 20,
    21, 22, 23, 24, 25,
  ]);

  matrix.setValue(2, 1, 0);

  if (matrix.getValue(2, 4) !== 0 || matrix.getValue(3, 1) !== 0) {
    throw new Error('shouldZeroRowAndCol');
  }

  console.log('OK');
}
