import { Container, Row, Col } from "react-bootstrap"

function Footer() {
    return (
        <footer className="bg-light">
            <br />
            <Container>
                <Row>
                    <Col md={4} className="mb-4">
                        <h3>Car Dalol Dealer</h3> <br />
                        <p>
                            Car Dalol Dealer is a platform that connects car buyers and sellers. <br />
                            We provide a platform where car buyers can easily find cars for sale and connect with car sellers. <br />
                        </p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h3>Useful Links</h3>
                        <ul>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Contact Us</li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h3>Contact Us</h3>
                        <p>
                            <strong>Email: </strong>
                            <a href="">@amir.abdullaev@email.cz</a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer