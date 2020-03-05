class TreeNode {
    constructor(value) {
        this.value = value;
    }
}

class Tree {
    nodeList = [];

    constructor(root) {
        this.nodeList.push(root);
    }

    size() {
        return this.nodeList.length;
    }

    add(value) {
        const node = new TreeNode(value);

        this.nodeList.push(node);

        bubbleUp(this.nodeList, this.nodeList.length - 1);
    }

    delete() {
        swapValues(this.nodeList, 0, this.nodeList.length - 1);

        this.nodeList.pop();

        bubbleDown(this.nodeList, 0);
    }
}

function getParentIndex(index) {
    if (index < 1) {
        throw new Error('Invalid index: ' + index);
    }

    return Math.floor((index - 1) / 2);
}

function getChildIndices(index) {
    return [
        (index * 2) + 1,
        (index * 2) + 2,
    ];
}

function bubbleUp(nodeList, index) {
    if (index === 0) {
        return;
    }

    const pIndex = getParentIndex(index);
    const parent = nodeList[pIndex];
    const node = nodeList[index];

    if (parent.value > node.value) {
        swapValues(nodeList, index, pIndex);
    }

    bubbleUp(nodeList, pIndex);
}

function bubbleDown(nodeList, index) {
    const children = getChildIndices(index);
    const lIndex = children[0];
    const rIndex = children[1];
    const left = nodeList[lIndex];
    const right = nodeList[rIndex];

    if (!left) {
        return; // no children
    }

    const cIndex = (!right || right.value > left.value) ? lIndex : rIndex;
    const current = nodeList[index];
    const child = nodeList[cIndex];

    if (current.value > child.value) {
        swapValues(nodeList, index, cIndex);
        bubbleDown(nodeList, cIndex);
    }
}

function swapValues(nodeList, index1, index2) {
    const node1 = nodeList[index1];
    const node2 = nodeList[index2];
    const tmp = node1.value;

    node1.value = node2.value;
    node2.value = tmp;
}

function verifyMinHeap(nodeList) {
    nodeList.forEach((node, index) => {
        if (index === 0) {
            return;
        }

        const pIndex = getParentIndex(index);
        const parent = nodeList[pIndex];

        if (node.value < parent.value) {
            throw new Error('Min heap violation');
        }
    })
}

function drawTree(nodeList, index, container) {
    const root = nodeList[index];

    const treeEl = document.createElement('div');
    treeEl.className = 'tree';

    const childrenEl = document.createElement('div');
    childrenEl.className = 'children';

    const rootEl = document.createElement('div');
    rootEl.className = 'value';
    rootEl.innerHTML = root.value;

    treeEl.appendChild(rootEl);
    treeEl.appendChild(childrenEl);
    container.appendChild(treeEl);

    const children = getChildIndices(index);
    const lIndex = children[0];
    const rIndex = children[1];
    const left = nodeList[lIndex];
    const right = nodeList[rIndex];

    if(left) {
        drawTree(nodeList, lIndex, childrenEl);
    }

    if(right) {
        drawTree(nodeList, rIndex, childrenEl);
    }
}

test();

function test() {
    shouldCreateNode();
    shouldCreateTree();
    shouldHaveCorrectSize();
    shouldAddNode();
    shouldFollowRules();
    shouldDelete();
    shouldDrawTree();
}

function shouldCreateNode() {
    const expectedValue = 55;
    const node = new TreeNode(expectedValue);

    if (node.value !== expectedValue) {
        throw new Error('shouldCreateNode');
    }

    console.log('OK');
}

function shouldCreateTree() {
    const node = new TreeNode(44);
    const tree = new Tree(node);

    if (tree.nodeList[0] !== node) {
        throw new Error('shouldCreateTree');
    }

    verifyMinHeap(tree.nodeList);

    console.log('OK');
}

function shouldHaveCorrectSize() {
    const tree = new Tree(new TreeNode(33));

    if (tree.size() !== 1) {
        throw new Error('shouldHaveCorrectSize');
    }

    verifyMinHeap(tree.nodeList);

    console.log('OK');
}

function shouldAddNode() {
    const tree = new Tree(new TreeNode(77));
    tree.add(22);
    tree.add(100);

    if (tree.size() !== 3) {
        throw new Error('shouldAddNode');
    }

    verifyMinHeap(tree.nodeList);

    console.log('OK');
}

function shouldFollowRules() {
    const tree = new Tree(new TreeNode(75));
    tree.add(25);
    tree.add(44);
    tree.add(200);
    tree.add(200);
    tree.add(300);
    tree.add(2);

    verifyMinHeap(tree.nodeList);

    console.log('OK');
}

function shouldDrawTree() {
    const tree = new Tree(new TreeNode(75));
    tree.add(25);
    tree.add(44);
    tree.add(200);
    tree.add(200);
    tree.add(300);
    tree.add(2);
    tree.add(0);
    tree.add(257);

    drawTree(tree.nodeList, 0, document.body);

    verifyMinHeap(tree.nodeList);
}

function shouldDelete() {
    const tree = new Tree(new TreeNode(232));
    tree.add(256);
    tree.add(61);
    tree.add(128);
    tree.add(900);
    tree.add(3);
    tree.add(12);
    tree.add(56);
    tree.add(771);
    tree.add(600);
    tree.add(62);
    tree.add(63);
    tree.add(54);

    const initialSize = tree.size();

    verifyMinHeap(tree.nodeList);

    tree.delete();

    if (tree.size() !== initialSize - 1) {
        throw new Error('shouldDelete');
    }

    verifyMinHeap(tree.nodeList);

    console.log('OK');
}