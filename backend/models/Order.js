const db = require('../config/db');

class Order {
    static async findAll() {
        const [rows] = await db.execute(
            'SELECT * FROM orders ORDER BY order_date DESC'
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute(
            'SELECT * FROM orders WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async create(orderData) {
        const { customer_name, customer_phone, customer_email, product_id, product_name, quantity, message } = orderData;
        const [result] = await db.execute(
            `INSERT INTO orders 
            (customer_name, customer_phone, customer_email, product_id, product_name, quantity, message) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [customer_name, customer_phone, customer_email, product_id, product_name, quantity, message]
        );
        return result.insertId;
    }

    static async updateStatus(id, status) {
        const [result] = await db.execute(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await db.execute(
            'DELETE FROM orders WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Order;