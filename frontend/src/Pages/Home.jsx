import { Container, Row, Col } from "react-bootstrap"
import Cards from '../Components/Cards.jsx'

const car = [
    { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: './image/bmwi81.jpg' },
    { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000', image: 'bmwi81'},
    { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: 'bmwi81' },
    { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000', image: 'bmwi81'},
    { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: 'bmwi81' },
    { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000', image: 'bmwi81'},
    { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: 'bmwi81' },
    { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000', image: 'bmwi81'},
    { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: 'bmwi81' },
    { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000', image: 'bmwi81'},
    { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: 'bmwi81' },
    { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000', image: 'bmwi81'},
    { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: 'bmwi81' },
    { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000'}
] 

function Home() {
    const cards = car.map((car, id) => (
        <><Cards name={car.title} id={id} text={car.text} price={car.price} image={car.image}/> <br /></>
    ))

    return (
        <Container>
            <Row>
                <Col xs={6} md={4}>
                    <h1>Hello there !!!</h1>
                </Col>
                <Col xs={12} md={8}>
                    {cards}
                </Col>
            </Row>
        </Container>
    )
}

export default Home