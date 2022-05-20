/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    return this._depthHelper(this.root, true);
  }

  _depthHelper(node, findMin) {
    if (!node) return 0;
    
    // leaf node
    if (!node.left && !node.right) return 1;

    let leftTree = this._depthHelper(node.left, findMin);
    let rightTree = this._depthHelper(node.right, findMin);

    if (findMin) return Math.min(leftTree, rightTree) + 1;
    else return Math.max(leftTree, rightTree) + 1; // find max depth
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    return this._depthHelper(this.root, false);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let sum = 0;
    const maxSumHelper = node => {
      if (!node) return 0;
  
      let leftPath = Math.max(0, maxSumHelper(node.left));
      let rightPath = Math.max(0, maxSumHelper(node.right));
      
      sum = Math.max(leftPath + rightPath + node.val, sum);
      
      return Math.max(leftPath, rightPath, 0) + node.val;
    }
    maxSumHelper(this.root);
    return sum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    const nextLarger = this._nextLargerHelper(this.root, lowerBound);
    return nextLarger === Number.MAX_VALUE ? null : nextLarger;
  }

  _nextLargerHelper(node, lowerBound) {
    if (!node) return null;

    let nodeVal = node.val > lowerBound ? node.val : Number.MAX_VALUE;
    if (!node.left && !node.right) return nodeVal;

    let leftNodeVal = this._nextLargerHelper(node.left, lowerBound);
    let rightNodeVal = this._nextLargerHelper(node.right, lowerBound);

    return Math.min(leftNodeVal, rightNodeVal, nodeVal);
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {

  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {

  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
