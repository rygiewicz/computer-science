function GraphNode(value) {
  this.value = value;
  this.children = [];
}

function GraphAL() {
  this.nodes = [];
}

test();

function test() {
  shouldCreate();
}

function shouldCreate() {
  const graph = new GraphAL();
  const node1 = new GraphNode('test1');
  const node2 = new GraphNode('test2');

  node1.children.push(node2);

  graph.nodes.push(node1);
  graph.nodes.push(node2);

  if (graph.nodes[0].children[0] !== node2) {
    throw new Error('shouldCreate');
  }

  console.log('OK');
}
