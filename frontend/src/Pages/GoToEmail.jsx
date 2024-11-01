import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
  } from 'mdb-react-ui-kit';

function GoToEmail() {    
    return (
        <MDBContainer fluid style={{ overflowY: 'auto' }}>
            <MDBRow className='d-flex justify-content-center align-items-center '>
                <MDBCol col='12'>
                    <MDBCard className='bg-white my-5 mx-auto shadow-5-strong' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column' style={{ overflowY: 'auto' }}>
                            <h2 className="fw-bold mb-2 text-center">Go to your email</h2>
                            <p className="text-black-50 mb-3 text-center my-3">Please check your email for a verification link</p>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default GoToEmail;