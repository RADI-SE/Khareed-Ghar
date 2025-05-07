import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    active: {
        type: Boolean,
        default: true,
      },
      order: {
        type: Number,
        default: 0, 
      },
  },
  { timestamps: true }
);
export const Carousel = mongoose.model('Carousel', carouselSchema);

 
