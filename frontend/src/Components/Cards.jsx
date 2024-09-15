import { Row, Col, Card, Button } from "react-bootstrap"
import image from './image/bmwi81.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
// import CardLoading from './Loading/CardLoading'
import Modals from './BuyerForm/Modals.jsx'
import './Cards.css'

function Cards(props) {
    const navigate = useNavigate();
    // const id = props.id
    const handleClink = () => {
        navigate(`/seller/${props.id}`)
    }
    
    const isSaved = (
        <Button variant="primary" className="mx-3" style={{width: "7rem"}}><i class="bi bi-bookmark-fill"></i></Button>
    )
    const isNotSaved = (
        <Button variant="outline-primary" className="mx-3" style={{width: "7rem"}}><i class="bi bi-bookmark"></i></Button>
    )

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
                        <Card.Title style={{
                            fontSize: '1.5rem', 
                            fontWeight: 'bold',

                        }}
                        className="cartitle" 
                        onClick={() => handleClink()}>
                            {props.brand} {props.model} 
                        </Card.Title>
                        <Card.Text>
                            <i class="bi bi-calendar"> {props.made_at},</i> 
                            <i class="bi bi-speedometer2 mx-2"> {props.tachometer}km,</i>  
                            <i class="bi bi-gear"> {props.power}kW,</i>
                            <i class="bi bi-geo-alt mx-2"> {props.place_of_sale},</i>  
                            <i class="bi bi-fuel-pump"> {props.fuel},</i><br />
                            <i class="bi bi-joystick"> {props.gearbox}</i>
                        </Card.Text>
                        <Card.Text>
                            <span className="badge bg-secondary">Price: {props.price}</span>
                            <span className="badge bg-secondary m-1">Min Price: {props.min_price}</span>
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Modals brand={props.brand} model={props.model} price={props.price} />
                        {props.saved ? isSaved : isNotSaved}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export default Cards