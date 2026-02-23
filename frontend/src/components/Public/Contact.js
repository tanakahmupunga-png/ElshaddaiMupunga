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
                                <p className="ms-4">+263 787886092</p>
                                <p className="ms-4 text-muted">Monday - Saturday: 8:00 AM - 6:00 PM</p>
                            </div>
                            
                            <div className="mb-4">
    <h5>
        <FaEnvelope className="text-success me-2" /> Email
    </h5>

    <p className="ms-4">
        <a 
            href="mailto:elshaddaimupunga25@gmail.com"
            className="text-decoration-none"
        >
            elshaddaimupunga25@gmail.com
        </a>
    </p>

   
</div>

                            
                            <div className="mb-4">
                                <h5><FaMapMarkerAlt className="text-success me-2" /> Location</h5>

    <p className="ms-4 fw-bold">NDODAHONDO COMPLEX</p>

    <p className="ms-4 mb-1">
        <small className="text-muted">
         Hardware Store
        </small>
    </p>

    <p className="ms-4 mb-1">
       252 wray avenue private Bag 968
    </p>
                            </div>
                            
                            <div className="mb-4">
                                <h5><FaWhatsapp className="text-success me-2" /> WhatsApp</h5>
                                <p className="ms-4">+263 787886092</p>
                                <Button 
                                    variant="success" 
                                    href="https://wa.me/+263 787886092"
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
        title="Town Centre Hardware - Bindura"
        src="https://www.google.com/maps?q=Town+Centre+Hardware+Bindura+Zimbabwe&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
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