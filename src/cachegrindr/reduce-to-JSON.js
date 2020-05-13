// quick JSON renderer
// removes duplicate edges
o.edges = o.edges.reduce((a, v) => {
  if (a.findIndex(x => x.id === v.id) < 0) {
    a.push(v)
  }
  return a
}, []);

// The reduce function
console.log(JSON.stringify(o, null, 2))
