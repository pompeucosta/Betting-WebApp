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
            <div className="d-grid gap-2 text-center">
                <h4>Top 5 Leagues</h4>
                <Button variant="outline-primary" className="mb-3">Premier League</Button>
                <Button variant="outline-primary" className="mb-3">La Liga</Button>
                <Button variant="outline-primary" className="mb-3">Serie A</Button>
                <Button variant="outline-primary" className="mb-3">Bundesliga</Button>
                <Button variant="outline-primary" className="mb-3">Ligue 1</Button>
            </div>
        </div>
    )
}

export default Sidenav