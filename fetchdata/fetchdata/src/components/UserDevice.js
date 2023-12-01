import React, { useState, useEffect } from 'react'

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,

} from 'mdb-react-ui-kit';


const UserDevice = () => {

  const [device, setDevice] = useState([]);
  useEffect(() => {
    getDeviceList();
  }, []);

  const getDeviceList = async () => {
    try {
      var id = localStorage.getItem('Id');
      const response = await fetch(`https://localhost:7275/api/Device/GetPatId1?id=${id}`);
      const data = await response.json();
      console.log(data);
      setDevice(data);



    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Device Table</h3>

      {/* <Table striped bordered responsive>
        <thead>
          <tr>
            <td>Sr No</td>
            <td>Name</td>
            <td>Patient Email</td>
           
          

          </tr>
        </thead>
        <tbody>
          <tr>

            <td>{device.id}</td>
            <td>{device.name}</td>
            <td>{device.patientEmail}</td>
          
            
          </tr>

        </tbody>
      </Table> */}
       <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding:"10px"}}>
       
       <div className="col" key={device.id}>
      <MDBCard key={device.id} className="device-card" style={{border: "1px solid #ccc",boxShadow :"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
          <MDBCardHeader>

          <h5 className="my-0 font-weight-normal">Device NO: {device.id}</h5>
          </MDBCardHeader>
     
   
        <MDBCardBody style={{padding: "1rem"}}>
        <MDBCardTitle style={{fontWeight:"bold" ,fontSize: "1.2rem"}}>{device.name}</MDBCardTitle>
          <MDBCardText>
            <strong>Patient Email:</strong> {device.patientEmail}<br />
            <strong>Status:</strong> {device.status}
          </MDBCardText>
          
         
          </MDBCardBody>
      </MDBCard>
      </div>

   
  </div>



    </div>
  )
}

export default UserDevice
