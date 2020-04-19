const LEFT = 'left';
const RIGHT = 'right';

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

function findParent(value, parent) {
  if (value < parent.value) {
    if (!parent.left) {
      return;
    }

    if (value === parent.left.value) {
      return [parent, LEFT, parent.left];
    }

    return findParent(value, parent.left);
  }

  if (!parent.right) {
    return;
  }

  if (value === parent.right.value) {
    return [parent, RIGHT, parent.right];
  }

  return findParent(value, parent.right);
}

BinarySearchTree.prototype.find = function (value) {
  return find(value, this.root);
}

BinarySearchTree.prototype.findParentOf = function (value) {
  return findParent(value, this.root);
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
    deleteChild(child, parent);

    success = true;
  } else {
    success = deleteNode(value, child);
  }

  if (success) {
    parent.size -= 1;
  }

  return success;
}

function deleteChild(child, parent) {
  const dir = child === parent.left ? LEFT : RIGHT;

  if (!child.left && !child.right) {
    if (dir === LEFT) {
      parent.left = null;
    }

    parent.right = null;

    return;
  }

  if (child.left && !child.right) {
    if (dir === LEFT) {
      parent.left = child.left;
    }

    parent.right = child.left;

    return;
  }

  if (!child.left && child.right) {
    if (dir === LEFT) {
      parent.left = child.right;
    }

    parent.right = child.right;

    return;
  }

  let minParent;
  let minNode = child.right;

  while (minNode.left) {
    minParent = minNode;
    minNode = minNode.left;
  }

  if (!minParent) {
    return;
  }

  minParent.left = null;

  child.value = minNode.value;
}

BinarySearchTree.prototype.delete = function (value) {
  deleteNode(value, this.root);
}

test();

function test() {
  shouldInsertNode();
  shouldFindNode();
  shouldDeleteNode();
  shouldDeleteNode2();
  shouldHaveCorrectSize();
  shouldHaveCorrectSize2();
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
  tree.insert(new TreeNode(10));
  tree.insert(new TreeNode(33));
  tree.insert(new TreeNode(7));
  tree.insert(new TreeNode(3));
  tree.insert(new TreeNode(16));
  tree.insert(new TreeNode(9));

  tree.delete(8);

  if (tree.root.left.value !== 9) {
    throw new Error('shouldDeleteNode2');
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
