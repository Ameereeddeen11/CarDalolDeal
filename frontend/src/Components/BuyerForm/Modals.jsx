import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function Modals(props) {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Button className="mx-3" variant="primary" style={{fontWeight:'bold'}} onClick={handleShow}>Send Your Price</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{props.brand} {props.model}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Seller price: {props.price}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleClose}>Send Your Price</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Modals;