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
            this.root.value = lastParent.right.value;
            lastParent.right = null;
        } else {
            this.root.value = lastParent.left.value;
            lastParent.left = null;
        }

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
        const pv = parent.value;

        parent.value = node.value;
        node.value = pv;
    }

    bubbleUp(root, parent);
}

function bubbleDown(node) {
    if (!node.left || !node.right) {
        return;
    }

    const nodeValue = node.value;

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

    const leftFull = isFull(root.left);
    const leftSize = getTreeSize(root.left);
    const rightSize = getTreeSize(root.right);

    if (leftFull && rightSize < leftSize) {
        return getVacantNode(root.right);
    }

    return getVacantNode(root.left);
}

function isFull(root) {
    const size = getTreeSize(root);
    const depth = Math.log2(size + 1);

    return depth % 1 === 0;
}

function getLastParentNode(root) {
    if (!hasChildren(root)) {
        return null;
    }

    if (root.right && hasChildren(root.right)) {
        return getLastParentNode(root.right);
    }

    if (hasChildren(root.left)) {
        return getLastParentNode(root.left);
    }

    return root;
}

function hasChildren(node) {
    return !!node.right || !!node.left;
}

function getTreeSize(root) {
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
    //shouldDelete();
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
    tree.add(128);
    tree.add(900);
    tree.add(3);
    tree.add(12);
    tree.add(56);
    tree.add(771);
    tree.add(600);

    verifyMinHeap(tree.root);

    tree.delete();

    if (tree.size() !== 8) {
        throw new Error('shouldAddNode');
    }

    verifyMinHeap(tree.root);

    console.log('OK');
}