function Matrix(size, data = []) {
  this.size = size;
  this.data = data;
}

Matrix.prototype.getValue = function (row, col) {
  const index = this.getIndex(row, col);

  return this.data[index];
}

Matrix.prototype.setValue = function (row, col, value) {
  const index = this.getIndex(row, col);

  this.data[index] = value;
}

Matrix.prototype.getIndex = function (row, col) {
  return (row * this.size) + col;
}

Matrix.prototype.rotate = function () {
  this._rotate(this.data, 0, 0, this.size);
}

Matrix.prototype._rotate = function (data, startRow, startCol, size) {
  const endRow = startRow + size - 1;
  const endCol = startCol + size - 1;

  for (let i = 0; i < size - 1; i++) {
    const top = this.getIndex(startRow, startCol + i);
    const right = this.getIndex(startRow + i, endCol);
    const bottom = this.getIndex(endRow, endCol - i);
    const left = this.getIndex(endRow - i, startCol);

    const dataLeft = data[left];

    data[left] = data[bottom];
    data[bottom] = data[right];
    data[right] = data[top];
    data[top] = dataLeft;
  }

  if (size > 3) {
    this._rotate(data, startRow + 1, startCol + 1, size - 2);
  }
}

test();

function test() {
  shouldSetValue();
  shouldInit();
  shouldRotateMatrix();
}

function shouldInit() {
  const ex = 07;

  const matrix = new Matrix(4, [
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
  const matrix = new Matrix(20);
  const expected = 777;

  matrix.setValue(2, 9, expected);

  const value = matrix.getValue(2, 9);

  if (value !== expected) {
    throw new Error('shouldSetValue');
  }

  console.log('OK');
}

function shouldRotateMatrix() {
  const matrix = new Matrix(5, [
    01, 02, 03, 04, 05,
    06, 07, 08, 09, 10,
    11, 12, 13, 14, 15,
    16, 17, 18, 19, 20,
    21, 22, 23, 24, 25,
  ]);

  matrix.rotate();

  if (matrix.getValue(0, 2) !== 11 || matrix.getValue(2, 4) !== 3 ||
    matrix.getValue(4, 2) !== 15 || matrix.getValue(2, 0) !== 23) {
    throw new Error('shouldRotateMatrix frame 1');
  }

  if (matrix.getValue(1, 2) !== 12 || matrix.getValue(2, 3) !== 8 ||
    matrix.getValue(3, 2) !== 14 || matrix.getValue(2, 1) !== 18) {
    throw new Error('shouldRotateMatrix frame 2');
  }

  if (matrix.getValue(2, 2) !== 13) {
    throw new Error('shouldRotateMatrix middle');
  }

  console.log('OK');
}
