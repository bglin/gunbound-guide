import React, { useState } from 'react';
import Navigation from './header'
import {Container,Image,Figure,Row,Col,Button,ButtonToolbar,ButtonGroup,Jumbotron,Dropdown,DropdownButton,Table,Toast,Card,InputGroup,FormControl,Spinner} from 'react-bootstrap';
import hyper10 from './images/random-1.png'
import dual from './images/dual.png'
import mobiles from './data'


function MobileCard() {

  return (
    <>
    <Jumbotron style={{backgroundColor:"#1c1f24"}}>
    <h1><span className="delay-text">0</span></h1>

    <DropdownButton id="dropdown-basic-button" title="Choose Mobile">
      {mobiles.map((mobile,idx) => {
        return(
        <>
        <Dropdown.Item key={idx}>{mobile.name}</Dropdown.Item>
        </>
      )}
    )}
    </DropdownButton>

    <Figure>
      <Figure.Image
        width={150}
        height={160}
        alt="img"
        src={mobiles[0].img}
        rounded
      />
      <Figure.Caption>
      </Figure.Caption>
    </Figure>


    <Row md={3} sm={3} lg={3}>
        <Col>
            <Button variant="primary">
            1
            <br/>
            <span style= {{fontSize: "10px"}}>+770</span>
            </Button>
        </Col>

        <Col>
            <Button variant="primary">2
            <br/>
            <span style= {{fontSize: "10px"}}>+960</span>
            </Button>
        </Col>

        <Col>
            <Button variant="warning">
            SS
            <br/>
            <span style= {{fontSize: "10px"}}>+1320</span>
            </Button>
        </Col>
    </Row>

        <br/>
        <Row>
          {[0,1,2].map((data,idx) => {
            return(
            <>
            <Col
            key={idx}>
            <Button variant="danger">
            <h6>+600</h6>
              <Image src={dual} rounded/>
            </Button>
            </Col>
            </>
          )}
        )}
        </Row>

    <br />

    <Row>
      <InputGroup>
        <FormControl
          placeholder="Max 20 seconds"
          aria-label="time"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text>seconds</InputGroup.Text>
    </InputGroup>
    </Row>

    <br />

    <Row>
    <br />
    <Col></Col>
    <Col><Button variant="success">Submit</Button></Col>
    <Col></Col>
    </Row>
    </Jumbotron>
    </>
  )
};

function DelayPage() {
  const [currentPlayer,setPlayer] = useState("B");
  return (
    <div className="App">
      <Navigation />
      <div className="DelayPage">

        <Container>
        <Row>
        {currentPlayer==='A' ?<Spinner animation="grow" variant="danger" />: <></>}
          <Col>
          <h1 className="delay-text">Side A</h1>
            <MobileCard />
          </Col>

          <Col>
          <h1 className="delay-text">VS</h1>
          <Button variant="success" size="lg">Start</Button>
          <Button variant="secondary" size="lg">Reset</Button>
          <br />
          <br />
          <Toast
          style={{
          backgroundColor:"#e2ecff"}}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Shot Tip</strong>
              <small>Turn 4</small>
            </Toast.Header>
            <Toast.Body style={{color:"#1c1f24"}}>Fire Shot 1 in 5 seconds and you'll get to go again!</Toast.Body>
          </Toast>
          </Col>

          {currentPlayer==='B' ?<Spinner animation="grow" variant="danger" />: <></>}
          <Col>
          <h1 className="delay-text">Side B</h1>
            <MobileCard />
          </Col>

        </Row>
        </Container>

        <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Mobile</th>
              <th>Shot 1</th>
              <th>Shot 2</th>
              <th>SS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Armor</td>
              <td>111</td>
              <td>222</td>
              <td>333</td>
            </tr>
            <tr>
              <td>Mage</td>
              <td>111</td>
              <td>222</td>
              <td>333</td>
            </tr>
            <tr>
              <td>Aduka</td>
              <td>111</td>
              <td>222</td>
              <td>333</td>
            </tr>
          </tbody>
        </Table>
        </Container>
      </div>
    </div>
  );
}


export default DelayPage;
