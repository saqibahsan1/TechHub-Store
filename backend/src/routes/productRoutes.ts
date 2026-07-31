import express from 'express';
import {
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
} from '../controllers/productController';
import { auth, authorize } from '../middlewares/auth';

const router = express.Router();

// Public routes (no auth required)
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);
router.get('/brands', getBrands);
router.get('/brands/:id', getBrandById);

// Protected routes (Admin only)
router.post('/products', auth, authorize(['Admin']), createProduct);
router.put('/products/:id', auth, authorize(['Admin']), updateProduct);
router.delete('/products/:id', auth, authorize(['Admin']), deleteProduct);

router.post('/categories', auth, authorize(['Admin']), createCategory);
router.put('/categories/:id', auth, authorize(['Admin']), updateCategory);
router.delete('/categories/:id', auth, authorize(['Admin']), deleteCategory);

router.post('/brands', auth, authorize(['Admin']), createBrand);
router.put('/brands/:id', auth, authorize(['Admin']), updateBrand);
router.delete('/brands/:id', auth, authorize(['Admin']), deleteBrand);

export default router;