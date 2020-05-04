const edges = []
const nodes = []

const filteredIdSet = g.nodes
  .filter(n => n.size > 5000000)
  .map(x => x.id)

// Filter edges for only those whos source or target matches
g.edges.forEach(e => {
    if (filteredIdSet.indexOf(e.source) >= 0
    || filteredIdSet.indexOf(e.target) >= 0)
  {
     edges.push(e)
  }
})

// Reduce to final id list
const _finalIdSet = []
edges.forEach(e => {
  _finalIdSet.push(e.source)
  _finalIdSet.push(e.target)
})

const finalIdSet = _finalIdSet.reduce((a, id) => {
  if (a.indexOf(id) < 0) a.push(id)
  return a
}, [])

finalIdSet.sort((a, b) => {
  const _a = Number.parseInt(a.slice(2))
  const _b = Number.parseInt(b.slice(2))
  return _a -_b
})

finalIdSet.forEach(id => {
    nodes.push(g.nodes.find(x => x.id === id))
})
