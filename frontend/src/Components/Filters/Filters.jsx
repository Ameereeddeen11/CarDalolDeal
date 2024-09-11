import Brands from './Brand.jsx'
import Fuel from './Fuel.jsx'
import Category from './Category.jsx'
import PriceRange from './PriceRange.jsx'
import { Button, Row, Accordion } from 'react-bootstrap'
import './filter.css'
import Search from '../Header/Search.jsx'

function Filters() {
    const filters = [
        {
            "key": 1,
            "title": "Brands and Models",
            "content": <Brands/>
        },
        {
            "key": 2,
            "title": "Price Range",
            "content": <PriceRange/>
        },
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

    return (
        <div className='sticky-box p-3 bg-light rounded-4 shadow'>
            <Row className='my-2'>
                <h3 className='text-center'>Filter Cars</h3>
            </Row>
            <Row className='my-4'>
                <Search/>
            </Row>
            <Row>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                    {loop}
                </Accordion>
            </Row>
            <br />
            <Row className='justify-content-center'>
                <Button variant='primary' style={{width: '95%'}}>Filter</Button>
            </Row>
        </div>
    )
}

export default Filters