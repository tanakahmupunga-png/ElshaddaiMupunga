import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';  // Add Row and Col
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-5">Contact Us</h1>
            
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <h2 className="mb-4">Get in Touch</h2>
                            
                            <div className="mb-4">
                                <h5><FaPhone className="text-success me-2" /> Phone</h5>
                                <p className="ms-4">+123 456 7890</p>
                                <p className="ms-4 text-muted">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                            </div>
                            
                            <div className="mb-4">
                                <h5><FaEnvelope className="text-success me-2" /> Email</h5>
                                <p className="ms-4">info@agrofarm.com</p>
                                <p className="ms-4">orders@agrofarm.com</p>
                            </div>
                            
                            <div className="mb-4">
                                <h5><FaMapMarkerAlt className="text-success me-2" /> Location</h5>
                                <p className="ms-4">123 Farm Road</p>
                                <p className="ms-4">Agricultural District, 00100</p>
                            </div>
                            
                            <div className="mb-4">
                                <h5><FaWhatsapp className="text-success me-2" /> WhatsApp</h5>
                                <p className="ms-4">+123 456 7890</p>
                                <Button 
                                    variant="success" 
                                    href="https://wa.me/1234567890"
                                    target="_blank"
                                >
                                    <FaWhatsapp className="me-2" />
                                    Chat on WhatsApp
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={6} className="mb-4">
                    <Card className="h-100">
                        <Card.Body>
                            <h2 className="mb-4">Our Location</h2>
                            <div style={{ width: '100%', height: '400px' }}>
                                <iframe
                                    title="Farm Location"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.846296276516!2d36.8171844!3d-1.2832844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d2b7f1b3b5%3A0x3c9b9b9b9b9b9b9b!2sNairobi!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Card className="bg-light">
                        <Card.Body>
                            <h3 className="text-center mb-3">Visit Our Farm</h3>
                            <p className="text-center mb-0">
                                We welcome visitors to tour our farm and see where your food comes from. 
                                Please call ahead to schedule a visit during our operating hours.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contact;