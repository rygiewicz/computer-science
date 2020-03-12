function Board(width, height) {
    this.width = width;
    this.height = height;
    this.disabledSquares = {};
}

Board.prototype.width = 0;
Board.prototype.height = 0;

Board.prototype.getShortestRoute = function (from, to) {
    if (to[0] >= this.width || to[1] >= this.height) {
        throw new Error('To is outside grid');
    }

    const routes = [];

    this.getRoutes(from, to, routes);

    if (!routes.length) {
        return [];
    }

    return routes.reduce((previous, current) => {
        if (current.length < previous.length) {
            return current;
        }

        return previous;
    });
}

Board.prototype.getRoutes = function (from, to, routes, path = [from]) {
    if (from[0] > to[0] || from[1] > to[1]) {
        return;
    }

    if (this.isSquareDisabled(from[0], from[1])) {
        return;
    }

    if (from[0] === to[0] && from[1] === to[1]) {
        routes.push(path);
        return;
    }

    const goRight = [from[0] + 1, from[1]];
    const goDown = [from[0], from[1] + 1];
    const goAcross = [from[0] + 1, from[1] + 1];

    this.getRoutes(goRight, to, routes, [...path, goRight]);
    this.getRoutes(goDown, to, routes, [...path, goDown]);
    this.getRoutes(goAcross, to, routes, [...path, goAcross]);
}

Board.prototype.disableSquare = function (x, y) {
    const index = (y * this.width) + x;

    this.disabledSquares[index] = true;
}

Board.prototype.isSquareDisabled = function (x, y) {
    const index = (y * this.width) + x;

    return this.disabledSquares[index] === true;
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
    console.time('crude shortest route');

    const board = new Board(10, 10);

    shortest = board.getShortestRoute([0, 0], [9, 9]);

    console.timeEnd('crude shortest route');
}
