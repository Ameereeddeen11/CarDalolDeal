import { Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

function CardLoading() {
    return(
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Row>
        </Container>
    )
}

export default CardLoading;