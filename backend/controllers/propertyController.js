import Property from '../models/property.js';
import cloudinary from '../configs/cloudinary.js';

export const sellProperty = async (req, res) => {
  try {
   
    const requiredFields = ['name', 'email', 'phone', 'address', 'title'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    
    const newProperty = new Property({
      ...req.body,
      image: req.file ? req.file.path : null
    });

    await newProperty.save();

    res.status(201).json({
      success: true,
      property: newProperty
    });
  } catch (err) {
    console.error('Error in sellProperty:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Server error occurred'
    });
  }
};

export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json({
      success: true,
      properties
    });
  } catch (err) {
    console.error('Error in getProperties:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Server error occurred'
    });
  }
};

// For update 
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.file) {
      updates.image = req.file.path;
      
      const oldProperty = await Property.findById(id);
      if (oldProperty?.image) {
        const publicId = oldProperty.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`realestate/properties/${publicId}`);
      }
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ 
        success: false, 
        message: 'Property not found' 
      });
    }

    res.json({ 
      success: true, 
      property: updatedProperty 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};

// For delete operation
export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ 
        success: false, 
        message: 'Property not found' 
      });
    }

    // Delete image from Cloudinary if it exists
    if (property.image) {
      try {
        const urlParts = property.image.split('/');
        const publicId = urlParts[urlParts.length - 1].split('.')[0];
        const folder = 'realestate/properties';
        
        await cloudinary.uploader.destroy(`${folder}/${publicId}`);
      } catch (cloudinaryError) {
        console.warn('Cloudinary deletion failed, but continuing:', cloudinaryError);
        
      }
    }

    await Property.findByIdAndDelete(id);

    res.json({ 
      success: true, 
      message: 'Property deleted successfully' 
    });
  } catch (err) {
    console.error('Error in deleteProperty:', err);
    res.status(500).json({ 
      success: false, 
      message: err.message 
    });
  }
};