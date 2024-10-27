import React from "react";
import { MDBInput } from 'mdb-react-ui-kit';

function AuthInput(props) {
    const { username, setUsername } = props.username;
    return (
        <MDBInput 
            wrapperClass='mb-4 w-100' 
            label='Username' 
            id='formControlLg' 
            type='text' 
            size="lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
    );
}

export default AuthInput;