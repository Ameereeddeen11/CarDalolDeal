import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  } from 'mdb-react-ui-kit';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const validateForm = () => {
        if (!username || !password || !firstname || !lastname || !email) {
            setError('Please fill in all fields');
            return false;
        }
        setError('');
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);

        const formData = JSON.stringify({
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email
        });

        try {
            const response = await fetch('http://localhost:8000/auth/register', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: formData
            });
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            navigate('/go-to-email');            
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <h2 className="fw-bold mb-2 text-center">Register</h2>
            <p className="text-black-50 mb-3 text-center my-3">
                Please fill in all fields to register
            </p>
            <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Firstname' 
                id='formControlLgFirstName' 
                type='text' 
                size="lg"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Lastname' 
                id='formControlLgLastName' 
                type='text' 
                size="lg"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
            />
            <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Email' 
                id='formControlLgEmail' 
                type='email' 
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Username' 
                id='formControlLgUserName' 
                type='text' 
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput 
                wrapperClass='mb-4 w-100' 
                label='Password' 
                id='formControlLgPassword' 
                type='password' 
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
            <p className="text-center my-3">Have you account? <MDBBtn className='mx-2' color='link' rippleColor='light' onClick={handleLogin}>Login</MDBBtn></p>
            <hr className="" />
            <MDBBtn size='lg' onClick={handleSubmit}>
                Register
            </MDBBtn>
            <hr className="my-4" />
            <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Register with Google
            </MDBBtn>
            <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                <MDBIcon fab icon="facebook-f" className="mx-2"/>
                Register with Facebook
            </MDBBtn> 
        </>
    )
}

export default Register;