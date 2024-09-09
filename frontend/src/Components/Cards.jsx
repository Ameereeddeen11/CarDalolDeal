import { Row, Col, Card, Button } from "react-bootstrap"
import image from './image/bmwi81.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

function Cards(props) {
    const navigate = useNavigate();
    // const id = props.id
    const handleClink = () => {
        navigate(`/seller/${props.id}`)
    }
    return (
        <Card  
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
            key={props.id}
        >
            <Row className="no-gutters">
                <Col md={4}>
                    <Card.Img variant="top" src={image} alt="img" style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
                </Col>
                <Col md={8}>
                    <Card.Body>
                        <Card.Title style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{props.brand} {props.model} </Card.Title>
                        <Card.Text><i class="bi bi-calendar"></i>  {props.made_at},  <i class="bi bi-speedometer2"></i>  {props.tachometer}km,  <i class="bi bi-gear"></i>  {props.power}kW,  <i class="bi bi-geo-alt"></i>  {props.place_of_sale},  <i class="bi bi-fuel-pump"></i>  {props.fuel},  <i class="bi bi-joystick"></i>  {props.gearbox}</Card.Text>
                        <Card.Text>
                            <span className="badge bg-secondary m-1">Price: {props.price}</span>
                            <span className="badge bg-secondary m-1">Min Price: {props.min_price}</span>
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                    <Button variant="primary" style={{fontWeight:'bold'}} onClick={() => handleClink()}>More about</Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default Cards