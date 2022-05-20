class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.vertices = new Set();
  }

  // this function accepts a Node instance and adds it to the vertices property on the graph
  addVertex(vertex) {
    this.vertices.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the vertices property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(v => this.vertices.add(v));
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the vertices property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.vertices.delete(vertex);
    this.vertices.forEach(v => {if (v.adjacent.has(vertex)) v.adjacent.delete(vertex)});
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = [];
    const unvisited = [start];

    while (unvisited.length) {
      const vertex = unvisited.pop();
      visited.push(vertex.value);
      vertex.adjacent.forEach(v => {
        if (!visited.includes(v.value) 
        && !unvisited.includes(v)) 
        unvisited.push(v)
      });
    }
    return visited;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const visited = [];
    const unvisited = [start];

    while (unvisited.length) {
      const vertex = unvisited.shift();
      visited.push(vertex.value);
      vertex.adjacent.forEach(v => {
        if (!visited.includes(v.value)
        && !unvisited.includes(v)) 
        unvisited.push(v)});
    }
    return visited;
  }
}

module.exports = {Graph, Node}