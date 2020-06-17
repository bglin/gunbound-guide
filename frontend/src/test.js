import skull from './images/deco_05.png'

const a = {"img": skull}

export default a



// <Container>
//   <Row xs={8}>
//   <Col>
//   <h1 style = {{color:""}}> {currentMobile.name}</h1>
//   <Image src= {currentMobile.img}/>
//   </Col>
//
//   <Col xs={15}>
//
//   </Col>
//   </Row>
//   <Container>
//   <Row xs={8}>
//   <Col xs={15}>
//   <h6>
//   <b>Energy: </b>
//   {Array(currentMobile.stats.energy).fill(1).map((data,idx) =>(
//     <Image
//     key={idx}
//     src={heart}/>
//   ))}
//   </h6>
//   </Col>
//   <Col xs={15}>
//   <h6>
//   <b>Mobility:</b>
//   {Array(currentMobile.stats.mobility).fill(1).map((data,idx) =>(
//     <Image
//     key={idx}
//     src={wheels}/>
//   ))}
//   </h6>
//   </Col>
//   <Col>
//   <h6>
//   <b>Defense: </b>
//   {Array(currentMobile.stats.defense).fill(1).map((data,idx) =>(
//     <Image
//     key={idx}
//     src={shield}/>
//   ))}
//   </h6>
//   </Col>
//   </Row>
//   </Container>
// </Container>



// <h5>Stats</h5>
// <hr />
// <p>
// <b>Energy: </b>
// {Array(currentMobile.stats.energy).fill(1).map((data,idx) =>(
//   <Image
//   key={idx}
//   src={heart}/>
// ))}
// </p>
//
// <p>
// <b>Attack: </b>
// {Array(currentMobile.stats.attack).fill(1).map((data,idx) =>(
//   <Image
//   key={idx}
//   src={power}/>
// ))}
// </p>
//
//
// <p>
// <b>Mobility: </b>
// {Array(currentMobile.stats.mobility).fill(1).map((data,idx) =>(
//   <Image
//   key={idx}
//   src={wheels}/>
// ))}
// </p>
//
// <p>
// <b>Defense: </b>
// {Array(currentMobile.stats.defense).fill(1).map((data,idx) =>(
//   <Image
//   key={idx}
//   src={shield}/>
// ))}
// </p>
