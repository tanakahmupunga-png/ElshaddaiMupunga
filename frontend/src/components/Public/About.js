import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';  // Add Row and Col

const About = () => {
    return (
        <Container className="my-5">
            <Row className="mb-5">
                <Col>
                    <h1 className="text-center mb-4">About AgroFarm Shop</h1>
                    <div className="text-center mb-4">
                        <Image 
                            src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                            fluid 
                            rounded 
                            className="mb-4"
                        />
                    </div>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={6}>
                    <h2>Our Story</h2>
                    <p>
                        Founded in 2010, AgroFarm Shop began as a small family farm with a big dream: 
                        to provide our community with the freshest, highest quality agricultural products 
                        while promoting sustainable farming practices.
                    </p>
                   <p>What started with just 2 acres of land has now grown into a thriving farm that produces a wide variety of vegetables, fruits, and grains. We&apos;ve also expanded to include livestock, providing our customers with free-range eggs and poultry.</p>
                    <p>
                        Today, we supply to local restaurants, grocery stores, and individual customers 
                        who appreciate the difference that farm-fresh produce makes in their cooking.
                    </p>
                </Col>
                <Col md={6}>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is simple: to grow nutritious, delicious food while caring for the 
                        land and our community. We believe that healthy soil produces healthy food, 
                        and healthy food creates healthy communities.
                    </p>
                    <p>We&apos;re committed to:</p>
                    <ul>
                        <li>Sustainable farming practices that protect our environment</li>
                        <li>Providing fair wages and safe working conditions for our workers</li>
                        <li>Offering affordable, high-quality food to all members of our community</li>
                        <li>Supporting local food systems and reducing food miles</li>
                    </ul>
                </Col>
            </Row>

            <Row className="bg-light p-5 rounded">
                <Col>
                    <h2 className="text-center mb-4">Why Choose AgroFarm?</h2>
                    <Row>
                        <Col md={4} className="text-center mb-3">
                            <h3>🌱 Freshness Guaranteed</h3>
                            <p>We harvest at peak ripeness and deliver within 24 hours</p>
                        </Col>
                        <Col md={4} className="text-center mb-3">
                            <h3>🤝 Direct from Farm</h3>
                            <p>No middlemen - you get the best prices and quality</p>
                        </Col>
                        <Col md={4} className="text-center mb-3">
                            <h3>🌍 Sustainable</h3>
                            <p>We use eco-friendly farming methods to protect our planet</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h2 className="text-center mb-4">Meet Our Team</h2>
                    <Row>
                        <Col md={4} className="text-center mb-4">
                            <Image 
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                                roundedCircle 
                                width="150" 
                                height="150"
                                className="mb-3"
                            />
                            <h4>John Mwangi</h4>
                            <p className="text-muted">Founder & Head Farmer</p>
                            <p>30+ years of farming experience</p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <Image 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                                roundedCircle 
                                width="150" 
                                height="150"
                                className="mb-3"
                            />
                            <h4>Sarah Wanjiku</h4>
                            <p className="text-muted">Operations Manager</p>
                            <p>Ensuring quality and timely delivery</p>
                        </Col>
                        <Col md={4} className="text-center mb-4">
                            <Image 
                                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                                roundedCircle 
                                width="150" 
                                height="150"
                                className="mb-3"
                            />
                            <h4>David Otieno</h4>
                            <p className="text-muted">Customer Relations</p>
                            <p>Here to help with your orders</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default About;