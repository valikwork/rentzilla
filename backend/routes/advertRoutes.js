import express from 'express';
import multer from 'multer';
import { getAllAdverts, postAdvert } from '../controllers/advertController.js';
import { protect } from '../middleware/authMiddleware.js';

const advertRoutes = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage })

advertRoutes.get('/', getAllAdverts);
advertRoutes.post('/', upload.single('image'), protect, postAdvert);

export { advertRoutes };
