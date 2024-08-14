import { Row, Col, Card, Button } from "react-bootstrap"
import image from './image/bmwi81.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'

function Cards(props) {
    return (
        <Card 
            key={props.id} 
            style={{ 
                width: '100%',
                height: '100%',
                borderRadius: '15px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1"
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none"
            }}
            className="mb-3 p-2"
        >
            <Row className="no-gutters">
                <Col md={4}>
                    <Card.Img variant="top" src={image} alt="img" style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{props.name}</Card.Title>
                        <Card.Text style={{fontSize: '1.2rem', marginTop:'1rem', fontWeight: 'bold'}}><h5><span className="badge text-bg-secondary">{props.price}</span></h5></Card.Text>
                    </Card.Body>
                    <Card.Body>
                    <Button variant="primary" style={{fontWeight:'bold'}}>More about</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default Cards