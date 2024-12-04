import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Modals from "../BuyerForm/Modals.jsx";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBCardFooter,
  MDBBtn,
  MDBBadge
} from "mdb-react-ui-kit";
import { Col, Row } from "react-bootstrap";

function Cards(props) {
  const navigate = useNavigate();

  const handleClink = () => {
    navigate(`/seller/${props.id}`);
  };

  const isSaved = (
    <MDBBtn
            variant="primary"
            style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                transform: 'translate(50%, -50%)',
                backgroundColor: 'transparent',
            }} 
        >
            <i className="bi bi-heart-fill"></i>
    </MDBBtn>
  );
  const isNotSaved = (
    <MDBBtn
            variant="primary"
            style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                transform: 'translate(50%, -50%)',
                backgroundColor: 'transparent',
            }} 
        >
            <i className="bi bi-heart"></i>
    </MDBBtn>
  );

  const price = props.price.toLocaleString('cs-CZ').replace(/,/g, ' ');

  return (
    <MDBCard 
        className='shadow-3-strong'
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
        }}
        style={{
            transition: 'transform 0.2s, box-shadow 0.2s',
            position: 'relative',
            width: '22rem',
        }}
    >
        <MDBCardImage
            src="https://mdbootstrap.com/img/new/standard/nature/184.webp"
            position="top"
            alt="..."
        />
        {props.isNotSaved ? isNotSaved : isSaved}
        <MDBCardBody>
          <MDBCardTitle
              onClick={handleClink}
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
              className="cartitle"
          >
            {props.brand} {props.model}
          </MDBCardTitle>
          <MDBCardText>
            <i className="bi bi-calendar"> {props.made_at},</i>
            <i className="bi bi-speedometer2 mx-2"> {props.tachometer}km,</i>
            <i className="bi bi-gear"> {props.power}kW</i>
            {/* <br /> */}
            {/* <i className="bi bi-geo-alt mx-2"> {props.place_of_sale},</i> */}
            {/* <i className="bi bi-fuel-pump"> {props.fuel},</i> */}
            {/* <br />x */}
            {/* <i className="bi bi-joystick"> {props.gearbox}</i> */}

            <Row>
              <Col className="d-flex justify-content-between align-items-center">
                  {/* <h3>{props.price}</h3> */}
                  <h3 className="my-3">
                    <MDBBadge color='info' light>
                      {price} Kč
                    </MDBBadge>
                  </h3>
                  <Modals
                      brand={props.brand}
                      model={props.model}
                      price={price}
                  />
              </Col>
            </Row>
          </MDBCardText>
          {/* <MDBCardText className=""> */}
              {/* <h5><MDBBadge pill light><p >Price: {props.price}</p></MDBBadge></h5> */}
              {/* <h5><MDBBadge pill light>
                Min Price: {props.min_price}
              </MDBBadge></h5> */}
          {/* </MDBCardText> */}
        </MDBCardBody>
        {/* <MDBCardFooter color='light'>
        </MDBCardFooter> */}
    </MDBCard>
  );
}

export default Cards;