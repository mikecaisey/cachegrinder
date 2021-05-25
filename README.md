# cachegrinder - Xdebug Cachegrind Map Reduce function

Translate Xdebug Cachegrind files into graph data using a JSON document, i.e. a NodeJs script of a nodes and edges following a map & reduce function:

## Map
Feed the cachegrind file into `map-to-js.js` script


`$ cat assets/cachegrind.out.1588292840-_var_www_html_index_php |
node src/cachegrindr/map-to-js.js > file.js`

## Reduce
Finally reduce the information to summarise

`$ cat file.js src/cachegrindr/reduce-to-JSON.js | node > file.json`

Cachegrind (a subset of Callgrind) has a context free grammar used to make declarative statements that describe time and memory costs of a procedure. The data of time and memory complexity are captured using PHP's Xdebug extension.

The output schema follows:

## Schema
`const data = { nodes: [], edges: [] }`

## Assets
The cachegrind files `/assets/*` included are from a vanilla runtime of Wordpress in action.
