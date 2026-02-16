import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import api from '../../services/api';

const AddProduct = ({ onProductAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
        harvest_date: '',
        is_organic: false,
        is_available: true,
        image: null
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setSuccess('');

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                submitData.append(key, formData[key]);
            }
        });

        try {
            await api.post('/products', submitData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setSuccess('Product added successfully!');
            setFormData({
                name: '',
                category: '',
                price: '',
                quantity: '',
                description: '',
                harvest_date: '',
                is_organic: false,
                is_available: true,
                image: null
            });
            
            if (onProductAdded) onProductAdded();
            
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError('Failed to add product. Please try again.');
            console.error('Error adding product:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card>
            <Card.Body>
                <h3 className="mb-4">Add New Product</h3>
                
                {success && <Alert variant="success">{success}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Name *</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter product name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category *</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Vegetables, Fruits, Grains"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price (Dollars) *</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            placeholder="Enter price"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Quantity *</Form.Label>
                        <Form.Control
                            type="text"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 100 kg, 50 bunches"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your product"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Harvest Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="harvest_date"
                            value={formData.harvest_date}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Organic Product"
                            name="is_organic"
                            checked={formData.is_organic}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Available for Sale"
                            name="is_available"
                            checked={formData.is_available}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <Form.Text className="text-muted">
                            Upload a clear image of your product (JPEG, PNG)
                        </Form.Text>
                    </Form.Group>

                    <Button 
                        variant="success" 
                        type="submit" 
                        disabled={submitting}
                    >
                        {submitting ? 'Adding Product...' : 'Add Product'}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default AddProduct;