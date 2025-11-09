import express from 'express';
import { sellProperty, getProperties,updateProperty,deleteProperty } from '../controllers/propertyController.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../configs/cloudinary.js';
import { validateId } from '../middlewares/validateId.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'realestate/properties',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1000, height: 800, crop: 'limit' }]
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  } else if (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next();
};

router.post('/sell', 
  upload.single('image'), 
  handleUploadErrors,
  sellProperty
);

router.get('/', getProperties);

router.put('/:id', validateId, upload.single('image'), handleUploadErrors, updateProperty);
router.delete('/:id', validateId, deleteProperty);



export default router;