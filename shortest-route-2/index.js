function Grid(width) {
    this.width = width;
    this.data = {};
}

Grid.prototype.getValue = function (x, y) {
    const index = (y * this.width) + x;

    return this.data[index];
}

Grid.prototype.setValue = function (x, y, value) {
    const index = (y * this.width) + x;

    this.data[index] = value;
}

function Board(width, height) {
    this.width = width;
    this.height = height;
    this.disabledSquares = new Grid(width);
}

Board.prototype.width = 0;
Board.prototype.height = 0;

Board.prototype.getShortestRoute = function (from, to, memo = {}, path = [from]) {
    const fromX = from[0];
    const fromY = from[1];
    const toX = to[0];
    const toY = to[1];

    if (fromX > toX || fromY > toY) {
        return null;
    }

    if (this.isSquareDisabled(fromX, fromY)) {
        return null;
    }

    if (fromX === toX && fromY === toY) {
        return path;
    }

    const goRight = [fromX + 1, fromY];
    const goDown = [fromX, fromY + 1];
    const goAcross = [fromX + 1, fromY + 1];

    const routes = [
        this.getShortestRoute(goRight, to, memo, [...path, goRight]),
        this.getShortestRoute(goDown, to, memo, [...path, goDown]),
        this.getShortestRoute(goAcross, to, memo, [...path, goAcross]),
    ];

    return routes.reduce((previous, current) => {
        if (!previous || !current) {
            return previous || current;
        }

        if (current.length < previous.length) {
            return current;
        }

        return previous;
    });
}

Board.prototype.disableSquare = function (x, y) {
    this.disabledSquares.setValue(x, y, true);
}

Board.prototype.isSquareDisabled = function (x, y) {
    return this.disabledSquares.getValue(x, y);
}

test();

function test() {
    shouldCreateBoard();
    shouldDisableSquare();
    shouldGetShortestRoute();
    shouldGetShortestRouteAroundDisabledSquares();
    shouldGetShortestRouteBelowDisabledSquares();
    shouldGetShortestRouteAboveDisabledSquares();
    benchmark();
}

function shouldCreateBoard() {
    const board = new Board(10, 10);

    if (board.width !== 10 || board.height !== 10) {
        throw new Error('shouldCreateBoard');
    }

    console.log('OK');
}

function shouldDisableSquare() {
    const board = new Board(10, 10);

    board.disableSquare(5, 6);

    if (!board.isSquareDisabled(5, 6)) {
        throw new Error('shouldDisableSquare');
    }

    if (board.isSquareDisabled(5, 5)) {
        throw new Error('shouldDisableSquare');
    }

    console.log('OK');
}

function shouldGetShortestRoute() {
    const board = new Board(7, 7);

    shortest = board.getShortestRoute([0, 0], [6, 6]);

    if (shortest.length !== 7) {
        throw new Error('shouldGetShortestRoute');
    }

    console.log('OK');
}

function shouldGetShortestRouteAroundDisabledSquares() {
    const board = new Board(7, 7);
    board.disableSquare(3, 3);

    shortest = board.getShortestRoute([0, 0], [6, 6]);

    if (shortest.length !== 8) {
        throw new Error('shouldGetShortestRouteAroundDisabledSquares');
    }

    console.log('OK');
}

function shouldGetShortestRouteBelowDisabledSquares() {
    const board = new Board(7, 7);
    board.disableSquare(3, 0);
    board.disableSquare(3, 1);
    board.disableSquare(3, 2);
    board.disableSquare(3, 3);

    shortest = board.getShortestRoute([0, 0], [6, 6]);

    if (shortest.length !== 8) {
        throw new Error('shouldGetShortestRouteBelowDisabledSquares');
    }

    console.log('OK');
}

function shouldGetShortestRouteAboveDisabledSquares() {
    const board = new Board(7, 7);
    board.disableSquare(3, 6);
    board.disableSquare(3, 5);
    board.disableSquare(3, 4);
    board.disableSquare(3, 3);

    shortest = board.getShortestRoute([0, 0], [6, 6]);

    if (shortest.length !== 8) {
        throw new Error('shouldGetShortestRouteAboveDisabledSquares');
    }

    console.log('OK');
}

function benchmark() {
    console.time('shortest route 2');

    const board = new Board(10, 10);

    shortest = board.getShortestRoute([0, 0], [9, 9]);

    console.timeEnd('shortest route 2');
}
