const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category (e.g., ARCHITECTURE, VILLAS, WELLNESS)'],
      trim: true,
      uppercase: true,
    },
    specs: {
      type: String,
      default: 'Sanctuary Architecture',
      trim: true,
    },
    aspect: {
      type: String,
      default: 'aspect-[16/10]',
      trim: true,
    },
    gridSpan: {
      type: String,
      default: 'lg:col-span-4',
      trim: true,
    },
    url: {
      type: String,
      required: [true, 'Please provide an image URL'],
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

galleryItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

galleryItemSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
