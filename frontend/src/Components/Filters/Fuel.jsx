import Form from 'react-bootstrap/Form'
import data from '/src/data.json'

function Fuel() {
    const fuels = data.fuel

    const loopOption = fuels.map((fuel, index) => (
        <option value={fuel} key={index}>{fuel}</option>
    ))

    return (
        <Form.Group className='my-3'>
            <Form.Select>
                <option value="Choose Fuel">Choose Fuel</option>
                {loopOption}
            </Form.Select>
        </Form.Group>
    )
}

export default Fuel