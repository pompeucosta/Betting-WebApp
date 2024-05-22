import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/Register.css';

const Register = () => {
    return (
        <div className="container-fluid bg-light vh-100 d-flex justify-content-center align-items-center" >
        <div className="card p-4 shadow w-50">
            <h1 className='text-center mb-3'>Register</h1>
            <Form>
                <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your first name" />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your last name" />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>

                <Form.Group controlId="formDateOfBirth" className="mb-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                <Form.Group controlId="formPhoneNumber" className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter your phone number" />
                </Form.Group>

                <Form.Group controlId="formTerms" className="mb-3">
                    <Form.Check type="checkbox" label="I agree to the terms and conditions" />
                </Form.Group>

                <Button variant="danger" type="submit" className="w-100 mt-3">
                    Register
                </Button>
            </Form>
        </div>
    </div>
    );
};

export default Register;
