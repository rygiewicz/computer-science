class TreeNode {
    left = null;
    right = null;

    constructor(value) {
        this.value = value;
    }
}

class Tree {
    constructor(root) {
        this.root = root;
    }

    size() {
        return getTreeSize(this.root);
    }

    add(value) {
        const node = new TreeNode(value);
        const vacantNode = getVacantNode(this.root);

        if (!vacantNode.left) {
            vacantNode.left = node;
        } else {
            vacantNode.right = node;
        }

        bubbleUp(this.root, node);

        return node;
    }

    delete() {
        const lastParent = getLastParentNode(this.root);

        if (lastParent.right) {
            swapValues(this.root, lastParent.right);
            lastParent.right = null;
        } else {
            swapValues(this.root, lastParent.left);
            lastParent.left = null;
        }

        bubbleDown(this.root);
    }

    getLastParentNode() {
        return getLastParentNode(this.root);
    }
}

function bubbleUp(root, node) {
    const parent = getParentNode(root, node);

    if (!parent) {
        return;
    }

    if (parent.value > node.value) {
        swapValues(parent, node);
    }

    bubbleUp(root, parent);
}

function bubbleDown(parent) {
    if (!parent.left) {
        return;
    }

    const child = (!parent.right || parent.right.value > parent.left.value) ? parent.left : parent.right;

    if (parent.value > child.value) {
        swapValues(parent, child);
        bubbleDown(child);
    }
}

function swapValues(node1, node2) {
    const tmp = node1.value;

    node1.value = node2.value;
    node2.value = tmp;
}

function getParentNode(root, node) {
    if (!root) {
        return null;
    }

    if (root.left === node || root.right === node) {
        return root;
    }

    return getParentNode(root.left, node) || getParentNode(root.right, node)
}

function getVacantNode(root) {
    if (!root.left || !root.right) {
        return root;
    }

    const leftFull = isFullTree(root.left);
    const leftSize = getTreeSize(root.left);
    const rightSize = getTreeSize(root.right);

    if (leftFull && rightSize < leftSize) {
        return getVacantNode(root.right);
    }

    return getVacantNode(root.left);
}

function isFullTree(root) {
    const size = getTreeSize(root);
    const depth = Math.log2(size + 1);

    return depth % 1 === 0;
}

function getLastParentNode(root) {
    const leftFull = isFullTree(root.left);
    const rightFull = isFullTree(root.right);
    const leftSize = getTreeSize(root.left);
    const rightSize = getTreeSize(root.right);

    if (leftSize === 0) {
        throw new Error('not a parent')
    }

    if (leftSize === 1) {
        return root;
    }

    if (rightSize === 1) {
        return getLastParentNode(root.left);
    }

    if (leftFull && !rightFull) {
        return getLastParentNode(root.right);
    }

    if (leftSize == rightSize) {
        return getLastParentNode(root.right);
    }

    return getLastParentNode(root.left);
}

function getTreeSize(root) {
    if (!root) {
        return 0;
    }

    let size = 1;

    if (root.left) {
        size += getTreeSize(root.left);
    }

    if (root.right) {
        size += getTreeSize(root.right);
    }

    return size;
}

function verifyMinHeap(node) {
    if (node.left) {
        if (node.value > node.left.value) {
            throw new Error('min heap violation');
        }

        verifyMinHeap(node.left);
    }

    if (node.right) {
        if (node.value > node.right.value) {
            throw new Error('min heap violation');
        }

        verifyMinHeap(node.right);
    }
}

function drawTree(root, container) {
    const treeEl = document.createElement('div');
    treeEl.className = 'tree';

    const childrenEl = document.createElement('div');
    childrenEl.className = 'children';

    const rootEl = document.createElement('div');
    rootEl.className = 'value';
    rootEl.innerHTML = root.value;

    treeEl.appendChild(rootEl);
    treeEl.appendChild(childrenEl);
    container.appendChild(treeEl)

    if (root.left) {
        drawTree(root.left, childrenEl);
    }

    if (root.right) {
        drawTree(root.right, childrenEl);
    }
}

test();

function test() {
    shouldCreateNode();
    shouldCreateTree();
    shouldHaveCorrectSize();
    shouldAddNode();
    shouldFollowRules();
    shouldGetLastParentNode();
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

    if (tree.root !== node) {
        throw new Error('shouldCreateTree');
    }

    verifyMinHeap(tree.root);

    console.log('OK');
}

function shouldHaveCorrectSize() {
    const tree = new Tree(new TreeNode(33));

    if (tree.size() !== 1) {
        throw new Error('shouldHaveCorrectSize');
    }

    verifyMinHeap(tree.root);

    console.log('OK');
}

function shouldAddNode() {
    const tree = new Tree(new TreeNode(77));
    tree.add(22);
    tree.add(100);

    if (tree.size() !== 3) {
        throw new Error('shouldAddNode');
    }

    verifyMinHeap(tree.root);

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

    verifyMinHeap(tree.root);

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

    drawTree(tree.root, document.body);

    verifyMinHeap(tree.root);
}

function shouldGetLastParentNode() {
    const tree = new Tree(new TreeNode(77));
    tree.add(240);
    const lastParent = tree.add(125);
    tree.add(144);
    tree.add(500);
    tree.add(320);

    verifyMinHeap(tree.root);

    const result = tree.getLastParentNode();

    if (result !== lastParent) {
        throw new Error('shouldGetLastParentNode');
    }

    console.log('OK');
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

    verifyMinHeap(tree.root);

    tree.delete();

    drawTree(tree.root, document.body);

    if (tree.size() !== initialSize - 1) {
        throw new Error('shouldDelete');
    }

    verifyMinHeap(tree.root);

    console.log('OK');
}