import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import api from '../../services/api';

const ProductList = ({ onStatsUpdate }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
            setLoading(false);
            if (onStatsUpdate) onStatsUpdate();
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        
        const formData = new FormData();
        Object.keys(editingProduct).forEach(key => {
            if (key !== 'image' && editingProduct[key] !== null) {
                formData.append(key, editingProduct[key]);
            }
        });

        try {
            await api.put(`/products/${editingProduct.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setSuccess('Product updated successfully');
            setShowEditModal(false);
            fetchProducts();
            
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError('Failed to update product');
            console.error('Error updating product:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/products/${productToDelete.id}`);
            setSuccess('Product deleted successfully');
            setShowDeleteModal(false);
            fetchProducts();
            
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError('Failed to delete product');
            console.error('Error deleting product:', error);
        }
    };

    const toggleAvailability = async (product) => {
        try {
            await api.patch(`/products/${product.id}/availability`, {
                is_available: !product.is_available
            });
            fetchProducts();
        } catch (error) {
            console.error('Error toggling availability:', error);
        }
    };

    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="border" variant="success" />
            </div>
        );
    }

    return (
        <div>
            <h3 className="mb-4">Manage Products</h3>
            
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Table responsive striped hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Organic</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>
                                <img 
                                    src={product.image_url || 'https://via.placeholder.com/50'} 
                                    alt={product.name}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td> Dollars ($){product.price}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <Badge bg={product.is_available ? 'success' : 'secondary'}>
                                    {product.is_available ? 'Available' : 'Out of Stock'}
                                </Badge>
                            </td>
                            <td>
                                {product.is_organic ? (
                                    <FaCheck className="text-success" />
                                ) : (
                                    <FaTimes className="text-danger" />
                                )}
                            </td>
                            <td>
                                <Button 
                                    variant="outline-success" 
                                    size="sm" 
                                    onClick={() => toggleAvailability(product)}
                                    className="me-2"
                                >
                                    Toggle Stock
                                </Button>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    onClick={() => handleEdit(product)}
                                    className="me-2"
                                >
                                    <FaEdit />
                                </Button>
                                <Button 
                                    variant="outline-danger" 
                                    size="sm" 
                                    onClick={() => {
                                        setProductToDelete(product);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    <FaTrash />
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingProduct?.name || ''}
                                onChange={(e) => setEditingProduct({
                                    ...editingProduct,
                                    name: e.target.value
                                })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingProduct?.category || ''}
                                onChange={(e) => setEditingProduct({
                                    ...editingProduct,
                                    category: e.target.value
                                })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price ( Dollars ($))</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={editingProduct?.price || ''}
                                onChange={(e) => setEditingProduct({
                                    ...editingProduct,
                                    price: e.target.value
                                })}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                value={editingProduct?.quantity || ''}
                                onChange={(e) => setEditingProduct({
                                    ...editingProduct,
                                    quantity: e.target.value
                                })}
                                required
                                placeholder="e.g., 100 kg, 50 bunches"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editingProduct?.description || ''}
                                onChange={(e) => setEditingProduct({
                                    ...editingProduct,
                                    description: e.target.value
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Harvest Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={editingProduct?.harvest_date?.split('T')[0] || ''}
                                onChange={(e) => setEditingProduct({
                                    ...editingProduct,
                                    harvest_date: e.target.value
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Organic Product"
                                checked={editingProduct?.is_organic || false}
                                onChange={(e) => setEditingProduct({
                                    ...editingProduct,
                                    is_organic: e.target.checked
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Available for Sale"
                                checked={editingProduct?.is_available !== false}
                                onChange={(e) => setEditingProduct({
                                    ...editingProduct,
                                    is_available: e.target.checked
                                })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product Image</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setEditingProduct({
                                        ...editingProduct,
                                        image: file
                                    });
                                }}
                            />
                            <Form.Text className="text-muted">
                                Leave empty to keep current image
                            </Form.Text>
                        </Form.Group>

                        <Button variant="success" type="submit">
                            Update Product
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal - FIXED UNESCAPED QUOTES */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`Are you sure you want to delete "${productToDelete?.name || ''}"? This action cannot be undone.`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductList;