import React from 'react';
import {Link} from "react-router-dom";
import {Navbar,Button, Nav} from 'react-bootstrap';


function Navigation() {

  return(
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>Gunbound Quick Guide</Navbar.Brand>
    <Nav className="mr-auto">
    <Nav.Link> <Link to="/">Delay Simulator</Link></Nav.Link>
    <Nav.Link><Link to="/mobiles">Mobiles</Link></Nav.Link>
    </Nav>
  </Navbar>
)

};

export default Navigation;
