function quickSort(list, left, right) {
    if (left >= right) {
        return list;
    }

    const cursor = partition(list, left, right);

    quickSort(list, left, cursor - 1);
    quickSort(list, cursor + 1, right);

    return list;
}

function partition(list, left, right) {
    const pivot = right;
    let cursor = left - 1;

    for (let i = left; i <= pivot; i++) {
        if (list[i] <= list[pivot]) {
            cursor++;
            swap(list, cursor, i);
        }
    }

    return cursor;
}

function swap(list, indexA, indexB) {
    const a = list[indexA];

    list[indexA] = list[indexB];
    list[indexB] = a;

    return list;
}

test();

function test() {
    shouldSwap();
    shouldPivot();
    shouldSort();
    shouldSortRandom();
}

function shouldSwap() {
    const list = [1, 2, 3, 4];
    const result = swap(list, 0, 2);

    if (result[0] !== 3 || result[2] !== 1) {
        throw new Error('shouldSwap');
    }

    console.log('OK');
}

function shouldPivot() {
    const list = [50, 80, 40, 30, 70];
    const cursor = partition(list, 0, list.length - 1);

    if (cursor !== 3) {
        throw new Error('shouldPivot1');
    }

    if (list[0] !== 50 || list[1] !== 40 || list[2] !== 30 || list[3] !== 70 || list[4] !== 80) {
        throw new Error('shouldPivot2');
    }

    console.log('OK');
}

function shouldSort() {
    const list = [50, 80, 40, 30, 70, 90, 10, 20, 200, 60, 500, 300];
    const result = quickSort(list, 0, list.length - 1);

    result.reduce((prev, curr) => {
        if (prev > curr) {
            throw new Error('shouldSort');
        }

        return curr;
    })

    console.log('OK');
}

function shouldSortRandom() {
    const list = [];

    for (let i = 0; i < 100000; i++) {
        list.push(Math.random());
    }

    const result = quickSort(list, 0, list.length - 1);

    result.reduce((prev, curr) => {
        if (prev > curr) {
            throw new Error('shouldSort');
        }

        return curr;
    })

    console.log('OK');
}
