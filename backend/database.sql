-- Create database
CREATE DATABASE IF NOT EXISTS agro_farm_db;
USE agro_farm_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity VARCHAR(50) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    harvest_date DATE,
    is_organic BOOLEAN DEFAULT false,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100),
    product_id INT,
    product_name VARCHAR(100),
    quantity VARCHAR(50) NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password) 
VALUES ('admin', '$2a$10$XFEqFOxhYQqQqQqQqQqQqOqQqQqQqQqQqQqQqQqQqQqQqQqQqQq');

-- Sample products
INSERT INTO products (name, category, price, quantity, description, image_url, harvest_date, is_organic, is_available) VALUES
('Fresh Maize', 'Grains', 50.00, '100 kg', 'Freshly harvested sweet maize, perfect for roasting or boiling', '/uploads/maize.jpg', '2024-01-15', true, true),
('Organic Tomatoes', 'Vegetables', 30.00, '50 kg', 'Vine-ripened organic tomatoes, no pesticides', '/uploads/tomatoes.jpg', '2024-01-14', true, true),
('Bananas', 'Fruits', 40.00, '200 bunches', 'Sweet ripe bananas from our farm', '/uploads/bananas.jpg', '2024-01-13', false, true),
('Free-range Eggs', 'Livestock', 15.00, '500 pcs', 'Fresh eggs from free-range chickens', '/uploads/eggs.jpg', '2024-01-15', true, true),
('Bell Peppers', 'Vegetables', 45.00, '30 kg', 'Crisp and colorful bell peppers', '/uploads/peppers.jpg', '2024-01-14', true, true);