class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let curr = this.root;
    while (curr !== null) {
      if (val < curr.val) {
        if (!curr.left) {
          curr.left = newNode;
          return this;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          return this;
        }
        curr = curr.right;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, subTree=this.root) {
  
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < subTree.val) {
      if (!subTree.left) {
        subTree.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, subTree.left);
    } else {
      if (!subTree.right) {
        subTree.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, subTree.right);
    }

  }

  

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    const { root } = this;

    if (!root) return;

    let curr = root;
    while (curr !== null) {
      if (val === curr.val) return curr;
      else if (val < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, curr=this.root) {
    if (!this.root) return;

    if (curr.val === val) return curr;
    if (curr.val > val) {
      if (!curr.left) return;
      return this.findRecursively(val, curr.left);
    }
    if (curr.val <= val) {
      if (!curr.right) return;
      return this.findRecursively(val, curr.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const visited = [];

    const preOrder = node => {
      if (!node) return;

      visited.push(node.val);
      preOrder(node.left);
      preOrder(node.right);
    }
    preOrder(this.root);

    return visited;
  }

  

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visited = [];

    const inOrder = node => {
      if (!node) return;
     
      inOrder(node.left);
      visited.push(node.val);
      inOrder(node.right);
    }
    inOrder(this.root);

    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visited = [];

    const postOrder = node => {
      if (!node) return;
     
      postOrder(node.left);
      postOrder(node.right);
      visited.push(node.val);
    }

    postOrder(this.root);

    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visited = [];
    const unvisited = [this.root];
    while (unvisited.length) {
      const node = unvisited.shift();
      visited.push(node.val);
      if (node.left) unvisited.push(node.left);
      if (node.right) unvisited.push(node.right);
    }

    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
