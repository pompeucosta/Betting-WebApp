import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Sidenav = () => {
    return (
        <div className="sidenav">
            <Form>
                <Form.Group controlId="formBasicSearch" className="mb-3">
                    <Form.Control type="search" placeholder="Search" />
                </Form.Group>
            </Form>
        </div>
    )
}

export default Sidenav