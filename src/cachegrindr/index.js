const readline = require('readline');
const fs = require('fs');
const Rx = require('rxjs');
const {
  map,
  pipe
} = require('rxjs/operators')

const readInterface = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/../../assets/cachegrind.out.1588292840-_var_www_html_index_php`),
    // output: process.stdout,
    console: false
});

const subject = new Rx.Subject() //.create()

readInterface.on('line', function(line) {
  subject.next(line)
});

readInterface.on('close', function(line) {
  subject.complete()
})

subject
  .pipe(map(x => {
    if (x.match(/^fl=/)) {
      return 'BOOBS'
    }
  }))
  .subscribe({
    next: x => console.log(x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('D O N E'),
  })
