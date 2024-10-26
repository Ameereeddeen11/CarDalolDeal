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
import AuthMain from "../Components/Auth/AuthMain";

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
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    formData
                },
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
        <AuthMain title="Register" description="Please enter your login and password!" url="http://localhost:8000/auth/register" />
    )
}

export default Login;