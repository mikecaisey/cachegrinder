type SigmaGrindObj = {
  meta: {
    positions: string[]
    events: string[]
  }
}
type SigmaGrindFn = (o: SigmaGrindObj) => SigmaGrindObj

const match = (line: string): SigmaGrindFn => {
  let fn: SigmaGrindFn = (o) => { return o }

  // Positions meta data
  if (line.match(/^positions/)) {
    fn = (o) => {
      const positions = line
        .split(':')[1]
        .split(' ')
        .filter(s => s.length > 0)
      o.meta.positions = positions
      return o
    }
  }

  // Events meta data
  if (line.match(/^events/)) {
    fn = (o) => {
      const events = line
        .split(':')[1]
        .split(' ')
        .filter(s => s.length > 0)
      o.meta.events = events
      return o
    }
  }

  return fn
}

export { match, SigmaGrindFn, SigmaGrindObj }
