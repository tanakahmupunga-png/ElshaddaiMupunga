import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={4}>
                        <h3>NDODAHONDO COMPLEX</h3>
                        <p>Your trusted source for fresh, organic agricultural products straight from our farm to your table.</p>
                    </Col>
                    <Col md={4}>
                        <h3>Quick Links</h3>
                        <ul className="list-unstyled">
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/order">Order Now</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h3>Contact Info</h3>
                        <p>Phone: +263 787886092</p>
                        <p>Email: elshaddaimupunga25@gmail.com</p>
                        <p>Address: 252 wray avenue 
private Bag 968, Bindura </p>
                        <div className="social-links">
                            <a href="#" className="me-3"><FaFacebook size={24} /></a>
                            <a href="#" className="me-3"><FaTwitter size={24} /></a>
                            <a href="#" className="me-3"><FaInstagram size={24} /></a>
                            <a href="#"><FaWhatsapp size={24} /></a>
                        </div>
                    </Col>
                </Row>
                <hr className="mt-4" />
                <div className="text-center mt-3">
                    <p>&copy; {new Date().getFullYear()} NDODAHONDO COMPLEX. All rights reserved.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;