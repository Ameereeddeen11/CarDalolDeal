import { Container, Row, Col, Button } from "react-bootstrap";
import Cards from '../Components/Cards.jsx';
import Filters from "../Components/Filters/Filters.jsx";
import React, { useState, useEffect } from "react";
import './Home.css'

// const car = [
//     { id: 1, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: './image/bmwi81.jpg' },
//     { id: 2, title: 'Mercedes-Benz S class', text: 'My second favorite car', price: '$250000', image: 'bmwi81'},
//     { id: 3, title: 'BMW I8', text: 'My favorite car', price: '$250000', image: 'bmwi81' },
// ];

function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // Empty dependency array means this useEffect runs once on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const cards = data.map((cars) => (
        <Col xs={12} key={cars.id} className="mb-4">
            <Cards 
                id={cars.id} 
                brand={cars.car.brand} 
                model={cars.car.model} 
                price={cars.price} 
                min_price={cars.min_price} 
                made_at={cars.car.made_at} 
                tachometer={cars.car.tachometer} 
                power={cars.car.power} 
                fuel={cars.car.fuel} 
                gearbox={cars.car.gearbox} 
                place_of_sale={cars.car.place_of_sale} 
            />
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
