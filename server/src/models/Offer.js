const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide the package title'],
      trim: true,
    },
    category: {
      type: String,
      default: 'Celebrations',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide package details'],
      trim: true,
    },
    inclusions: {
      type: [String],
      default: [],
    },
    discount: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      default: 'Exclusive Offer',
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
      trim: true,
    },
    location: {
      type: String,
      default: 'Pan-India Sanctuaries',
      trim: true,
    },
    validTill: {
      type: String,
      default: 'Ongoing Seasonal Privilege',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

offerSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

offerSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Offer', offerSchema);
