import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Modal, Alert, Spinner } from 'react-bootstrap';
import { FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import api from '../../services/api';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await api.patch(`/orders/${orderId}/status`, { status });
            setSuccess(`Order ${status === 'completed' ? 'marked as completed' : 'cancelled'}`);
            fetchOrders();
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError('Failed to update order status');
            console.error('Error updating order:', error);
        }
    };

    const deleteOrder = async () => {
        try {
            await api.delete(`/orders/${orderToDelete.id}`);
            setSuccess('Order deleted successfully');
            setShowDeleteModal(false);
            fetchOrders();
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError('Failed to delete order');
            console.error('Error deleting order:', error);
        }
    };

    const getStatusBadge = (status) => {
        const variants = {
            'pending': 'warning',
            'completed': 'success',
            'cancelled': 'danger'
        };
        return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
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
            <h3 className="mb-4">Customer Orders</h3>
            
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            
            {orders.length === 0 ? (
                <Alert variant="info">No orders yet</Alert>
            ) : (
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Phone</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>#{order.id}</td>
                                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.customer_phone}</td>
                                <td>{order.product_name}</td>
                                <td>{order.quantity}</td>
                                <td>{getStatusBadge(order.status)}</td>
                                <td>
                                    {order.status === 'pending' && (
                                        <>
                                            <Button
                                                variant="outline-success"
                                                size="sm"
                                                onClick={() => updateOrderStatus(order.id, 'completed')}
                                                className="me-2"
                                            >
                                                <FaCheck /> Complete
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                className="me-2"
                                            >
                                                <FaTimes /> Cancel
                                            </Button>
                                        </>
                                    )}
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => {
                                            setOrderToDelete(order);
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
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete order #{orderToDelete?.id}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteOrder}>
                        Delete Order
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OrdersList;