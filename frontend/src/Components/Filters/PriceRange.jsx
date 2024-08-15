import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'

function PriceRange() {
    const [priceRange, setPriceRange] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)

    return (
        <Row className='my-3'>
            <Form.Label>Price Range</Form.Label>
            <Form.Group controlId='formGridNumber'>
                <p>Min: {priceRange.toLocaleString('cs-CZ')}</p>
                <Form.Range id="desableRange" type="range" min={0} max={25000000} step={50000} value={priceRange} onChange={(e) => {setPriceRange(Number(e.target.value))}} />
                <p>Max: {maxPrice.toLocaleString('cs-CZ')}</p>
                <Form.Range id="desableRange" type='range' min={0} max={25000000} step={50000} value={maxPrice} onChange={(e) => {setMaxPrice(Number(e.target.value))}} />
            </Form.Group>
        </Row>
    )
}

export default PriceRange