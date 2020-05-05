const countEdges = []
g.edges.filter(e => {
  countEdges.push(e.source)
  countEdges.push(e.target)
})

countEdges.sort((a,b) => {
  const _a = Number.parseInt(a.slice(2))
  const _b = Number.parseInt(b.slice(2))
  return _a - _b
})

const fnEdges = countEdges.filter(x => x.includes('fn'))
const flEdges = countEdges.filter(x => x.includes('fl'))

const modeFnEdges = fnEdges.reduce((a, e) => {
  a[e] = (a[e] ?? 0) + 1
  return a
}, {})

const modeFlEdges = flEdges.reduce((a, e) => {
  a[e] = (a[e] ?? 0) + 1
  return a
}, {})

let minFn = 10
let maxFn = 10
for (k of Object.keys(modeFnEdges)) {
  if (modeFnEdges[k] < minFn) minFn = modeFnEdges[k]
  if (modeFnEdges[k] > maxFn) maxFn = modeFnEdges[k]
}

let minFl = 10
let maxFl = 10
for (k of Object.keys(modeFlEdges)) {
  if (modeFlEdges[k] < minFl) minFl = modeFlEdges[k]
  if (modeFlEdges[k] > maxFl) maxFl = modeFlEdges[k]
}


console.log(Object.keys(modeFnEdges)[Object.values(modeFnEdges).findIndex(x => x === maxFn)])
console.log(Object.keys(modeFlEdges)[Object.values(modeFlEdges).findIndex(x => x === maxFl)])
