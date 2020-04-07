function getRoute(nodeA, nodeB) {
  for (const child of nodeA.children) {
    if (child === nodeB) {
      return [nodeA, nodeB];
    }

    const route = getRoute(child, nodeB);

    if (route) {
      return [nodeA, ...route];
    }
  }

  return null;
}

test();

function test() {
  shouldFindRoute();
}

function shouldFindRoute() {
  const graph = new GraphAL();
  const node0 = new GraphNode(0);
  const node1 = new GraphNode(1);
  const node2 = new GraphNode(2);
  const node3 = new GraphNode(3);
  const node4 = new GraphNode(4);
  const node5 = new GraphNode(5);

  node0.children.push(node1);
  node0.children.push(node4);
  node0.children.push(node5);

  node1.children.push(node4);
  node1.children.push(node3);

  node2.children.push(node1);

  node3.children.push(node2);
  node3.children.push(node4);

  graph.nodes.push(node0);
  graph.nodes.push(node1);
  graph.nodes.push(node2);
  graph.nodes.push(node3);
  graph.nodes.push(node4);
  graph.nodes.push(node5);

  const route = getRoute(node0, node2);

  if (!route || route[0] !== node0 || route[1] !== node1 || route[2] !== node3 || route[3] !== node2) {
    throw new Error('shouldFindRoute');
  }

  console.log('OK');
}
