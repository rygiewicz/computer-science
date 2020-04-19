function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.size = 1;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.size = function () {
  return this.root ? this.root.size : 0;
}

function insert(node, root) {
  if (node.value === root.value) {
    return; // ignore duplicates
  }

  if (node.value < root.value) {
    return insertLeft(node, root);
  }

  return insertRight(node, root);
}

function insertLeft(node, root) {
  root.size += 1;

  if (root.left) {
    return insert(node, root.left);
  }

  root.left = node;
}

function insertRight(node, root) {
  root.size += 1;

  if (root.right) {
    return insert(node, root.right);
  }

  root.right = node;
}

BinarySearchTree.prototype.insert = function (node) {
  if (!this.root) {
    this.root = node;

    return;
  }

  return insert(node, this.root);
};

function find(value, root) {
  if (!root) {
    return;
  }

  if (root.value === value) {
    return root;
  }

  if (value < root.value) {
    return find(value, root.left);
  }

  return find(value, root.right);
}

BinarySearchTree.prototype.find = function (value) {
  return find(value, this.root);
}

function deleteNode(value, parent) {
  if (value < parent.value) {
    return deleteDescendant(value, 'left', parent);
  }

  return deleteDescendant(value, 'right', parent);
}

function deleteDescendant(value, direction, parent) {
  const child = parent[direction];

  if (!child) {
    return false;
  }

  let success = false;

  if (value === child.value) {
    deleteChild(child, direction, parent);

    success = true;
  } else {
    success = deleteNode(value, child);
  }

  if (success) {
    parent.size -= 1;
  }

  return success;
}

function deleteChild(child, direction, parent) {
  if (!child.left && !child.right) {
    parent[direction] = null;

    return;
  }

  if (child.left && !child.right) {
    parent[direction] = child.left;

    return;
  }

  if (!child.left && child.right) {
    parent[direction] = child.right;

    return;
  }

  let minNode = child.right;

  while (minNode.left) {
    minNode = minNode.left;
  }

  child.value = minNode.value;

  deleteNode(minNode.value, child.right);
}

BinarySearchTree.prototype.delete = function (value) {
  if (this.root.value === value) {
    deleteChild(this.root, 'root', this);

    return;
  }

  deleteNode(value, this.root);
}

BinarySearchTree.prototype.getRandomNode = function () {
  const treeSize = this.size();
  const index = Math.round((treeSize - 1) * Math.random());

  return getNodeAtIndex(index, this.root);
}

function getNodeAtIndex(index, root) {
  if (index === 0) {
    return root;
  }

  if (index >= root.size) {
    throw new Error('index outside tree');
  }

  if (!root.left && !root.right) {
    return null;
  }

  const leftSize = (root.left && root.left.size) || 0;

  if (index === leftSize) {
    return root;
  }

  if (index < leftSize) {
    return getNodeAtIndex(index, root.left);
  }

  return getNodeAtIndex(index - leftSize - 1, root.right);
}

test();

function test() {
  shouldInsertNode();
  shouldFindNode();
  shouldDeleteNode();
  shouldDeleteNode2();
  shouldHaveCorrectSize();
  shouldHaveCorrectSize2();
  shouldDeleteRoot();
  shouldGetRandomNode();
  shouldGetNodeAtIndex();
}

function shouldInsertNode() {
  const tree = new BinarySearchTree();

  tree.insert(new TreeNode(20));
  tree.insert(new TreeNode(8));
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(33));

  if (tree.root.value !== 20 || tree.root.left.value !== 8 || tree.root.right.value !== 29 ||
    tree.root.left.right.value !== 10 || tree.root.right.right.value !== 33) {
    throw new Error('shouldInsertNode');
  }

  console.log('OK');
}

function shouldFindNode() {
  const tree = new BinarySearchTree();

  const node = new TreeNode(24);

  tree.insert(new TreeNode(20));
  tree.insert(new TreeNode(8));
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(33));
  tree.insert(node);

  const result = tree.find(24);

  if (result !== node) {
    throw new Error('shouldFindNode');
  }

  console.log('OK');
}

function shouldDeleteNode() {
  const tree = new BinarySearchTree();

  tree.insert(new TreeNode(20));
  tree.insert(new TreeNode(8));
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(33));

  tree.delete(8);

  if (tree.root.left.value !== 10) {
    throw new Error('shouldDeleteNode');
  }

  console.log('OK');
}

function shouldDeleteNode2() {
  const tree = new BinarySearchTree();

  tree.insert(new TreeNode(20));
  tree.insert(new TreeNode(8));
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(12));
  tree.insert(new TreeNode(33));
  tree.insert(new TreeNode(7));
  tree.insert(new TreeNode(3));
  tree.insert(new TreeNode(16));
  tree.insert(new TreeNode(9));
  tree.insert(new TreeNode(10));

  tree.delete(8);

  if (tree.root.left.value !== 9) {
    throw new Error('shouldDeleteNode2');
  }

  console.log('OK');
}

function shouldDeleteRoot() {
  const tree = new BinarySearchTree();

  tree.insert(new TreeNode(20));
  tree.insert(new TreeNode(8));
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(12));
  tree.insert(new TreeNode(33));
  tree.insert(new TreeNode(7));
  tree.insert(new TreeNode(3));
  tree.insert(new TreeNode(16));
  tree.insert(new TreeNode(9));
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(24));
  tree.insert(new TreeNode(25));

  tree.delete(20);

  if (tree.root.value !== 24) {
    throw new Error('shouldDeleteRoot');
  }

  console.log('OK');
}

function shouldHaveCorrectSize() {
  const tree = new BinarySearchTree();

  tree.insert(new TreeNode(20));
  tree.insert(new TreeNode(8));
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(33));

  const result = tree.size();

  if (result !== 5) {
    throw new Error('shouldHaveCorrectSize');
  }

  console.log('OK');
}

function shouldHaveCorrectSize2() {
  const tree = new BinarySearchTree();

  tree.insert(new TreeNode(20));
  tree.insert(new TreeNode(8));
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(33));

  tree.delete(10);

  const result = tree.size();

  if (result !== 4) {
    throw new Error('shouldHaveCorrectSize2');
  }

  console.log('OK');
}

function shouldGetRandomNode() {
  const tree = new BinarySearchTree();

  tree.insert(new TreeNode(20));
  tree.insert(new TreeNode(8));
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(12));
  tree.insert(new TreeNode(33));
  tree.insert(new TreeNode(7));
  tree.insert(new TreeNode(3));
  tree.insert(new TreeNode(16));
  tree.insert(new TreeNode(9));
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(24));
  tree.insert(new TreeNode(25));

  const result = tree.getRandomNode();

  if (!result || typeof result.value !== 'number') {
    throw new Error('shouldGetRandomNode');
  }

  console.log('OK');
}

function shouldGetNodeAtIndex() {
  const tree = new BinarySearchTree();

  const expected1 = new TreeNode(8);
  const expected2 = new TreeNode(25);

  tree.insert(new TreeNode(20));
  tree.insert(expected1);
  tree.insert(new TreeNode(29));
  tree.insert(new TreeNode(12));
  tree.insert(new TreeNode(33));
  tree.insert(new TreeNode(7));
  tree.insert(new TreeNode(3));
  tree.insert(new TreeNode(16));
  tree.insert(new TreeNode(9));
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(24));
  tree.insert(expected2);

  const result1 = getNodeAtIndex(2, tree.root);
  const result2 = getNodeAtIndex(9, tree.root);

  if (result1 !== expected1 || result2 !== expected2) {
    throw new Error('shouldGetNodeAtIndex');
  }

  console.log('OK');
}
