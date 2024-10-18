import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  } from 'mdb-react-ui-kit';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !password) {
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

        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        try {
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            const result = await response.json();
            localStorage.setItem('access_token', result.access_token);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        // <div>
        //     <h1>Login</h1>
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             type="text"
        //             placeholder="Username"
        //             value={username}
        //             onChange={(e) => setUsername(e.target.value)}
        //         />
        //         <input
        //             type="password"
        //             placeholder="Password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //         <button type="submit" disabled={loading}>
        //             {loading ? 'Loading...' : 'Login'}
        //         </button>
        //         {error && <div>{error}</div>}
        //     </form>
        // </div>
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                <MDBCol col='12'>
                    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
                        <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                        <h2 className="fw-bold mb-2 text-center">Log in</h2>
                        <p className="text-white-50 mb-3">Please enter your login and password!</p>

                        <MDBInput 
                            wrapperClass='mb-4 w-100' 
                            label='Username' 
                            id='formControlLg' 
                            type='text' 
                            size="lg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <MDBInput 
                            wrapperClass='mb-4 w-100' 
                            label='Password' 
                            id='formControlLg' 
                            type='password' 
                            size="lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

                        <MDBBtn size='lg' onClick={handleSubmit}>
                            Login
                        </MDBBtn>

                        <hr className="my-4" />

                        <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                            <MDBIcon fab icon="google" className="mx-2"/>
                            Sign in with google
                        </MDBBtn>

                        <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                            <MDBIcon fab icon="facebook-f" className="mx-2"/>
                            Sign in with facebook
                        </MDBBtn>

                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Login;