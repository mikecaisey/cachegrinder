g.nodes.reduce((a,n) => {
  if (n.size < a[0]) a[0] = n.size
  if (n.size > a[1]) a[1] = n.size
  return a
},[g.nodes[0].size, g.nodes[0].size])
