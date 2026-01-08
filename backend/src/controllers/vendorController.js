import { getAllVendors, getVendorById, getVendorMenu, getHalls } from '../services/vendorService.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * GET /api/vendors
 * Get all vendors, optionally filter by hall
 */
export const getVendorsController = async (req, res, next) => {
  try {
    const { hall } = req.query;
    const vendors = await getAllVendors(hall);
    res.json(vendors);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/vendors/halls
 * Get all halls
 */
export const getHallsController = async (req, res, next) => {
  try {
    const halls = await getHalls();
    res.json({ halls });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/vendors/:id
 * Get vendor by ID
 */
export const getVendorController = async (req, res, next) => {
  try {
    const vendor = await getVendorById(req.params.id);
    res.json(vendor);
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/vendors/:id/menu
 * Get vendor's menu
 */
export const getVendorMenuController = async (req, res, next) => {
  try {
    const menu = await getVendorMenu(req.params.id);
    res.json(menu);
  } catch (error) {
    next(error);
  }
};
