import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/Register.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Register (){
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'fullName') setFullName(value);
        if (name === 'phoneNumber') setPhoneNumber(value);
        if (name === 'dateOfBirth') setDateOfBirth(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'confirmPassword') setConfirmPassword(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();      
        
        if (!fullName || !phoneNumber || !email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log("ehehehe");
            alert('Please enter a valid email address');
            return;
        } else if (!/^\d{9}$/.test(phoneNumber)) {
            alert('Please enter a valid phone number');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }  

        const [year, month, day] = dateOfBirth.split('-').map(Number);

        if (year < 1900 || year > new Date().getFullYear() || month < 1 || month > 12 || day < 1 || day > 31) {
            alert('Please enter a valid date of birth');
            return;
        }

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: fullName,
                Email: email,
                Password: password,
                BirthDate: {year: year, month: month, day: day},
                PhoneNumber: phoneNumber
            }),
        }).then(data => {
            if (data.ok) {
                navigate('/');
            } else {
                alert('Registration failed');
                //setError(data.message || "Registration failed");
            }
        }).catch(error => {
            console.error('Error:', error);
            setError("Registration failed");
        });
    }


    return (
        <div className="d-flex justify-content-center align-items-center" >
        <div className="card p-4 shadow w-50">
            <h1 className='text-center mb-3'>Register</h1>
            <Form>
                <Form.Group controlId="formFullName" className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" name='fullName' value={fullName} onChange={handleChange} placeholder="Enter your full name" />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' value={email} onChange={handleChange} placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' value={password} onChange={handleChange} placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" name='confirmPassword' value={confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                </Form.Group>

                <Form.Group controlId="formDateOfBirth" className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" name='dateOfBirth' value={dateOfBirth} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formPhoneNumber" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="PhoneNumber" name='phoneNumber' value={phoneNumber} onChange={handleChange} placeholder="Enter your phone number" />
                </Form.Group>

                <Form.Group controlId="formTerms" className="mb-3">
                    <Form.Check type="checkbox" label="I agree to the terms and conditions" />
                </Form.Group>

                <Button variant="danger" type="submit" onClick={handleSubmit} className="w-100 mt-3">
                    Register
                </Button>
            </Form>
        </div>
    </div>
    );
};

export default Register;
