const readline = require('readline');
const fs = require('fs');


const readInterface = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/../../assets/cachegrind.out.1588292840-_var_www_html_index_php`),
    // output: process.stdout,
    console: false
});

readInterface.on('line', function(line) {

});

readInterface.on('close', function(line) {
  console.log('The End');
})
