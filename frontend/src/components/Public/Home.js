import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';  // Removed 'Button' from imports
import api from '../../services/api';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await api.get('/products/available');
            setFeaturedProducts(response.data.slice(0, 4)); // Show only 4 featured products
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="success" />
            </div>
        );
    }

    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <Container>
                    <h1>Fresh from Our Farm to Your Table</h1>
                    <p>Discover the finest quality organic produce, grown with care and harvested at peak freshness.</p>
                    <Link to="/products" className="btn btn-lg me-3">Browse Products</Link>
                    <Link to="/order" className="btn btn-outline btn-lg">Place Order</Link>
                </Container>
            </section>

            {/* Featured Products */}
            <Container className="my-5">
                <h2 className="text-center mb-4">Featured Products</h2>
                <Row>
                    {featuredProducts.map(product => (
                        <Col md={3} key={product.id}>
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
                                      Dollars ($): {product.price}/{product.quantity?.split(' ')[1] || 'unit'}
                                    </Card.Text>
                                    <Card.Text className="text-muted small">
                                        {product.description?.substring(0, 60)}...
                                    </Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className={`product-status ${product.is_available ? 'status-available' : 'status-out-of-stock'}`}>
                                            {product.is_available ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                        <Link to={`/products/${product.id}`} className="btn btn-sm btn-success">
                                            View Details
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                    <Link to="/products" className="btn btn-success">View All Products</Link>
                </div>
            </Container>

            {/* Why Choose Us */}
            <section className="bg-light py-5">
                <Container>
                    <h2 className="text-center mb-4">Why Choose Us</h2>
                    <Row>
                        <Col md={4} className="text-center mb-4">
                            <div className="display-1 text-success mb-3">🌱</div>
                            <h3>100% Organic</h3>
                            <p>All our products are grown without harmful pesticides or chemicals.</p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="display-1 text-success mb-3">🚜</div>
                            <h3>Farm Fresh</h3>
                            <p>Harvested at peak ripeness and delivered within 24 hours.</p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <div className="display-1 text-success mb-3">🤝</div>
                            <h3>Direct from Farm</h3>
                            <p>No middlemen, ensuring you get the best prices and quality.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Home;