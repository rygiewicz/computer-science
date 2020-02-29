function mergeSort(list) {
    if (list.length < 2) {
        return list;
    }

    const middle = Math.floor(list.length / 2);
    const listA = list.slice(0, middle);
    const listB = list.slice(middle);

    return merge(mergeSort(listA), mergeSort(listB));
}

function merge(listA, listB) {
    let a = 0;
    let b = 0;
    const result = [];

    while (a < listA.length || b < listB.length) {
        const elA = listA[a];
        const elB = listB[b];

        if (elA < elB || typeof elB === 'undefined') {
            result.push(elA);
            a++;
        } else {
            result.push(elB);
            b++;
        }
    }

    return result;
}

test();

function test() {
    shouldMerge();
    shouldSort();
}

function shouldMerge() {
    const listA = [19, 33, 27, 10, 200];
    const listB = [35, 19, 42, 44];
    const result = merge(listA, listB);

    if (result.length !== 9) {
        throw new Error('shouldMerge');
    }

    console.log('OK');
}

function shouldSort() {
    const list = [19, 33, 27, 10, 200, 35, 19, 42, 44];
    const result = mergeSort(list);

    result.reduce((prev, curr) => {
        if (prev > curr) {
            throw new Error('shouldSort');
        }

        return curr;
    })

    console.log('OK');
}
