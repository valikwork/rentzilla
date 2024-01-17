import express from 'express';
import multer from 'multer';
import { getAllAdverts, postAdvert } from '../controllers/advertController.js';
import { protect } from '../middleware/authMiddleware.js';

const advertRoutes = express.Router();

// const storage = new GridFsStorage({
//   url: 'mongodb+srv://osiptsevvalik:Sj88hXgZQ8koBAYL@rentzilacluster.ynqr5rb.mongodb.net/rentzila?retryWrites=true&w=majority',
//   file: (req, file) => {
//     //If it is an image, save to photos bucket
//     console.log('file from GridFsStorage', file);
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//       return {
//         bucketName: "advertPhotos",
//         filename: `${Date.now()}_${file.originalname}`,
//       }
//     } else {
//       //Otherwise save to default bucket
//       return `${Date.now()}_${file.originalname}`
//     }
//   },
// })
const storage = multer.memoryStorage()
const upload = multer({ storage })

advertRoutes.get('/', getAllAdverts);
advertRoutes.post('/', upload.single('image'), protect, postAdvert);

export { advertRoutes };
