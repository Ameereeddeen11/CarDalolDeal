import Form from 'react-bootstrap/Form'
import data from '/src/data.json'

function Category() {
    const categories = data.category

    const loopCategory = categories.map((category, index) => (
        <option value={category} key={index}>{category}</option>
    ))

    return (
        <Form.Group>
            <Form.Select>
                <option value="Choose Category">Choose Category</option>
                {loopCategory}
            </Form.Select>
        </Form.Group>
    )
}

export default Category