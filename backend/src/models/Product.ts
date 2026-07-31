import mongoose, { Document, Schema } from 'mongoose';

// Product Interface
interface IProduct extends Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  brand: mongoose.Types.ObjectId;
  images: {
    public_id: string;
    url: string;
  }[];
  price: number;
  discount?: number;
  stock: number;
  rating: number;
  reviews: {
    user: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
  sku: string;
  specifications: {
    key: string;
    value: string;
  }[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product Schema
const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: mongoose.Types.ObjectId, ref: 'Brand', required: true },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  sku: { type: String, required: true, unique: true },
  specifications: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
ProductSchema.pre<IProduct>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;