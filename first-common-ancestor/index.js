const RIGHT = 'right';
const LEFT = 'left';

function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function getPath(root, node) {
  if (root === node) {
    return [];
  }

  if (root.left === node) {
    return [LEFT];
  }

  if (root.right === node) {
    return [RIGHT];
  }

  if (root.left) {
    const leftPath = getPath(root.left, node);

    if (leftPath) {
      return [LEFT, ...leftPath];
    }
  }

  if (root.right) {
    const rightPath = getPath(root.right, node);

    if (rightPath) {
      return [RIGHT, ...rightPath];
    }
  }
}

function getIntersection(root, path1, path2) {
  const size = path1 > path2 ? path2.length : path1.length;

  let current = root;

  for (let i = 0; i < size; i++) {
    if (path1[i] !== path2[i]) {
      return current;
    }

    const direction = path1[i];

    if (direction === LEFT) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
}

function getFirstCommonAncestor(root, node1, node2) {
  const path1 = getPath(root, node1);
  const path2 = getPath(root, node2);
  const ancestor = getIntersection(root, path1, path2);

  return ancestor;
}

test();

function test() {
  shouldFindCorrectAncestor();
}

function shouldFindCorrectAncestor() {
  const root = new TreeNode(8);
  const a1 = new TreeNode(4);
  const a2 = new TreeNode(10);
  const b1 = new TreeNode(2);
  const b2 = new TreeNode(12);
  const b3 = new TreeNode(20);
  const c1 = new TreeNode(3);
  const c2 = new TreeNode(14);
  const c3 = new TreeNode(18);
  const d1 = new TreeNode(30);

  c3.right = d1;
  b1.left = c1;
  b2.left = c2;
  b2.right = c3;
  a1.left = b1;
  a1.right = b2;
  a2.right = b3;
  root.left = a1;
  root.right = a2;

  const result = getFirstCommonAncestor(root, c1, d1);

  if (result !== a1) {
    throw new Error('shouldFindCorrectAncestor');
  }

  console.log('OK');
}
