import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Spinner } from 'react-bootstrap';  // Add Row and Col
import api from '../../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products/available');
            setProducts(response.data);
            setFilteredProducts(response.data);
            
            // Extract unique categories
            const uniqueCategories = [...new Set(response.data.map(p => p.category))];
            setCategories(uniqueCategories);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        let filtered = products;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [selectedCategory, searchTerm, products]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="success" />
            </div>
        );
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Our Products</h1>
            
            {/* Filters */}
            <Row className="mb-4">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Search Products</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Filter by Category</Form.Label>
                        <Form.Select 
                            value={selectedCategory} 
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-5">
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            ) : (
                <Row>
                    {filteredProducts.map(product => (
                        <Col md={4} lg={3} key={product.id} className="mb-4">
                            <Card className="product-card h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={product.image_url || 'https://via.placeholder.com/300x200?text=Product'} 
                                    alt={product.name}
                                    className="product-image"
                                />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text className="product-price">
                                        Dollars ($): {product.price}/{product.quantity.split(' ')[1]}
                                    </Card.Text>
                                    <Card.Text className="text-muted small">
                                        {product.description.substring(0, 60)}...
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className={`product-status ${product.is_available ? 'status-available' : 'status-out-of-stock'}`}>
                                            {product.is_available ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                        {product.is_organic && (
                                            <span className="badge bg-success">Organic</span>
                                        )}
                                    </div>
                                    <Link 
                                        to={`/products/${product.id}`} 
                                        className="btn btn-success w-100 mt-3"
                                    >
                                        View Details
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Products;