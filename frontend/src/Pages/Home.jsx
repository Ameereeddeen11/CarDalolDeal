import { Container, Row, Col, Button } from "react-bootstrap";
import Cards from '../Components/Cards.jsx';
import Filters from "../Components/Filters/Filters.jsx";

const car = [
    { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: './image/bmwi81.jpg' },
    { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000', image: 'bmwi81'},
    { id: 3, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: 'bmwi81' },
];

function Home() {
    const cards = car.map((car) => (
        <Col xs={12} key={car.id} className="mb-4">
            <Cards name={car.title} text={car.text} price={car.price} image={car.image} />
        </Col>
    ));

    return (
        <Container className="mt-5">
            <Row>
                <Col xs={12} md={4} className="mb-4">
                    <Filters />
                </Col>
                <Col xs={12} md={8}>
                    <Row>
                        {cards}
                    </Row>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Button variant="primary" style={{width: '25%'}}>More</Button>
            </Row>
        </Container>
    );
}

export default Home;
