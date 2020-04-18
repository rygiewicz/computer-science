function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function findNodeBFS(parents, value) {
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

  return findNodeBFS(children, value);
}

function compareBFS(parents1, parents2) {
  if (parents1.length !== parents2.length) {
    return false;
  }

  const children1 = [];
  const children2 = [];

  mismatch = parents1.find((node1, index) => {
    const node2 = parents2[index];

    if (node1.value !== node2.value) {
      return true;
    }

    node1.left && children1.push(node1.left);
    node2.left && children2.push(node2.left);
    node1.right && children1.push(node1.right);
    node2.right && children2.push(node2.right);
  });

  if (mismatch) {
    return false;
  }

  if (!children1.length && !children2.length) {
    return true;
  }

  return compareBFS(children1, children2);
}

function isSubtree(root1, root2) {
  const common = findNodeBFS([root1], root2.value);

  if (!common) {
    return false;
  }

  return compareBFS([common], [root2]);
}

test();

function test() {
  shouldFindNode();
  shouldDetermineIdenticalTrees();
  shouldDetermineDifferentTrees();
  shouldDetermineIsSubtree();
}

function shouldFindNode() {
  const root = new TreeNode(6);
  const a1 = new TreeNode(8);
  const a2 = new TreeNode(3);
  const b1 = new TreeNode(5);
  const b2 = new TreeNode(4);
  const b3 = new TreeNode(20);
  const b4 = new TreeNode(18);
  const c1 = new TreeNode(40);
  const c2 = new TreeNode(32);
  const c3 = new TreeNode(45);
  const c4 = new TreeNode(51);
  const c5 = new TreeNode(30);
  const c6 = new TreeNode(29);
  const c7 = new TreeNode(22);
  const c8 = new TreeNode(28);

  root.left = a1;
  root.right = a2;
  a1.left = b1;
  a1.right = b2;
  a2.left = b3;
  a2.right = b4;
  b1.left = c1;
  b1.right = c2;
  b2.left = c3;
  b2.right = c4;
  b3.left = c5;
  b3.right = c6;
  b4.left = c7;
  b4.right = c8;

  const result = findNodeBFS([root], 20);

  if (result !== b3) {
    throw new Error('shouldFindNode');
  }

  console.log('OK');
}


function shouldDetermineIdenticalTrees() {
  const t1root = new TreeNode(6);
  const t1a1 = new TreeNode(8);
  const t1a2 = new TreeNode(3);
  const t1b1 = new TreeNode(5);
  const t1b2 = new TreeNode(4);
  const t1b3 = new TreeNode(20);
  const t1b4 = new TreeNode(18);

  t1root.left = t1a1;
  t1root.right = t1a2;
  t1a1.left = t1b1;
  t1a1.right = t1b2;
  t1a2.left = t1b3;
  t1a2.right = t1b4;

  const t2root = new TreeNode(6);
  const t2a1 = new TreeNode(8);
  const t2a2 = new TreeNode(3);
  const t2b1 = new TreeNode(5);
  const t2b2 = new TreeNode(4);
  const t2b3 = new TreeNode(20);
  const t2b4 = new TreeNode(18);

  t2root.left = t2a1;
  t2root.right = t2a2;
  t2a1.left = t2b1;
  t2a1.right = t2b2;
  t2a2.left = t2b3;
  t2a2.right = t2b4;

  const result = compareBFS([t1root], [t2root]);

  if (result !== true) {
    throw new Error('shouldDetermineIdenticalTrees');
  }

  console.log('OK');
}

function shouldDetermineDifferentTrees() {
  const t1root = new TreeNode(6);
  const t1a1 = new TreeNode(8);
  const t1a2 = new TreeNode(3);

  t1root.left = t1a1;
  t1root.right = t1a2;

  const t2root = new TreeNode(6);
  const t2a1 = new TreeNode(8);
  const t2a2 = new TreeNode(4);

  t2root.left = t2a1;
  t2root.right = t2a2;

  const result = compareBFS([t1root], [t2root]);

  if (result !== false) {
    throw new Error('shouldDetermineDifferentTrees');
  }

  console.log('OK');
}


function shouldDetermineIsSubtree() {
  const t1root = new TreeNode(6);
  const t1a1 = new TreeNode(8);
  const t1a2 = new TreeNode(3);
  const t1b1 = new TreeNode(5);
  const t1b2 = new TreeNode(4);
  const t1b3 = new TreeNode(20);
  const t1b4 = new TreeNode(18);

  t1root.left = t1a1;
  t1root.right = t1a2;
  t1a1.left = t1b1;
  t1a1.right = t1b2;
  t1a2.left = t1b3;
  t1a2.right = t1b4;

  const t2root = new TreeNode(8);
  const t2a1 = new TreeNode(5);
  const t2a2 = new TreeNode(4);

  t2root.left = t2a1;
  t2root.right = t2a2;

  const result = isSubtree(t1root, t2root);

  if (result !== true) {
    throw new Error('shouldDetermineIsSubtree');
  }

  console.log('OK');
}