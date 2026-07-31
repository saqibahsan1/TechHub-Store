import mongoose, { Document, Schema } from 'mongoose';

// Brand Interface
interface IBrand extends Document {
  name: string;
  description?: string;
  logo?: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Brand Schema
const BrandSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  logo: {
    public_id: { type: String },
    url: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
BrandSchema.pre<IBrand>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Brand = mongoose.model<IBrand>('Brand', BrandSchema);

export default Brand;