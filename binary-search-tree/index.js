function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinarySearchTree() {
  this.dfs = true;
  this.root = null;
}

BinarySearchTree.prototype.add = function (value) {
  const node = new TreeNode(value);

  if (!this.root) {
    this.root = node;
    return;
  }

  addTo(this.root, node);
}

function addTo(parent, node) {
  if (node.value === parent.value) {
    return; // duplicates in binary search tree are not allowed
  }

  if (node.value > parent.value) {
    if (parent.right) {
      addTo(parent.right, node);
    } else {
      parent.right = node;
    }
  } else {
    if (parent.left) {
      addTo(parent.left, node);
    } else {
      parent.left = node;
    }
  }
}

BinarySearchTree.prototype.find = function (value) {
  if (this.dfs) {
    return findDFS(this.root, value);
  }

  return findBFS([this.root], value);
}

function findDFS(root, value) {
  let current = root;

  while (current) {
    if (current.value === value) {
      return current;
    }

    if (value > current.value) {
      current = current.right;
    } else {
      current = current.left;
    }
  }
}

function findBFS(parents, value) {
  const children = [];

  const found = parents.find((node) => {
    if (node.value === value) {
      return true;
    }

    node.left && children.push(node.left);
    node.right && children.push(node.right);
  });

  if (found) {
    return found;
  }

  if (!children.length) {
    return;
  }

  return findBFS(children, value);
}

test();

function test() {
  shouldAdd();
  shouldIgnoreDuplicates();
  shouldFind();
  shouldFind2();
}

function shouldAdd() {
  const bst = new BinarySearchTree();

  bst.add(20);
  bst.add(16);
  bst.add(22);
  bst.add(18);
  bst.add(14);

  if (bst.root.value !== 20 || bst.root.left.value !== 16 || bst.root.right.value !== 22 ||
    bst.root.left.right.value !== 18 || bst.root.left.left.value !== 14) {
    throw new Error('shouldAdd');
  }

  console.log('OK');
}

function shouldIgnoreDuplicates() {
  const bst = new BinarySearchTree();

  bst.add(20);
  bst.add(16);
  bst.add(20);
  bst.add(16);

  if (bst.root.value !== 20 || bst.root.left.value !== 16 || bst.root.right ||
    bst.root.left.right || bst.root.left.left) {
    throw new Error('shouldIgnoreDuplicates');
  }

  console.log('OK');
}

function shouldFind() {
  const bst = new BinarySearchTree();

  bst.add(20);
  bst.add(16);
  bst.add(22);
  bst.add(18);
  bst.add(14);

  const result = bst.find(18);

  if (!result || result.value !== 18) {
    throw new Error('shouldFind');
  }

  console.log('OK');
}

function shouldFind2() {
  const bst = new BinarySearchTree();
  bst.dfs = false;

  bst.add(20);
  bst.add(16);
  bst.add(22);
  bst.add(18);
  bst.add(14);

  const result = bst.find(18);

  if (!result || result.value !== 18) {
    throw new Error('shouldFind2');
  }

  console.log('OK');
}
