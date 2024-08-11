import Brands from './Brand.jsx'
import Fuel from './Fuel.jsx'
import Category from './Category.jsx'
import PriceRange from './PriceRange.jsx'
import './filter.css'

function Filters() {
    return (
        <div className='sticky-box p-3 bg-light'>
            <h3>Filter Cars</h3>
            <Brands/>
            <PriceRange/>
            <Fuel/>
            <Category/>
            <br />
        </div>
    )
}

export default Filters