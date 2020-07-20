const mongoose = require('mongoose');
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/products', {
    useUnifiedTopology: 'true',
  });
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB!');
});

const kittySchema = new mongoose.Schema({
  name: String,
});

const productSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: String,
  features: [
    {
      feature: String,
      value: String,
    },
  ],
  photos: [
    {
      thumbnail_url: String,
      url: String,
    },
  ],
  styles: [
    {
      style_id: Number,
      style_name: String,
      original_price: String,
      sale_price: String,
      'default?': Number,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        },
      ],
      skus: [
        {
          size: Number,
        },
      ],
      related: [Number],
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

// module.exports = db;
