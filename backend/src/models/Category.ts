import mongoose, { Document, Schema } from 'mongoose';

// Category Interface
interface ICategory extends Document {
  name: string;
  description?: string;
  image?: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Category Schema
const CategorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: {
    public_id: { type: String },
    url: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
CategorySchema.pre<ICategory>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;