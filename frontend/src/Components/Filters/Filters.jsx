import Brands from './Brand.jsx'
import Fuel from './Fuel.jsx'
import Category from './Category.jsx'
import PriceRange from './PriceRange.jsx'
import { Button, Row, Accordion } from 'react-bootstrap'
import './filter.css'
import Search from '../Header/Search.jsx'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

function Filters() {
    const filters = [
        {
            "key": 1,
            "title": "Brands and Models",
            "content": <Brands/>
        },
        // {
        //     "key": 2,
        //     "title": "Price Range",
        //     "content": <PriceRange/>
        // },
        {
            "key": 3,
            "title": "Fuel",
            "content": <Fuel/>
        },
        {
            "key": 4,
            "title": "Category",
            "content": <Category/>
        }
    ]

    const loop = filters.map((filter, index) => (
        <Accordion.Item eventKey={filter.key} key={index}>
            <Accordion.Header>{filter.title}</Accordion.Header>
            <Accordion.Body>{filter.content}</Accordion.Body>
        </Accordion.Item>
    ))

    const [priceRange, setPriceRange] = useState(0)
    const [maxPrice, setMaxPrice] = useState(0)

    return (
        <div className='sticky-box p-3 bg-light rounded-4 shadow-3-strong'>
            <Row className='my-2'>
                <h3 className='text-center'>Filter Cars</h3>
            </Row>
            {/* <Row className='my-4 mx-1'>
                <Search/>
            </Row> */}
            <Row className=''>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {loop}
                </Accordion>
            </Row>
            <Row className='my-4 mx-1'>
                <Form.Label>Price Range</Form.Label>
                <Form.Group controlId='formGridNumber'>
                    <p>Min: {priceRange.toLocaleString('cs-CZ')}</p>
                    <Form.Range id="desableRange" type="range" min={0} max={25000000} step={50000} value={priceRange} onChange={(e) => {setPriceRange(Number(e.target.value))}} />
                    <p>Max: {maxPrice.toLocaleString('cs-CZ')}</p>
                    <Form.Range id="desableRange" type='range' min={0} max={25000000} step={50000} value={maxPrice} onChange={(e) => {setMaxPrice(Number(e.target.value))}} />
                </Form.Group>
            </Row>
            <br />
            <Row className='justify-content-center mx-1'>
                <Button variant='primary' style={{width: '95%'}}>Filter</Button>
            </Row>
        </div>
    )
}

export default Filters