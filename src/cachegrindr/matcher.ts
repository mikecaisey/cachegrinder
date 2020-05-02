type SigmaGrindObj = {
  meta: {
    positions: string[]
  }
}
type SigmaGrindFn = (o: SigmaGrindObj) => SigmaGrindObj

const match = (line: string): SigmaGrindFn => {
  let fn: SigmaGrindFn = (o) => { return o }

  if (line.match(/^positions/)) {
    fn = (o) => {
      const position = line
        .split(':')[1]
        .split(' ')
        .filter(s => s.length > 0)
      o.meta.positions = position
      return o
    }
  }

  return fn
}

export { match, SigmaGrindFn, SigmaGrindObj }
