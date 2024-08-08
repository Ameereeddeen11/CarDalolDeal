import { Row, Col, Card, Button } from "react-bootstrap"
import image from './image/bmwi81.jpg'

function Cards(props) {
    return (
        <Card 
            key={props.id} 
            style={{
                width: '90%', 
                boxShadow: '0 4px 8 0 rgba(0, 0, 0, 0.2)', 
                borderRadius: '10px', 
                overflow: 'hidden', 
                transition: 'transform 0.3s',
            }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            className="mb-4">
            <Card.Img variant="top" src={image} alt="img" style={{height: '300px', objectFit: 'cover', borderRadius: '10px 0 0 10px'}}/>
            <Card.Body>
                <Card.Title style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{props.name}</Card.Title>
                <Card.Text style={{fontSize:'1rem'}}>{props.text}</Card.Text>
            </Card.Body>
            <Card.Body>
            <Card.Text style={{fontSize: '1.2rem', marginTop:'1rem', fontWeight: 'bold'}}>{props.price}</Card.Text>
            <Button variant="primary" style={{fontWeight:'bold'}}>More about</Button>
            </Card.Body>
        </Card>
    )
}

export default Cards