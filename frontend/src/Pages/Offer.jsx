import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "../Components/Details";

function Offer() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/seller/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]); 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    const renderData = data.map((user, index) => (
        <div key={1}>
            <p>id: {user.user.id}</p>
            <p>username: {user.user.username}</p>
            <p>firstname: {user.user.firstname}</p>
            <p>lastname: {user.user.lastname}</p>
            <p>email: {user.user.email}</p>
        </div>
    ))
    return (
        <Container className="mt-5">
            <Row>
                <Col xs={12} md={8} className="mb-4">
                    <h1>data</h1>
                </Col>
                <Col xs={12} md={4}>
                    {/* <Details 
                        data={data.user}
                    /> */}
                    {renderData}
                </Col>
            </Row>
        </Container>
    )
}

export default Offer