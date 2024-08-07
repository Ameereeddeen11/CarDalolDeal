import { Row, Col, Card, Button } from "react-bootstrap"
import image from './image/bmwi81.jpg'

function Cards(props) {
    return (
        <Card key={props.id}>
            <Card.Img variant="top" src={image} alt="img"/>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
            <Card.Body>
            <Card.Text>{props.price}</Card.Text>
            <Button variant="primary">More about</Button>
            </Card.Body>
        </Card>
    )
}

export default Cards