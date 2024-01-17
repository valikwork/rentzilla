import asyncHandler from 'express-async-handler';
import Advert from '../models/advertModel.js';
import User from '../models/userModel.js';

// @desc    Get all ads
// @route   GET /api/adverts
// @access  Public
const getAllAdverts = asyncHandler(async (req, res) => {
  const adverts = await Advert.find();

  if (adverts) {
    res.json({ adverts });
  } else {
    res.status(404);
    throw new Error('Adverts not found');
  }
});

// @desc    Post a new advert
// @route   POST /api/adverts
// @access  Private
const postAdvert = asyncHandler(async (req, res) => {
  const { title, description, price, locationName, locationLatLng } = req.body;
  const { mimetype, buffer } = req.file;

  const user = await User.findById(req.user._id);

  if (user) {
    const advert = await Advert.create({
      title,
      description,
      price,
      image: {
        data: buffer.toString('base64'),
        contentType: mimetype
      },
      locationLatLng: locationLatLng.split(','),
      locationName,
      author: user
    });
  
    if (advert) {
      res.status(201).json({ advert });
    } else {
      res.status(400);
      throw new Error('Invalid advert data');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
  
});

export {
  getAllAdverts,
  postAdvert,
};