function TreeNode(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

function BinaryTree() {
  this.root = null;
}

function isBST(parent, limitOk = () => true) {
  if (parent.left) {
    if (parent.left.value >= parent.value) {
      return false;
    }

    if (!limitOk(parent.left)) {
      return false;
    }

    if (!isBST(parent.left, (descendant) => descendant.value < parent.value)) {
      return false;
    }
  }

  if (parent.right) {
    if (parent.right.value <= parent.value) {
      return false;
    }

    if (!limitOk(parent.right)) {
      return false;
    }

    if (!isBST(parent.right, (descendant) => descendant.value > parent.value)) {
      return false;
    }
  }

  return true;
}

test();

function test() {
  shouldConfirmBST();
  shouldDenyBST();
}

function shouldConfirmBST() {
  const tree = new BinaryTree();

  tree.root = new TreeNode(8);
  tree.root.left = new TreeNode(4);
  tree.root.right = new TreeNode(10);
  tree.root.left.left = new TreeNode(2);
  tree.root.left.right = new TreeNode(6);
  tree.root.right.right = new TreeNode(20);

  const result = isBST(tree.root);

  if (!result) {
    throw new Error('shouldConfirmBST');
  }

  console.log('OK');
}

function shouldDenyBST() {
  const tree = new BinaryTree();

  tree.root = new TreeNode(8);
  tree.root.left = new TreeNode(4);
  tree.root.right = new TreeNode(10);
  tree.root.left.left = new TreeNode(2);
  tree.root.left.right = new TreeNode(12);
  tree.root.right.right = new TreeNode(20);

  const result = isBST(tree.root);

  if (result) {
    throw new Error('shouldDenyBST');
  }

  console.log('OK');
}
