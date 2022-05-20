/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {
    return this._sumValsHelper(this.root);
  }

  _sumValsHelper(node) {
    if (!node) return 0;

    const numChildren = node.children.length;

    let childSum = 0;
    for (let i = 0; i < numChildren; i++) {
      const child = node.children[i];
      childSum += this._sumValsHelper(child);
    }
    return node.val + childSum;
  }

  _countNodesHelper(node, cond, lowerBound) {
    if (!node) return 0;

    const numChildren = node.children.length;

    let count = 0;
    for (let i = 0; i < numChildren; i++) {
      const child = node.children[i];
      count += this._countNodesHelper(child, cond, lowerBound);
    }
    if (cond === 'even' && node.val % 2 === 0) count++;
    if (cond === 'lowerBound' && node.val > lowerBound) count++;
    return count; 
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {
    return this._countNodesHelper(this.root, 'even');
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {
    return this._countNodesHelper(this.root, 'lowerBound', lowerBound);
  }
}

module.exports = { Tree, TreeNode };
