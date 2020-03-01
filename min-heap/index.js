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
        const vacantNode = findVacantTreeNode(this.root);

        if (!vacantNode.left) {
            vacantNode.left = node;
        } else {
            vacantNode.right = node;
        }
    }
}

function findVacantTreeNode(node) {
    if (!node.left || !node.right) {
        return node;
    }

    return findVacantTreeNode(node.left) || findVacantTreeNode(node.right)
}

function getTreeSize(node) {
    let size = 1;

    if (node.left) {
        size += getTreeSize(node.left);
    }

    if (node.right) {
        size += getTreeSize(node.right);
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

test();

function test() {
    shouldCreateNode();
    shouldCreateTree();
    shouldHaveCorrectSize();
    shouldAddNode();
    shouldFollowRules();
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

    console.log('OK');
}

function shouldHaveCorrectSize() {
    const tree = new Tree(new TreeNode(33));

    if (tree.size() !== 1) {
        throw new Error('shouldHaveCorrectSize');
    }

    console.log('OK');
}

function shouldAddNode() {
    const tree = new Tree(new TreeNode(77));
    tree.add(22);

    if (tree.size() !== 2) {
        throw new Error('shouldAddNode');
    }

    console.log('OK');
}

function shouldFollowRules() {
    const tree = new Tree(new TreeNode(75));
    tree.add(25);

    verifyMinHeap(tree.root);

    console.log('OK');
}
