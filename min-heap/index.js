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

        this.fixOrder(node);
    }

    fixOrder(node) {
        const parent = getParentNode(this.root, node);

        if (!parent) {
            return;
        }

        if (parent.value > node.value) {
            const pv = parent.value;

            parent.value = node.value;
            node.value = pv;
        }

        this.fixOrder(parent);
    }
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

function getVacantNode(node) {
    if (!node.left || !node.right) {
        return node;
    }

    return getVacantNode(node.left) || getVacantNode(node.right)
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
    tree.add(100);

    if (tree.size() !== 3) {
        throw new Error('shouldAddNode');
    }

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

    drawTree(tree.root, document.body);
}