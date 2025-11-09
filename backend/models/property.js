import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  title: { type: String, required: true },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  squareFootage: { type: String },
  propertyType: { type: String },
  category: { type: String },
  availability: { type: String },
  desiredPrice: { type: String },
  timeframe: { type: String },
  additionalInfo: { type: String },
  image: { type: String },
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);
export default Property;
