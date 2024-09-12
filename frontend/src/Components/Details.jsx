import './Filters/filter.css'
import { Button, Row } from 'react-bootstrap';
import Modals from './BuyerForm/Modals.jsx';

function Details(props) {
    const renderData = props.data.map((user) => (
        <>
            <p>id: {user.id}</p>
            <p>username: {user.username}</p>
            <p>firstname: {user.firstname}</p>
            <p>lastname: {user.lastname}</p>
            <p>email: {user.email}</p>
        </>
    ))
    return (
        <div className="sticky-box p-3 bg-light rounded-4 shadow">
            <Row>
                <h3></h3>
            </Row>
            <Row>
            </Row>
            <Row>
                <p>Seller: </p>
            </Row>
            <Row className='justify-content-center'>
                {/* <Modals /> */}
                {renderData}
            </Row>
        </div>
    )
}

export default Details;