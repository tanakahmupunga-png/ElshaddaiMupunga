import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { FaLeaf, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Navbar bg="success" variant="dark" expand="lg" className="header">
            <Container>
                <Navbar.Brand as={Link} to="/" className="logo">
                    <FaLeaf className="me-2" />
                    NDODAHONDO COMPLEX
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        <Nav.Link as={Link} to="/order">
                            <FaShoppingCart className="me-1" />
                            Order
                        </Nav.Link>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
                                <Button 
                                    variant="outline-light" 
                                    size="sm" 
                                    onClick={handleLogout}
                                    className="ms-2"
                                >
                                    <FaSignOutAlt className="me-1" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/admin/login">Admin Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;