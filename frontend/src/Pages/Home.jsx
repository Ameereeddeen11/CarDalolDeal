import { Container, Row, Col, Button } from "react-bootstrap";
// import Cards from '../Components/Cards.jsx';
import Filters from "../Components/Filters/Filters.jsx";
import React, { useState, useEffect } from "react";
import CardLoading from "../Components/Loading/CardLoading.jsx";
import './Home.css'
import Cards from '../Components/Cards/Cards.jsx';

const car = [
    { id: 1, brand: 'BMW', model: 'I8', price: '$250000', min_price: '$250000', made_at: '2018', tachometer: '10000', power: '200', fuel: 'Gasoline', gearbox: 'Automatic', place_of_sale: 'Tbilisi', saved: true },
    { id: 2, brand: 'Mercedes-Benz', model: 'S class', price: '$250000', min_price: '$250000', made_at: '2018', tachometer: '10000', power: '200', fuel: 'Gasoline', gearbox: 'Automatic', place_of_sale: 'Tbilisi', saved: false },
    { id: 3, brand: 'BMW', model: 'I8', price: '$250000', min_price: '$250000', made_at: '2018', tachometer: '10000', power: '200', fuel: 'Gasoline', gearbox: 'Automatic', place_of_sale: 'Tbilisi', saved: true },
    { id: 4, brand: 'BMW', model: 'I8', price: '$250000', min_price: '$250000', made_at: '2018', tachometer: '10000', power: '200', fuel: 'Gasoline', gearbox: 'Automatic', place_of_sale: 'Tbilisi', saved: false },
    { id: 5, brand: 'BMW', model: 'I8', price: '$250000', min_price: '$250000', made_at: '2018', tachometer: '10000', power: '200', fuel: 'Gasoline', gearbox: 'Automatic', place_of_sale: 'Tbilisi', saved: true },
    { id: 6, brand: 'BMW', model: 'I8', price: '$250000', min_price: '$250000', made_at: '2018', tachometer: '10000', power: '200', fuel: 'Gasoline', gearbox: 'Automatic', place_of_sale: 'Tbilisi', saved: false },
    { id: 7, brand: 'BMW', model: 'I8', price: '$250000', min_price: '$250000', made_at: '2018', tachometer: '10000', power: '200', fuel: 'Gasoline', gearbox: 'Automatic', place_of_sale: 'Tbilisi', saved: true }
]

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

    if (loading) return <CardLoading />;
    if (error) return <p>Error: {error.message}</p>; 

    const cards = car.map((cars) => (
        <Col key={cars.id} xs={12} lg={4} lx={3} md={6} className="mb-4">
            <Cards 
                id={cars.id} 
                brand={cars.brand} 
                model={cars.model} 
                price={cars.price} 
                min_price={cars.min_price} 
                made_at={cars.made_at} 
                tachometer={cars.tachometer} 
                power={cars.power} 
                fuel={cars.fuel} 
                gearbox={cars.gearbox} 
                place_of_sale={cars.place_of_sale} 
                saved={cars.saved}
            />
        </Col>
    ));

    return (
        <div className="container-fluit mt-5">
            <div className="mx-3">
                <Row>
                    <Col xs={12} sm={6} md={4} lg={3} style={{minHeight: '450px'}} className="mb-4 my-4">
                        <Filters />
                    </Col>
                    <Col className="mb-4 my-4" xs={12} sm={6} md={8} lg={9}>
                        <Row>
                            {cards}
                        </Row>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Button variant="primary" style={{width: '25%'}}>More</Button>
                </Row>
            </div>
        </div>
    );
}

export default Home;
