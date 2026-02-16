import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { FaLeaf, FaShoppingCart } from 'react-icons/fa';
import api from '../../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching product:', error);
            setLoading(false);
        }
    };

    const handleOrderNow = () => {
        navigate('/order', { state: { product } });
    };

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="success" />
            </div>
        );
    }

    if (!product) {
        return (
            <Container className="text-center py-5">
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist or is no longer available.</p>
                <Link to="/products" className="btn btn-success">Browse Products</Link>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Row>
                <Col md={6}>
                    <Card.Img 
                        src={product.image_url || 'https://via.placeholder.com/600x400?text=Product'} 
                        alt={product.name}
                        className="img-fluid rounded"
                    />
                </Col>
                <Col md={6}>
                    <h1>{product.name}</h1>
                    
                    <div className="mb-3">
                        <Badge bg="success" className="me-2">{product.category}</Badge>
                        {product.is_organic && (
                            <Badge bg="info">
                                <FaLeaf className="me-1" />
                                Organic
                            </Badge>
                        )}
                    </div>

                    <h2 className="text-success mb-3">KSh {product.price}/{product.quantity.split(' ')[1]}</h2>
                    
                    <p className="mb-4">{product.description}</p>
                    
                    <Row className="mb-4">
                        <Col sm={6}>
                            <strong>Available Quantity:</strong>
                            <p>{product.quantity}</p>
                        </Col>
                        <Col sm={6}>
                            <strong>Harvest Date:</strong>
                            <p>{new Date(product.harvest_date).toLocaleDateString()}</p>
                        </Col>
                    </Row>

                    <div className="mb-4">
                        <span className={`product-status ${product.is_available ? 'status-available' : 'status-out-of-stock'}`}>
                            {product.is_available ? 'In Stock' : 'Out of Stock'}
                        </span>
                    </div>

                    <Button 
                        variant="success" 
                        size="lg" 
                        onClick={handleOrderNow}
                        disabled={!product.is_available}
                        className="me-3"
                    >
                        <FaShoppingCart className="me-2" />
                        Order Now
                    </Button>
                    
                    <Link to="/products" className="btn btn-outline-success btn-lg">
                        Continue Shopping
                    </Link>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h3>Product Information</h3>
                    <p>
                        Our {product.name} are grown with care using sustainable farming practices. 
                        {product.is_organic ? ' They are certified organic and free from harmful pesticides.' : ''}
                        Harvested on {new Date(product.harvest_date).toLocaleDateString()} to ensure maximum freshness.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductDetails;