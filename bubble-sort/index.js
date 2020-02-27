function sort(list) {
    if (list.length < 2) {
        return list;
    }

    let didSwap = true;
    let completeNo = 0;

    while (didSwap) {
        didSwap = false;

        for (let i = 0; i < (list.length - 1 - completeNo); i++) {
            if (list[i] > list[i + 1]) {
                swap(list, i, i + 1);

                didSwap = true;
            }
        }

        completeNo++;
    }

    return list;
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
    shouldSort();
    shouldSortOne();
}

function shouldSwap() {
    const list = [1, 2, 3, 4];
    const result = swap(list, 0, 2);

    if (result[0] !== 3 || result[2] !== 1) {
        throw new Error('shouldSwap');
    }

    console.log('OK');
}

function shouldSort() {
    const list = [4, 3, 2, 1, 5];
    const result = sort(list);

    if (list.length !== 5 || result[0] !== 1 || result[1] !== 2 || result[2] !== 3 || result[3] !== 4 || result[4] !== 5) {
        throw new Error('shouldSort');
    }

    console.log('OK');
}

function shouldSortOne() {
    const list = [4];
    const result = sort(list);

    if (list.length !== 1 || result[0] !== 4) {
        throw new Error('shouldSortOne');
    }

    console.log('OK');
}


