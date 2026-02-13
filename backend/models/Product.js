const db = require('../config/db');

class Product {
    static async findAll() {
        const [rows] = await db.execute(
            'SELECT * FROM products ORDER BY created_at DESC'
        );
        return rows;
    }

    static async findAvailable() {
        const [rows] = await db.execute(
            'SELECT * FROM products WHERE is_available = true ORDER BY created_at DESC'
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute(
            'SELECT * FROM products WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async create(productData) {
        const { name, category, price, quantity, description, image_url, harvest_date, is_organic, is_available } = productData;
        const [result] = await db.execute(
            `INSERT INTO products 
            (name, category, price, quantity, description, image_url, harvest_date, is_organic, is_available) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, category, price, quantity, description, image_url, harvest_date, is_organic || false, is_available !== false]
        );
        return result.insertId;
    }

    static async update(id, productData) {
        const { name, category, price, quantity, description, image_url, harvest_date, is_organic, is_available } = productData;
        const [result] = await db.execute(
            `UPDATE products 
            SET name = ?, category = ?, price = ?, quantity = ?, description = ?, 
                image_url = ?, harvest_date = ?, is_organic = ?, is_available = ?
            WHERE id = ?`,
            [name, category, price, quantity, description, image_url, harvest_date, is_organic, is_available, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await db.execute(
            'DELETE FROM products WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }

    static async updateAvailability(id, is_available) {
        const [result] = await db.execute(
            'UPDATE products SET is_available = ? WHERE id = ?',
            [is_available, id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Product;