import mongoose from 'mongoose';

const advertSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: { 
      data: String,
      contentType: String,
    },
    locationLatLng: {
      type: [Number, Number],
      required: true,
    },
    locationName: {
      type: String,
      required: true,
    },
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
  },
  {
    timestamps: true,
  }
);

const Advert = mongoose.model('Advert', advertSchema);

export default Advert;