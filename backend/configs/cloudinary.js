import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary configuration is missing');
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  api_proxy: process.env.API_PROXY 
});


cloudinary.api.ping()
  .then(res => console.log('Cloudinary connection verified'))
  .catch(err => console.error('Cloudinary connection failed:', err));

export default cloudinary;