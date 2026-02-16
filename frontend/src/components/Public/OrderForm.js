import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';  // Add Row and Col
import api from '../../services/api';

const OrderForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        customer_name: '',
        customer_phone: '',
        customer_email: '',
        product_id: location.state?.product?.id || '',
        product_name: location.state?.product?.name || '',
        quantity: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products/available');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Update product name when product is selected
        if (name === 'product_id') {
            const selectedProduct = products.find(p => p.id === parseInt(value));
            setFormData(prev => ({
                ...prev,
                product_id: value,
                product_name: selectedProduct ? selectedProduct.name : ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            await api.post('/orders', formData);
            setSuccess(true);
            setFormData({
                customer_name: '',
                customer_phone: '',
                customer_email: '',
                product_id: '',
                product_name: '',
                quantity: '',
                message: ''
            });
            
            // Redirect to home after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            setError('Failed to submit order. Please try again.');
            console.error('Error submitting order:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Place Your Order</h2>
                            
                            {success && (
                                <Alert variant="success">
    Order submitted successfully! We&apos;ll contact you shortly to confirm.
</Alert>
                            )}
                            
                            {error && (
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            )}
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Name *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="customer_name"
                                        value={formData.customer_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone Number *</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="customer_phone"
                                        value={formData.customer_phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your phone number"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="customer_email"
                                        value={formData.customer_email}
                                        onChange={handleChange}
                                        placeholder="Enter your email (optional)"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Select Product *</Form.Label>
                                    <Form.Select
                                        name="product_id"
                                        value={formData.product_id}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Choose a product...</option>
                                        {products.map(product => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} - KSh {product.price}/{product.quantity.split(' ')[1]}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Quantity *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g., 5 kg, 2 bunches, 10 pcs"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Additional Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Any special instructions or requests?"
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button 
                                        variant="success" 
                                        type="submit" 
                                        disabled={submitting}
                                        size="lg"
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Order'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderForm;