import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
  } from 'mdb-react-ui-kit';
import Login from '../Components/Auth/Login'
import Register from '../Components/Auth/Register'

function AuthMain(props) {
    return (
        <MDBContainer fluid style={{ overflowY: 'auto' }} className="my-5">
            <MDBRow className='d-flex justify-content-center align-items-center '>
                <MDBCol col='12'>
                    <MDBCard className='bg-white my-5 mx-auto shadow-5-strong' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column' style={{ overflowY: 'auto' }}>
                        {props.login ? <Login/> : <Register/>}
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default AuthMain;