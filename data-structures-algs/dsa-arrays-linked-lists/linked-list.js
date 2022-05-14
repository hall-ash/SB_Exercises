/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** _get(idx): get node at idx */

  _get(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error('Invalid index')
    }

    let curNode = this.head;
    for (let i = 0; i < idx && curNode !== null; ++i) {
      curNode = curNode.next;
    }

    return curNode;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    }
    else { // add new node to end
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) { // empty list
      this.head = newNode;
      this.tail = newNode;
    }
    else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {

    if (this.length === 0) {
      throw new Error('Empty list');
    }

    const tailVal = this.tail.val;
    
    if (this.length === 1) {
      this.tail = null;
      this.head = null;
      this.length--;

      return tailVal;
    }

    // get penultimate node
    const penultNode = this._get(this.length - 2);

    // detach last node
    penultNode.next = null;

    // change penultNode to tail
    this.tail = penultNode;

    this.length--;

    return tailVal;
  }

  /** shift(): return & remove first item. */

  shift() {

    if (this.length === 0) {
      throw new Error('Empty list')
    }

    const oldHead = this.head;

    // reassign head node
    this.head = oldHead.next;

    // detach old head from list
    oldHead.next = null;

    if (this.length === 1) this.tail = this.head;

    this.length--;

    return oldHead.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

    return this._get(idx).val;

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {

    const nodeToChange = this._get(idx);
    nodeToChange.val = val;

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

    const newNode = new Node(val);
    if (idx > this.length) throw new Error('Invalid index');

    // insert at head
    if (idx === 0) {
      return this.unshift(val);
    } else {
      const prevNode = this._get(idx - 1);

      // insert new node into list
      const nextNode = prevNode.next;
      prevNode.next = newNode;
      newNode.next = nextNode;

      if (this.length === idx) this.tail = newNode;
    }

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx. */

  removeAt(idx) {
    if (!this.head) throw new Error('Empty list');
    if (idx >= this.length) throw new Error('Invalid index');

    // remove at head
    if (idx === 0) {
      return this.shift();
    }
    const prevNode = this._get(idx - 1);

    const nodeToDelete = prevNode.next;
    prevNode.next = nodeToDelete.next;
    nodeToDelete.next = null;

    if (idx === this.length - 1) this.tail = prevNode;
    
    this.length--;
    return nodeToDelete.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let curNode = this.head;
    let sum = 0;

    while (curNode) {
      sum += curNode.val;
      curNode = curNode.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
