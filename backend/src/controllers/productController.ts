import { Request, Response } from 'express';
import Product from '../models/Product';
import Category from '../models/Category';
import Brand from '../models/Brand';
import cloudinary from '../config/cloudinary';

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, category, brand, price, discount, stock, specifications } = req.body;

    // Upload images to Cloudinary
    const images = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    // Generate SKU
    const sku = `TH-${Date.now()}`;

    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      brand,
      images,
      price,
      discount,
      stock,
      specifications,
      sku,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, brand, minPrice, maxPrice, rating, sort } = req.query;

    // Build query
    const query: any = {};
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (rating) query.rating = { $gte: Number(rating) };

    // Build sort
    const sortQuery: any = {};
    if (sort === 'newest') sortQuery.createdAt = -1;
    if (sort === 'price-low-to-high') sortQuery.price = 1;
    if (sort === 'price-high-to-low') sortQuery.price = -1;
    if (sort === 'popularity') sortQuery.rating = -1;

    const products = await Product.find(query)
      .populate('category', 'name')
      .populate('brand', 'name')
      .sort(sortQuery);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get product by ID
const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('brand', 'name');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Category controllers
const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Upload image to Cloudinary if provided
    let image = undefined;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const category = await Category.create({ name, description, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Brand controllers
const createBrand = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    // Upload logo to Cloudinary if provided
    let logo = undefined;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      logo = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const brand = await Brand.create({ name, description, logo });
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getBrandById = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBrand = async (req: Request, res: Response) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json({ message: 'Brand deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};