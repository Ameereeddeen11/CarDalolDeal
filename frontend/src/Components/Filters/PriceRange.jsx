import Form from 'react-bootstrap/Form'
import { Col, Row } from 'react-bootstrap'

function PriceRange() {
    return (
        <Row className='my-3'>
            <Form.Label>Price Range</Form.Label>
            <Col xs={12} md={6} className='my-2'>
                <Form.Group as={Col} controlId='formGridNumber'>
                    <Form.Control type='number' placeholder='Min' />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group as={Col} controlId='formGridNumber'>
                    <Form.Control type='number' placeholder='Max' />
                </Form.Group>
            </Col>
        </Row>
    )
}

export default PriceRange