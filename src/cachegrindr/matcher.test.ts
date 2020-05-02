import { describe, it } from 'mocha'
import { expect } from 'chai'
import { match as matchFn, SigmaGrindFn, SigmaGrindObj } from './matcher'

// https://valgrind.org/docs/manual/cl-format.html

// The header lines with keys "positions" and "events" define the meaning of
// cost lines in the second part of the file: the value of "positions" is a list
// of subpositions, and the value of "events" is a list of event type names.
describe('Key:Value pair meta data', () => {
  it('positions value', () => {
    const line = 'positions: line'
    const o: SigmaGrindObj = { meta: { positions: [], events: [] } }
    const fn: SigmaGrindFn = matchFn(line)
    const result = fn(o)
    expect(result.meta.positions[0]).to.equal('line')
  })

  it('events value', () => {
    const line = 'events: Time Memory'
    const o: SigmaGrindObj = { meta: { positions: [], events: [] } }
    const fn: SigmaGrindFn = matchFn(line)
    const result = fn(o)
    expect(result.meta.events[0]).to.equal('Time')
    expect(result.meta.events[1]).to.equal('Memory')
  })
})

// Cost lines consist of subpositions followed by 64-bit counters for the events,
// in the order specified by the "positions" and "events" header line.
describe('Homer Simpson', () => {
  it('Bart should skate', () => {
    /** Test cases for Bart */
    // assert(true)
  })
})
