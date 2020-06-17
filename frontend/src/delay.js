import React, { useState } from 'react';
import Navigation from './header'
import {Container,Image,Figure,Row,Col,Button,Jumbotron,Dropdown,DropdownButton,Table,Toast,InputGroup,FormControl,Spinner,ToggleButton} from 'react-bootstrap';
import hyper10 from './images/random-1.png'
import dual from './images/dual.png'
import mobiles from './data'


function DelayPage() {
  const [currentPlayer,setPlayer] = useState();
  const [mobileA,setA] = useState();
  const [mobileB,setB] = useState();
  const [itemValue,setItem] = useState([]);
  const [shotValueA, setshotValueA] = useState('1');
  const [shotValueB, setshotValueB] = useState('1');

  const shotRef = {
    1:"shot1",
    2:"shot2",
    3:"ss"
  };

  function findMobileB(e) {
    return (e.name===mobileB)
  };

  function findMobileA(e) {
    return (e.name===mobileA)
  };

  function toggleItem(val) {
    setItem(val)
  };

  function handleSubmitA() {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({"currentPlayer": currentPlayer,  "shot_type": shotRef["shotValueA"],"secs_to_shoot": 10,"item": 1} )
    }
    fetch('api/',requestOptions)
  };

  function handleSubmitB() {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({"currentPlayer": currentPlayer,  "shot_type": shotRef["shotValueB"],"secs_to_shoot": 10,"item": 1} )
    }
    fetch('api/',requestOptions)
  };

  function initMatch() {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({"mobileA": mobileA , "mobileB": mobileB } )
    };
    fetch('api',requestOptions).then((res)=>res.json()).then((data) => setPlayer(data.currentPlayer))
  };

  return (
    <div className="App">
      <Navigation />
      <div className="DelayPage">

        <Container>
        <Row>
        {currentPlayer==='mobileA' ?<Spinner animation="grow" variant="danger" />: <></>}

          <Col>
            <h1 className="delay-text">Side A</h1>

            <Jumbotron style={{backgroundColor:"#1c1f24"}}>
              <h1><span className="delay-text">0</span></h1>
                <DropdownButton id="dropdown-1" title={mobileA ? mobileA : "Choose Mobile"}>
                  {mobiles.map((mobile) => {
                    return(
                    <>
                    <Dropdown.Item key={mobile.name} as="button" onClick={() =>setA(mobile.name)}>{mobile.name}</Dropdown.Item>
                    </>
                  )}
                )}
                </DropdownButton>


            {mobileA ?
            <Figure>
              <Figure.Image
                width={150}
                height={160}
                alt="img"
                src={mobiles[mobiles.findIndex((e) => findMobileA(e))].img}
                rounded
              />
              <Figure.Caption>
              </Figure.Caption>
            </Figure> : <><br/></>
          }

              {/* Shot Type ToggleButton */}
              <Row md={3} sm={3} lg={3}>
              {[{ name: '1', value: '1' ,variant:"primary"},
              { name: '2', value: '2',variant:"primary" },
              { name: 'SS', value: '3' ,variant:"warning"}].map((data,idx) => (
                  <Col>
                      <ToggleButton
                      key={idx}
                      type="radio"
                      variant={data.variant}
                      value={data.value}
                      checked={shotValueA===data.value}
                      onChange={(e) => setshotValueA(e.currentTarget.value)}>
                      <br/>
                      {data.name}
                      <br/>
                      <span style= {{fontSize: "10px"}}>+770</span>
                      </ToggleButton>
                  </Col>
              ))}
              </Row>

              <br/>

              {/* Dual Item Buttons */}
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

              {/* Seconds input */}
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
              {/* Submit button*/}
              <Row>
              <br />
                <Col></Col>
                <Col>{currentPlayer==="mobileA" ? <Button variant="success" onClick={handleSubmitA}>Submit</Button>: <Button variant="success" disabled>Submit</Button>}</Col>
                <Col></Col>
              </Row>
          </Jumbotron>
          </Col>

          {/* VS Column */}
          <Col>
          <h1 className="delay-text">VS</h1>
          {(mobileB && mobileA) ? <Button variant="success" size="lg" onClick={initMatch}>Start</Button>:<Button variant="success" size="lg" disabled>Start</Button>}
          <Button variant="secondary" size="lg">Reset</Button>

          <br />
          <br />
           {/*Notification Window */}
          <Toast
          style={{
          backgroundColor:"#e2ecff"}}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Shot Tip: {mobileA}</strong>
              <small>Turn 4</small>
            </Toast.Header>
            <Toast.Body style={{color:"#1c1f24"}}>Fire Shot 1 in 5 seconds and you'll get to go again!</Toast.Body>
          </Toast>
          </Col>

          {/* Side B Column */}

          {currentPlayer==='mobileB' ?<Spinner animation="grow" variant="danger" />: <></>}
          <Col>
          <h1 className="delay-text">Side B</h1>

          <Jumbotron style={{backgroundColor:"#1c1f24"}}>
          <h1><span className="delay-text">0</span></h1>

          <DropdownButton id="dropdown-2" title={mobileB ? mobileB : "Choose Mobile"}>
            {mobiles.map((mobile,idx) => {
              return(
              <>
              <Dropdown.Item key={idx} as="button" onClick={() =>setB(mobile.name)}>{mobile.name}</Dropdown.Item>
              </>
            )}
          )}
          </DropdownButton>

          {mobileB ?
          <Figure>
            <Figure.Image
              width={150}
              height={160}
              alt="img"
              src={mobiles[mobiles.findIndex((e) => findMobileB(e))].img}
              rounded
            />
            <Figure.Caption>
            </Figure.Caption>
          </Figure> : <><br/></>
        }


          <Row md={3} sm={3} lg={3}>
          {[{ name: '1', value: '1' ,variant:"primary"},
          { name: '2', value: '2',variant:"primary" },
          { name: 'SS', value: '3' ,variant:"warning"}].map((data,idx) => (
              <Col>
                  <ToggleButton
                  key={idx}
                  type="radio"
                  variant={data.variant}
                  value={data.value}
                  checked={shotValueB===data.value}
                  onChange={(e) => setshotValueB(e.currentTarget.value)}>
                  <br/>
                  {data.name}
                  <br/>
                  <span style= {{fontSize: "10px"}}>+770</span>
                  </ToggleButton>
              </Col>
          ))}
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
          <Col>{currentPlayer==="mobileB" ? <Button variant="success" onClick={handleSubmitB}>Submit</Button>: <Button variant="success" disabled>Submit</Button>}</Col>
          <Col></Col>
          </Row>
          </Jumbotron>
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

// function MobileCard(props) {
//
//   return (
//     <>
//     <Jumbotron style={{backgroundColor:"#1c1f24"}}>
//     <h1><span className="delay-text">0</span></h1>
//     {props.mobileA ?
//     <>
//     <DropdownButton id="dropdown-basic-button" title={props.mobileA==="None" ? "Choose Mobile": props.mobileA}>
//       {mobiles.map((mobile,idx) => {
//         return(
//         <>
//         <Dropdown.Item key={idx} as="button" onClick={() =>props.setA(mobile.name)}>{mobile.name}</Dropdown.Item>
//         </>
//       )}
//     )}
//     </DropdownButton>
//     </> :
//     <>
//     <DropdownButton id="dropdown-basic-button" title={props.mobileB==="None" ? "Choose Mobile": props.mobileB}>
//       {mobiles.map((mobile,idx) => {
//         return(
//         <>
//         <Dropdown.Item key={idx} as="button" onClick={() =>props.setB(mobile.name)}>{mobile.name}</Dropdown.Item>
//         </>
//       )}
//     )}
//     </DropdownButton>
//     </>}
//
//     <Figure>
//       <Figure.Image
//         width={150}
//         height={160}
//         alt="img"
//         src={mobiles[0].img}
//         rounded
//       />
//       <Figure.Caption>
//       </Figure.Caption>
//     </Figure>
//
//
//     <Row md={3} sm={3} lg={3}>
//         <Col>
//             <Button variant="primary">
//             1
//             <br/>
//             <span style= {{fontSize: "10px"}}>+770</span>
//             </Button>
//         </Col>
//
//         <Col>
//             <Button variant="primary">2
//             <br/>
//             <span style= {{fontSize: "10px"}}>+960</span>
//             </Button>
//         </Col>
//
//         <Col>
//             <Button variant="warning">
//             SS
//             <br/>
//             <span style= {{fontSize: "10px"}}>+1320</span>
//             </Button>
//         </Col>
//     </Row>
//
//         <br/>
//         <Row>
//           {[0,1,2].map((data,idx) => {
//             return(
//             <>
//             <Col
//             key={idx}>
//             <Button variant="danger">
//             <h6>+600</h6>
//               <Image src={dual} rounded/>
//             </Button>
//             </Col>
//             </>
//           )}
//         )}
//         </Row>
//
//     <br />
//
//     <Row>
//       <InputGroup>
//         <FormControl
//           placeholder="Max 20 seconds"
//           aria-label="time"
//           aria-describedby="basic-addon2"
//         />
//         <InputGroup.Text>seconds</InputGroup.Text>
//     </InputGroup>
//     </Row>
//
//     <br />
//
//     <Row>
//     <br />
//     <Col></Col>
//     <Col><Button variant="success">Submit</Button></Col>
//     <Col></Col>
//     </Row>
//     </Jumbotron>
//     </>
//   )
// };

export default DelayPage;
