import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';  // Make sure all are imported
import { useAuth } from '../../context/AuthContext';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import OrdersList from './OrdersList';
import { FaBox, FaShoppingCart, FaUsers, FaLeaf } from 'react-icons/fa';
import api from '../../services/api';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        availableProducts: 0,
        pendingOrders: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [productsRes, ordersRes] = await Promise.all([
                api.get('/products'),
                api.get('/orders')
            ]);

            const products = productsRes.data;
            const orders = ordersRes.data;

            setStats({
                totalProducts: products.length,
                totalOrders: orders.length,
                availableProducts: products.filter(p => p.is_available).length,
                pendingOrders: orders.filter(o => o.status === 'pending').length
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    return (
        <Container className="admin-dashboard">
            <div className="admin-header">
                <h2>Welcome back, {user?.username}!</h2>
                <p className="text-muted">Manage your farm products and orders from this dashboard.</p>
            </div>

            <Row className="admin-stats">
                <Col md={3}>
                    <Card className="stat-card">
                        <Card.Body>
                            <FaBox size={30} className="text-success mb-2" />
                            <div className="stat-number">{stats.totalProducts}</div>
                            <div className="stat-label">Total Products</div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card">
                        <Card.Body>
                            <FaLeaf size={30} className="text-success mb-2" />
                            <div className="stat-number">{stats.availableProducts}</div>
                            <div className="stat-label">Available Products</div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card">
                        <Card.Body>
                            <FaShoppingCart size={30} className="text-success mb-2" />
                            <div className="stat-number">{stats.totalOrders}</div>
                            <div className="stat-label">Total Orders</div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="stat-card">
                        <Card.Body>
                            <FaUsers size={30} className="text-success mb-2" />
                            <div className="stat-number">{stats.pendingOrders}</div>
                            <div className="stat-label">Pending Orders</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Tab.Container defaultActiveKey="products">
                <Row>
                    <Col md={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="products">
                                    <FaBox className="me-2" />
                                    Products
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="add-product">
                                    <FaLeaf className="me-2" />
                                    Add Product
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="orders">
                                    <FaShoppingCart className="me-2" />
                                    Orders
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col md={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="products">
                                <ProductList onStatsUpdate={fetchStats} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="add-product">
                                <AddProduct onProductAdded={fetchStats} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="orders">
                                <OrdersList />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default AdminDashboard;