import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';  // Add Row and Col here
import { useAuth } from '../../context/AuthContext';
import { FaLock } from 'react-icons/fa';

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(formData.username, formData.password);
        
        if (result.success) {
            navigate('/admin');
        } else {
            setError(result.error);
        }
        
        setLoading(false);
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card>
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <FaLock size={50} className="text-success" />
                                <h2 className="mt-3">Admin Login</h2>
                                <p className="text-muted">Enter your credentials to access admin panel</p>
                            </div>

                            {error && (
                                <Alert variant="danger">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        required
                                        autoFocus
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button 
                                        variant="success" 
                                        type="submit" 
                                        disabled={loading}
                                        size="lg"
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
                                </div>
                            </Form>

                            <div className="text-center mt-4">
                                <small className="text-muted">
                                    Default: admin / admin123
                                </small>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminLogin;