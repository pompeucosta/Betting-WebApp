import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Sidenav = ({ searchTerm, onSearchTermChange }) => {
    return (
        <div className="sidenav">
            <Form>
                <Form.Group controlId="formBasicSearch" className="mb-3">
                    <Form.Control 
                        type="search" 
                        placeholder="Search" 
                        value={searchTerm} 
                        onChange={e => onSearchTermChange(e.target.value)} 
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

export default Sidenav