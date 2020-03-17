function Memo() {
    this.data = {};
}

Memo.prototype.getKey = function (from, to) {
    return [...from, ...to].join('-');
}

Memo.prototype.getValue = function (from, to) {
    const key = this.getKey(from, to);

    return this.data[key];
}

Memo.prototype.setValue = function (from, to, value) {
    const key = this.getKey(from, to);

    this.data[key] = value;
}

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

Board.prototype.getShortestRoute = function (from, to) {
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
        return [to];
    }

    const goRight = [fromX + 1, fromY];
    const goDown = [fromX, fromY + 1];
    const goAcross = [fromX + 1, fromY + 1];

    const routes = [
        this.getShortestRoute(goRight, to),
        this.getShortestRoute(goDown, to),
        this.getShortestRoute(goAcross, to),
    ];

    let shortest = routes.reduce((previous, current) => {
        if (!previous || !current) {
            return previous || current;
        }

        if (current.length < previous.length) {
            return current;
        }

        return previous;
    });

    if (shortest) {
        shortest = [from, ...shortest]
    }

    return shortest;
}

Board.prototype.disableSquare = function (x, y) {
    this.disabledSquares.setValue(x, y, true);
}

Board.prototype.isSquareDisabled = function (x, y) {
    return this.disabledSquares.getValue(x, y);
}

function BoardMemo(width, height) {
    Board.call(this, width, height);

    this.memo = new Memo(); // TODO: clear memo when disabling squares
}

BoardMemo.prototype = {
    ...Board.prototype,
    getShortestRoute: function (from, to) {
        const memo = this.memo;

        if (memo) {
            const value = memo.getValue(from, to);

            if (typeof value !== 'undefined') {
                return value;
            }
        }

        const result = Board.prototype.getShortestRoute.call(this, from, to);

        if (memo) {
            memo.setValue(from, to, result);
        }

        return result;
    },
};

test();

function test() {
    shouldCreateBoard();
    shouldDisableSquare();
    shouldGetShortestRoute();
    shouldGetShortestRouteMemo();
    shouldGetShortestRouteAroundDisabledSquares();
    shouldGetShortestRouteBelowDisabledSquares();
    shouldGetShortestRouteAboveDisabledSquares();
    benchmark();
    benchmarkMemo();
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

function shouldGetShortestRouteMemo() {
    const board = new BoardMemo(7, 7);

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
    console.time('shortest route');

    const board = new Board(10, 10);

    shortest = board.getShortestRoute([0, 0], [9, 9]);

    console.timeEnd('shortest route');
}

function benchmarkMemo() {
    console.time('shortest route memo');

    const board = new BoardMemo(10, 10);

    shortest = board.getShortestRoute([0, 0], [9, 9]);

    console.timeEnd('shortest route memo');
}
