const csv = require('csv-parser');
const fs = require('fs');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const Transform = require('stream').Transform;

const csvStringifier = createCsvStringifier({
  header: [
    { id: 'id', title: 'id' },
    { id: 'styleId', title: 'style_id' },
    { id: 'url', title: 'url' },
    { id: 'thumbnail_url', title: 'thumbnail_url' },
  ],
});

let readStream = fs.createReadStream('../../../../photos.csv');
let writeStream = fs.createWriteStream('../../../../clean_photos.csv');

class CSVCleaner extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    for (let key in chunk) {
      let trimKey = key.trim();
      chunk[trimKey] = chunk[key];
      if (key !== trimKey) {
        delete chunk[key];
      }
    }
    chunk = csvStringifier.stringifyRecords([chunk]);
    this.push(chunk);
    next();
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
