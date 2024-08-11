import { Row, Col, Card, Button } from "react-bootstrap"
import image from './image/bmwi81.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'

function Cards(props) {
    return (
        <Card 
            key={props.id} 
            style={{ width: '100%', height: '100%' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
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
        // <div className="card mb-3 p-2" style={{}}>
        //     <div className="row no-gutters">
        //         <div className="col-md-4">
        //             <img src={image} alt="img" className="card-img" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        //         </div>
        //         <div className="col-md-8">
        //             <div className="card-body">
        //                 <h5 className="card-title">{props.name}</h5>
        //                 <p className="card-text">{props.price}</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Cards