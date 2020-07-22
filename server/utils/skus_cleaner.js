const csv = require('csv-parse');
const fs = require('fs');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'style_id', title: 'style_id' },
    { id: 'size', title: 'size' },
    { id: 'quantity', title: 'quantity' },
  ],
});

let readStream = fs.createReadStream('../../../../skus.csv');
let writeStream = fs.createWriteStream('../../../../clean_skus.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
    // for (let key in chunk) {
    //   let trimKey = key.trim();
    //   chunk[trimKey] = chunk[key];
    //   if(key !== trimKey) {
    //     delete chunk[key];
    //   }
    // }
  }
}

const transformer = new CSVCleaner({ writableObjectMode: true });

writeStream.write(csvStringifier.getHeaderString());

readStream
  .pipe(csv())
  .pipe(transformer)
  .pipe(writeStream)
  .on('finish', () => {
    console.log('finished');
  });
