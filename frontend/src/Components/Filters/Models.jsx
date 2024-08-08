import Form from 'react-bootstrap/Form'

function Models(props) {
    const model = {
        "Audi": ["Q5", "Q6", "Q7", "Q8"],
        "BMW": ["i8", "M2", "M3", "M4", "M5"],
        "Mercedes-Benz": ["S", "E", "C"]
    }

    const brand = props.brand

    return (
        brand && (
            <>
                <Form.Label>Models</Form.Label>
                <Form.Select>
                    <option value="">Choose model</option>
                    {model[brand].map((options, index) => (
                        <option key={index} value={options.toLowerCase().replace(/\s/g, '-')}>{options}</option>
                    ))}
                </Form.Select>
            </>
        )
    )
}

export default Models