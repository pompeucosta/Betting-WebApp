import React from 'react';
import { Form } from 'react-bootstrap';

const Sidenav = () => {
    return (
        <div className="sidenav">
            <Form>
                <Form.Group controlId="formBasicSearch">
                    <Form.Control type="search" placeholder="Search" />
                </Form.Group>
            </Form>
        </div>
    );
};

export default Sidenav;