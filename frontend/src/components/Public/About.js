import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

// Import images from src/images
import elshaddaiImage from '../../images/Elshaddai.jpeg';
import frankImage from '../../images/frank.jpeg';

const About = () => {
    return (
        <Container className="my-5">
            {/* ... rest of your content ... */}

            <Row className="mt-5">
                <Col>
                    <h2 className="text-center mb-4">Meet Our Team</h2>
                    <Row>
                        {/* Team Member 1 - Elshaddai Mupunga */}
                        <Col md={6} className="text-center mb-4">
                            <Image
                                src={elshaddaiImage} alt="Elshaddai"  // Use imported variable
                                roundedCircle
                                width={150}
                                height={150}
                                className="mb-3"
                                style={{ objectFit: 'cover' }}
                            />
                            <h4>Elshaddai Mupunga</h4>
                            <p className="text-muted">Operations Manager</p>
                            <p>Ensuring quality and timely delivery</p>
                        </Col>

                        {/* Team Member 2 - Frank */}
                        <Col md={6} className="text-center mb-4">
                            <Image 
                              src={frankImage} alt="Frank"  // Use imported variable
                                roundedCircle 
                                width={150} 
                                height={150}
                                className="mb-3"
                                style={{ objectFit: 'cover' }}
                            />
                            <h4>Frank Mupunga</h4>
                            <p className="text-muted">The developer</p>
                            <p>Here to help with your orders</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default About;