import express from 'express';
import {
  getVendorsController,
  getHallsController,
  getVendorController,
  getVendorMenuController,
} from '../controllers/vendorController.js';

const router = express.Router();

/**
 * GET /api/vendors
 * Get all vendors
 */
router.get('/', getVendorsController);

/**
 * GET /api/vendors/halls
 * Get all halls
 */
router.get('/halls', getHallsController);

/**
 * GET /api/vendors/:id
 * Get vendor by ID
 */
router.get('/:id', getVendorController);

/**
 * GET /api/vendors/:id/menu
 * Get vendor menu
 */
router.get('/:id/menu', getVendorMenuController);

export default router;
