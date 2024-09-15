import './Filters/filter.css'
import { Button, Container, Row } from 'react-bootstrap';
import Modals from './BuyerForm/Modals.jsx';

function Details(props) {
    const renderData = props.data.map((data) => (
        <div key={data.id}>
            <h3>{data.title}</h3>
            <p>About Car: {data.text}</p>
            <p>Price: {data.price} Kc</p>
        </div>
    ))
    return (
        <Container className="sticky-box p-3 bg-light rounded-4 shadow">
            <Row>
                {renderData}
            </Row>
            <Row>
            </Row>
            <Row>
                <p>Seller: </p>
            </Row>
            <Row className='justify-content-center'>
                <Modals />
            </Row>
        </Container>
    )
}

export default Details;