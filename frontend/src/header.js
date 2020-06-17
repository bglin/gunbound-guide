import React from 'react';
import {Link} from "react-router-dom";
import {Navbar,Button, Nav} from 'react-bootstrap';


function Navigation() {

  return(
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>Gunbound Quick Guide</Navbar.Brand>
    <Nav className="mr-auto">
    <Nav.Link> <Link to="/">Home</Link></Nav.Link>
    <Nav.Link><Link to="/delay-simulator">Delay Simulator</Link></Nav.Link>
    </Nav>
      <Button variant="outline-light">Search</Button>
  </Navbar>
)

};

export default Navigation;
