import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import Models from './Models.jsx'
import data from '/src/data.json'

function Brands() {
    const brands = data.brand_model.map(brandObj => brandObj.brand)
    
    const loop = brands.map((brand, index) => (
        <option value={brand} key={index}>{brand}</option>
    ))
    
    const [firstSelect, setFirstSelect] = useState('')
    const handleFirstSelect = (e) => {
        setFirstSelect(e.target.value)
    }

    return (
        <>
            <Form.Group className='my-3'>
                <Form.Label>Brand</Form.Label>
                <Form.Select value={firstSelect} onChange={handleFirstSelect}>
                    <option value="">Choose brand</option>
                    {loop}
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Models brand={firstSelect}/>
            </Form.Group>
        </>
    )
}

export default Brands