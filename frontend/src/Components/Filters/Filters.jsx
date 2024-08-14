import Brands from './Brand.jsx'
import Fuel from './Fuel.jsx'
import Category from './Category.jsx'
import PriceRange from './PriceRange.jsx'
import { Button, Row } from 'react-bootstrap'
import './filter.css'

function Filters() {
    return (
        <div className='sticky-box p-3 bg-light'>
            <h3>Filter Cars</h3>
            <Row>
                <Brands/>
                <PriceRange/>
                <Fuel/>
                <Category/>
            </Row>
            <br />
            <Row className='justify-content-center'>
                <Button variant='primary' style={{width: '95%'}}>Filter</Button>
            </Row>
            <br />
        </div>
    )
}

export default Filters