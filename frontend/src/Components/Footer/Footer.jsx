import { Container, Row, Col } from "react-bootstrap"
import './Footer.css'

function Footer() {
    return (
        <footer className="bg-white text-dark fixed-bottom py-3">
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h3>Car Dalol Dealer</h3>
                        <p>
                            Car Dalol Dealer is a platform that connects car buyers and sellers.<br />
                            We provide a platform where car buyers can easily find cars for sale and connect with car sellers.
                        </p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h3>Useful Links</h3>
                        <ul className="list-unstyled">
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h3>Contact Us</h3>
                        <p>
                            <strong>Email: </strong>
                            <a href="mailto:amir.abdullaev@email.cz" className="text-dark">amir.abdullaev@email.cz</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer