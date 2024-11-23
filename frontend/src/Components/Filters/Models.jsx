import Form from 'react-bootstrap/Form'
import data from '/src/data.json'

function getModelByBrand(name) {
    const brand = data.brand_model.find(brandObj => brandObj.brand === name)
    return brand ? brand.models : []
}

function Models(props) {
    const brand = props.brand

    const brandModel = getModelByBrand(brand) 
    const loopOption = brandModel.map((options, index) => (
        <option key={index} value={options.toLowerCase()}>{options}</option>
    ))

    return (
        brand && (
            <>
                <Form.Select>
                    <option value="">Choose model</option>
                    {/* {model[brand].map((options, index) => (
                        <option key={index} value={options.toLowerCase().replace(/\s/g, '-')}>{options}</option>
                    ))} */}
                    {loopOption}
                </Form.Select>
            </>
        )
    )
}

export default Models