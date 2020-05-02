"use strict";
const readline = require('readline');
const fs = require('fs');
const file = `${__dirname}/../../assets/cachegrind.out.1588292840-_var_www_html_index_php.bak`

const write = function(strings, ...values) {
  let result = ''
  for (let i=0; i<strings.length; i++) {
    const s = strings[i]
    const v = values[i] ? values[i] : ''
    result += `${s}${v}`
  }
  console.log(result);
}

const readInterface = readline.createInterface({
    input: fs.createReadStream(file),
    // output: process.stdout,
    console: false
});

// Start
write`const o = { meta: {}, nodes: [], edges: []}`

// state between lines
let flId = null
let fnId = null
let cfnId = null
let cflId = null

// Interpret lines
readInterface.on('line', function(line) {

  let match = null

  // add meta info to meta object with key value pair
  // e.g. creator: xdebug 2.9.4 (PHP 7.3.16)
  const reMeta = /^(\w+):\s*(.+)$/
  match = line.match(reMeta)
  if (match !== null) {
    write`o.meta.${match[1]} = "${match[2]}"`
  }

  // create node with file name and id, set fl var
  // e.g. fl=(1) php:internal
  //      fl=(2) /var/www/html/wp-includes/version.php
  const reCreateFile = /^fl=\((\d+)\)\s*(.+)$/
  match = line.match(reCreateFile)
  if (match !== null) {
    flId = `${match[1]}`
    write`o.nodes.push({
      id: "fl${flId}",
      label: "fl: ${match[2]}",
      size: 1
    })`
  }

  // create node with function name and id,
  //    create edge between fn and fl,
  //    set fnId
  // e.g. fn=(1) php::define
  const reCreateFn = /^fn=\((\d+)\)\s*(.+)$/
  match = line.match(reCreateFn)
  if (match !== null) {
    fnId = `${match[1]}`
    write`o.nodes.push({
      id: "fn${fnId}",
      label: "fn: ${match[2]}",
      size: 1
    })`
    write`o.edges.push({
      id: "fl${flId}fn${fnId}",
      source: "fl${flId}",
      target: "fn${fnId}"
    })`
  }

  // sum time complexity onto fl
  // sum memory complexity onto fn
  // e.g. 21 0 24 (line, time, memory)
  const reLineTimeMemory = /^([0-9]+)\s([0-9]+)\s([0-9]+)$/
  match = line.match(reLineTimeMemory)
  if (match !== null) {
    if (cfnId !== null && cflId !== null) {
      write`o.nodes[o.nodes.findIndex(x => x.id === 'fl${cflId}')]
      .size += ${match[2]}`
      write`o.nodes[o.nodes.findIndex(x => x.id === 'fn${cfnId}')]
      .size += ${match[3]}`
    } else {
      write`o.nodes[o.nodes.findIndex(x => x.id === 'fl${flId}')]
      .size += ${match[2]}`
      write`o.nodes[o.nodes.findIndex(x => x.id === 'fn${fnId}')]
      .size += ${match[3]}`
    }
  }

  // Update node by setting flId and fnId for next complexity match
  // e.g. fl=(10)
  //      fn=(20)
  const reUpdateFile = /^fl=\((\d+)\)$/
  match = line.match(reUpdateFile)
  if (match !== null) {
    flId = match[1]
  }

  const reUpdateFn = /^fn=\((\d+)\)$/
  match = line.match(reUpdateFn)
  if (match !== null) {
    fnId = match[1]
  }

  // Add an edge for file:function calls
  const reCallFile = /^cfl=\((\d+)\)$/
  match = line.match(reCallFile)
  if (match !== null) {
    cflId = match[1]
  }

  const reCallFn = /^cfn=\((\d+)\)$/
  match = line.match(reCallFn)
  if (match !== null) {
    cfnId = match[1]
  }

  const reCalls = /^calls=/
  match = line.match(reCalls)
  if (match !== null) {
    write`o.edges.push({
      id: "fn${fnId}cfn${cfnId}",
      source: "fn${fnId}",
      target: "fn${cfnId}"
    })`
  }

  // reset fl, fn vars to null on empty line
  const reEmptyLine = /^$/
  match = line.match(reEmptyLine)
  if (match !== null) {
    flId = null
    fnId = null
    cflId = null
    cfnId = null
  }

  // throw new Error('Error: Line uninterpreted')
});

readInterface.on('close', function(line) {
  write`console.log(o)`
})

/*
{
  "nodes": [
    {
      "id": "n0",
      "label": "A node",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n1",
      "label": "Another node",
      "x": 3,
      "y": 1,
      "size": 2
    },
    {
      "id": "n2",
      "label": "And a last one",
      "x": 1,
      "y": 3,
      "size": 1
    }
  ],
  "edges": [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
    {
      "id": "e1",
      "source": "n1",
      "target": "n2"
    },
    {
      "id": "e2",
      "source": "n2",
      "target": "n0"
    }
  ]
}*/
