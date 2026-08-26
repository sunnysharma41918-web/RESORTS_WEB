const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema(
  {
    tier: {
      type: String,
      default: '01',
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide the suite or villa name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide an architectural setting or category'],
      trim: true,
    },
    specs: {
      type: [String],
      default: ['Private Pool', '2–4 Guests', '1,990 SQ FT'],
    },
    description: {
      type: String,
      required: [true, 'Please provide an architectural description'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide a photography URL'],
      trim: true,
    },
    price: {
      type: String,
      default: '₹45,000 / Night',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

accommodationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

accommodationSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Accommodation', accommodationSchema);
