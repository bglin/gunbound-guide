import React, { useState,useEffect } from 'react';
import Navigation from './header';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";
import {Container,Image,Figure,Row,Col,Button,Jumbotron,Dropdown,DropdownButton,Table,Toast,Spinner,ToggleButton,Alert} from 'react-bootstrap';
import dual from './images/dual.png'
import mobiles from './data'


function DelayPage() {
  const [delayData,setDelayData] = useState({});
  const [currentPlayer,setPlayer] = useState();
  const [mobileA,setA] = useState();
  const [mobileB,setB] = useState();
  const [delayA,setDelayA] = useState(0);
  const [delayB,setDelayB] = useState(0);
  const [itemCountA,setItemCountA] = useState(3);
  const [itemClickA,setItemClickA] = useState(false);
  const [itemCountB,setItemCountB] = useState(3);
  const [itemClickB,setItemClickB] = useState(false);
  const [shotValueA, setshotValueA] = useState('1');
  const [shotValueB, setshotValueB] = useState('1');
  const [shotTimeA, setShotTimeA] = useState(0);
  const [shotTimeB, setShotTimeB] = useState(0);
  const [showAlert,setAlert] = useState(false);
  const [turnCounter,setTurn] = useState(0);
  const [ssLockedA,setSpecialA] = useState(false);
  const [ssLockedB,setSpecialB] = useState(false);


  const shotRef = {
    '1':"shot1",
    '2':"shot2",
    '3':"ss"
  };

  const shotTypes =
  [{ name: '1', value: '1' ,variant:"primary",index:"shot1"},
  { name: '2', value: '2',variant:"primary",index:"shot2" },
  { name: 'SS', value: '3' ,variant:"warning",index:"ss"}
  ];

  useEffect(() => {
    fetch('/api/mobile-info').then(res => res.json()).then(mobiles => {
    setDelayData(mobiles.data)
  });
  },[]);


  function initMatch() {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({"mobileA": mobileA , "mobileB": mobileB } )
    };
    fetch('/api/match',requestOptions).then((res)=>res.json()).then((data) => {
    setPlayer(data.currentPlayer);
    setTurn(data.turnCounter);
  })
    setAlert(true);
  };

  function handleReset() {
    fetch('/api/reset').then((res)=>res.json()).then((data) => {
    setPlayer(data.currentPlayer)
    setA(data.mobileA)
    setB(data.mobileB)
    setShotTimeA(0)
    setShotTimeB(0)
    setshotValueA('1')
    setshotValueB('1')
    setItemCountA(3)
    setItemCountB(3)
    setDelayA(0)
    setDelayB(0)
    setTurn(0)
    setSpecialA(false)
    setSpecialB(false)
  })
  };

  function handleSubmitA() {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({"mobileA":mobileA,"mobileB":mobileB,"currentPlayer": currentPlayer, "shot_type": shotRef[shotValueA],"secs_to_shoot": shotTimeA,"item":itemClickA})
    }
    console.log(ssLockedA)
    fetch('api/match/update',requestOptions).then((res)=>res.json()).then((data) => {
    setPlayer(data.currentPlayer)
    setDelayA(data.delay1)
    setDelayB(data.delay2)
    setTurn(data.turnCounter)
    setSpecialA(data.ssLockedA)
    setSpecialB(data.ssLockedB)

    if (shotValueA==='3') {
      setshotValueA('1')
    }
    console.log(ssLockedA)
  })

    // reset item boolean
    setItemClickA(false);

    // start counter if SS was shot
  };

  function handleSubmitB() {
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({"mobileA":mobileA,"mobileB":mobileB,"currentPlayer": currentPlayer,  "shot_type": shotRef[shotValueB],"secs_to_shoot": shotTimeB,"item": itemClickB})
    }
    fetch('/api/match/update',requestOptions).then((res)=>res.json()).then((data) => {
    setPlayer(data.currentPlayer)
    setDelayA(data.delay1)
    setDelayB(data.delay2)
    setTurn(data.turnCounter)
    setSpecialB(data.ssLockedB)
    setSpecialA(data.ssLockedA)
    console.log("hi")
    console.log(ssLockedB)
    if (shotValueB==='3') {
      setshotValueB('1')
    }
  })

    // reset item boolean
    setItemClickB(false);

    // start counter if SS was shot
  };

  function findMobileB(e) {
    return (e.name===mobileB)
  };

  function findMobileA(e) {
    return (e.name===mobileA)
  };

  function toggleItemA() {
    setItemCountA(itemCountA-1);
    setItemClickA(true);
  };

  function toggleItemB() {
    setItemCountB(itemCountB-1);
    setItemClickB(true);
  };

  return (
    <div className="App">
      <Navigation />
      <div className="DelayPage">
        <Container>
          <Alert show={showAlert} variant="success" onClose={() => setAlert(false)} dismissible>
                The match has successfully started!
          </Alert>

        <Row>

          <Col>
            <h1 className="delay-text">Side A</h1>

            <Jumbotron style={{backgroundColor:"#1c1f24"}}>
            <h1><span className="delay-text">{delayA}</span></h1>

                {(mobileB && mobileA) ?
                  <DropdownButton id="dropdown-1" title={mobileA ? mobileA : "Choose Mobile"}disabled>
                  {mobiles.map((mobile,idx) => (
                    <Dropdown.Item key={idx} as="button" onClick={() =>setA(mobile.name)}>{mobile.name}</Dropdown.Item>

                ))}
                </DropdownButton> :
                <DropdownButton id="dropdown-1" title={mobileA ? mobileA : "Choose Mobile"}>
                {mobiles.map((mobile,idx) => (
                  <Dropdown.Item key={idx} as="button" onClick={() =>setA(mobile.name)}>{mobile.name}</Dropdown.Item>

              ))}
              </DropdownButton>
                }


            {mobileA ?
            <Figure>
              <Figure.Image
                width={110}
                height={120}
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
              {shotTypes.map((data,idx) => (
                  <Col key={idx}>
                      <ToggleButton
                      type="radio"
                      variant={data.variant}
                      value={data.value}
                      checked={shotValueA===data.value}
                      onChange={(e) => setshotValueA(e.currentTarget.value)}
                      disabled={(data.value ==='3' && (turnCounter <= 3 || ssLockedA===true)) ? true : false}>
                      <br/>
                      {data.name}
                      <br/>
                      {mobileA ? <span style= {{fontSize: "10px"}}>+{delayData[mobileA][data.index]}</span>:<></>}
                      </ToggleButton>
                  </Col>
              ))}
               </Row>

              <br/>

              {/* Dual Item Buttons */}
              <Row><Col>{itemCountA} left</Col></Row>
              <Row>
                  <Col>
                  {itemCountA === 0 || itemClickA===true || shotValueA==='3' ?
                  <Button variant="danger" disabled>
                  <h6>+600</h6>
                    <Image src={dual} rounded/>
                  </Button> :

                  <Button variant="danger" onClick={toggleItemA}>
                  <h6>{mobileA==="Armor" ? <>+640</>: <>+600</>}</h6>
                    <Image src={dual} rounded/>
                  </Button>
                }
                  </Col>


              </Row>

              <br />

              {/* Seconds input */}
              <InputRange
              name="A"
              step={.5}
              maxValue={20}
              value={shotTimeA}
              onChange={value => setShotTimeA(value)} />
              <h6>Time to Shoot (seconds)</h6>

              <br />
              {/* Submit button*/}
              <Row>
              <br />
                <Col>
                </Col>
                <Col>
                {currentPlayer==="mobileA" ? <Button variant="success" onClick={handleSubmitA}>Submit</Button>
                : <Button variant="success" disabled>Submit</Button>}
                </Col>
                <Col>
                {currentPlayer==='mobileA' ?<Spinner animation="grow" variant="danger"/>: <></>}
                </Col>
              </Row>
          </Jumbotron>
          </Col>

          {/* VS Column */}
          <Col>
          <h1 className="delay-text">VS</h1>
          {(mobileB && mobileA) ? <Button variant="success" size="lg" onClick={initMatch}>Start</Button>:<Button variant="success" size="lg" disabled>Start</Button>}
          <Button   variant="secondary" size="lg" onClick={handleReset}>Reset</Button>

          {/*<br />
          <br />*/}

           {/*Notification Window */}

           {/*
          <Toast
          style={{
          backgroundColor:"#e2ecff"}}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Shot Tip: {mobileA}</strong>
              <small>Turn 4</small>
            </Toast.Header>
            <Toast.Body style={{color:"#1c1f24"}}>Fire Shot 1 in 5 seconds and you'll get to go again!</Toast.Body>
          </Toast>*/}

          <br />
          <br />
          {/*Turn Counter*/}
          {turnCounter > 0 ? <h2>Turn {Math.round(turnCounter)}</h2>:<></>}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {delayA < delayB ?
              <>
                <tr>
                <td><b>{mobileA}</b></td>
                <td><b>{delayA}</b></td>
                </tr>
                <tr>
                <td>{mobileB}</td>
                <td>+{delayB}</td>
                </tr>
              </>
              :
              <>
                <tr>
                <td><b>{mobileB}</b></td>
                <td><b>{delayB}</b></td>
                </tr>
                <tr>
                <td>{mobileA}</td>
                <td>{delayA}</td>
                </tr>
              </>
            }

            </tbody>
          </Table>
          </Col>

          {/* Side B Column */}

          <Col>
          <h1 className="delay-text">Side B</h1>

          <Jumbotron style={{backgroundColor:"#1c1f24"}}>
          <h1><span className="delay-text">{delayB}</span></h1>

          {(mobileB && mobileA) ?
            <DropdownButton id="dropdown-1" title={mobileB ? mobileB : "Choose Mobile"}disabled>
            {mobiles.map((mobile,idx) => (
              <Dropdown.Item key={idx} as="button" onClick={() =>setB(mobile.name)}>{mobile.name}</Dropdown.Item>

          ))}
          </DropdownButton> :
          <DropdownButton id="dropdown-1" title={mobileB ? mobileB : "Choose Mobile"}>
          {mobiles.map((mobile,idx) => (
            <Dropdown.Item key={idx} as="button" onClick={() =>setB(mobile.name)}>{mobile.name}</Dropdown.Item>

        ))}
        </DropdownButton>
          }

          {mobileB ?
          <Figure>
            <Figure.Image
              width={110}
              height={120}
              alt="img"
              src={mobiles[mobiles.findIndex((e) => findMobileB(e))].img}
              rounded
            />
            <Figure.Caption>
            </Figure.Caption>
          </Figure> : <><br/></>
        }


          <Row md={3} sm={3} lg={3}>
          {shotTypes.map((data,idx) => (
              <Col key={idx}>
                  <ToggleButton
                  type="radio"
                  variant={data.variant}
                  value={data.value}
                  checked={shotValueB===data.value}
                  onChange={(e) => setshotValueB(e.currentTarget.value)}
                  disabled={(data.value ==='3'  && (turnCounter < 3 || ssLockedB===true)) ? true : false}>
                  <br/>
                  {data.name}
                  <br/>
                {mobileB ? <span style= {{fontSize: "10px"}}>+{delayData[mobileB][data.index]}</span>:<></>}
                  </ToggleButton>
              </Col>
          ))}
          </Row>

              <br/>
                {/* Side B Items*/}
                <Row><Col>{itemCountB} left</Col></Row>
                <Row>
                    <Col>
                    {itemCountB === 0 || itemClickB===true || shotValueB==='3' ?
                    <Button variant="danger" disabled>
                    <h6>{mobileB==="Armor" ? <>+640</>: <>+600</>}</h6>
                      <Image src={dual} rounded/>
                    </Button> :

                    <Button variant="danger" onClick={toggleItemB}>
                    <h6>+600</h6>
                      <Image src={dual} rounded/>
                    </Button>
                  }
                    </Col>


                </Row>

          <br />
          {/*Side B Time Input*/}
          <InputRange
          step={.5}
          maxValue={20}
          value={shotTimeB}
          onChange={value => setShotTimeB(value)} />
          <h6>Time to Shoot (seconds)</h6>


          <br />

          <Row>
          <br />
          <Col></Col>
          <Col>{currentPlayer==="mobileB" ? <Button variant="success" onClick={handleSubmitB}>Submit</Button>: <Button variant="success" disabled>Submit</Button>}</Col>
          <Col>
          {currentPlayer==='mobileB' ?<Spinner animation="grow" variant="danger" />: <></>}

          </Col>
          </Row>
          </Jumbotron>
          </Col>

        </Row>
        </Container>

        <Container>
        <h2 className="justify-content-center">Delay Reference</h2>
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
            {Object.keys(delayData).map((mobile,idx) => (
              <tr
              key={idx}>
              <td>{mobile}</td>
              <td>{delayData[mobile]["shot1"]}</td>
              <td>{delayData[mobile]["shot2"]}</td>
              <td>{delayData[mobile]["ss"]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Container>
      </div>
    </div>
  );
}

export default DelayPage;
