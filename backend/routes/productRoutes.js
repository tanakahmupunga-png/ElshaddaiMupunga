const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getAllProducts,
    getAvailableProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateAvailability
} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Public routes
router.get('/', getAllProducts);
router.get('/available', getAvailableProducts);
router.get('/:id', getProductById);

// Admin routes (protected)
router.post('/', authMiddleware, upload.single('image'), createProduct);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.patch('/:id/availability', authMiddleware, updateAvailability);

module.exports = router;