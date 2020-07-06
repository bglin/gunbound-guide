import React, {useState} from 'react';
import Navigation from './header'

import mobiles from './data';

import heart from './images/c_energy.png';
import power from './images/c_power.png';
import shield from './images/c_protection.png';
import wheels from './images/c_mobility.png';
import skull from './images/deco_05.png';
import arrow from './images/deco_02.png';

import hyper10 from './images/random-1.png'


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Container,Image,Figure,Row,Col,Button,Modal,Navbar,Nav,Jumbotron} from 'react-bootstrap';
import {Link} from "react-router-dom";




function MobilesPage() {

  const [show, setShow] = useState(false);
  const [currentMobile, setMobile] = useState({"name": "","img":"","desc":``,"mobile_type":"","shot_type":"", "stats":{"energy":0,"attack":0,"defense":0,"mobility":0},"natural_enemies":[]});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function openDetails(mobile) {
    setShow(true);
    setMobile(mobile);
    console.log(currentMobile)
  };

  return (
    <div className="App">
    <Navigation />


    <div className="Content">
      <h1>Mobiles</h1>
      <br />
      <Row>
      {mobiles.slice(0,4).map((mobile,idx) =>(
            <Col
            key = {idx}>
            <Button variant="light" onClick={() => openDetails(mobile)}>
              <Figure>
                <Figure.Image
                  width={150}
                  height={160}
                  alt="img"
                  src={mobile.img}
                  rounded
                />
                <Figure.Caption>
                <h4>
                  {mobile.name}
                </h4>
                </Figure.Caption>
              </Figure>
            </Button>
            </Col>
      ))}
      </Row>
  <br />
      <Row>
        {mobiles.slice(4,8).map((mobile,idx) =>(
        <Col
        key = {idx}>
        <Button variant="light" onClick={() => openDetails(mobile)}>
          <Figure>
            <Figure.Image
              width={151}
              height={160}
              alt="171x180"
              src={mobile.img}
              rounded
            />
            <Figure.Caption>
            <h4>
              {mobile.name}
            </h4>
            </Figure.Caption>
          </Figure>
        </Button>
        </Col>
        ))}
     </Row>
     <br/>

     <Row>
     {mobiles.slice(8,12).map((mobile,idx) =>(
           <Col
           key = {idx}>
           <Button variant="light" onClick={() => openDetails(mobile)}>
             <Figure>
               <Figure.Image
                 width={151}
                 height={160}
                 alt="hello"
                 src={mobile.img}
                 rounded
               />
               <Figure.Caption>
               <h4>
                 {mobile.name}
               </h4>
               </Figure.Caption>
             </Figure>
           </Button>
           </Col>
     ))}
     </Row>
     <br/>
     <Row>
     {mobiles.slice(12,16).map((mobile,idx) =>(
           <Col
           key = {idx}>
           <Button variant="light" onClick={() => openDetails(mobile)}>
             <Figure>
               <Figure.Image
                 width={150}
                 height={160}
                 alt="img"
                 src={mobile.img}
                 rounded
               />
               <Figure.Caption>
               <h4>
                 {mobile.name}
               </h4>
               </Figure.Caption>
             </Figure>
           </Button>
           </Col>
     ))}
     </Row>
  </div>

  <Modal
  size="lg"
  show={show}
  onHide={handleClose}
  centered>
        <Modal.Body>
        <Row>
          <Col md={4}>
          <h1 style = {{color:""}}> {currentMobile.name}</h1>
          <Image src= {currentMobile.img}/>
          <br />
          <br />
          <h6> Mobile Type: {currentMobile.mobile_type}</h6>
          <h6> Shot Type: {currentMobile.shot_type}</h6>
          </Col>
        </Row>

        <br/>
        <h5>Overview</h5>
        <hr />
        <Row xs={4} md={4} lg={4}>
          <Col>
            <h6>
            <b><Image src={arrow}/> Attack: </b>
            {Array(currentMobile.stats.attack).fill(1).map((data,idx) =>(
              <Image
              key={idx}
              src={power}/>
            ))}
          </h6>
          <h6>
            <b><Image src={arrow}/> Defense: </b>
            {Array(currentMobile.stats.defense).fill(1).map((data,idx) =>(
              <Image
              key={idx}
              src={shield}/>
            ))}
          </h6>
          </Col>
          <Col>
          <h6>
          <b><Image src={arrow}/> Energy: </b>
          {Array(currentMobile.stats.energy).fill(1).map((data,idx) =>(
            <Image
            key={idx}
            src={heart}/>
          ))}
          </h6>

          <h6>
          <b><Image src={arrow}/> Mobility:</b>
          {Array(currentMobile.stats.mobility).fill(1).map((data,idx) =>(
            <Image
            key={idx}
            src={wheels}/>
          ))}
          </h6>
          </Col>
        </Row>
        <br />
        <p> {currentMobile.desc}</p>

        <h5>Natural Enemies</h5>
        <hr/>
        <h6> <Image src={arrow}/> Mobiles that have 5-10% of advantage in attack and defense against {currentMobile.name}.</h6>
        <h6><Image src={arrow}/> Effective: <Image src={skull}/> Very Effective: <><Image src={skull}/><Image src={skull}/></></h6>
        <br/>
        <Container>
        <Row>
          {currentMobile.natural_enemies.map((enemy,idx) =>(
          <Col
            key = {idx}>
            <Row>
            {enemy.effect===1 ? <Image src={skull}/> :
            <>
            <Image src={skull}/>
            <Image src={skull}/>
            </>}
            </Row>

            <Row>
              <Figure>
              <Figure.Image
                width={70}
                height={80}
                alt="171x180"
                src={enemy.img}
              />
              </Figure>
            </Row>
          </Col>
          ))}
          </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
  </div>
  );
};


export default MobilesPage;
