const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAvailableProducts = async (req, res) => {
    try {
        const products = await Product.findAvailable();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            image_url: req.file ? `/uploads/${req.file.filename}` : null
        };
        const productId = await Product.create(productData);
        res.status(201).json({ 
            message: 'Product created successfully', 
            productId 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productData = {
            ...req.body,
            image_url: req.file ? `/uploads/${req.file.filename}` : req.body.image_url
        };
        const success = await Product.update(req.params.id, productData);
        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const success = await Product.delete(req.params.id);
        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateAvailability = async (req, res) => {
    try {
        const { is_available } = req.body;
        const success = await Product.updateAvailability(req.params.id, is_available);
        if (!success) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product availability updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllProducts,
    getAvailableProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateAvailability
};