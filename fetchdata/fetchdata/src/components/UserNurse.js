import React, { useState, useEffect } from 'react';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
} from 'mdb-react-ui-kit';




const UserNurse = () => {
  const [nurse, setNurse] = useState([]);

  useEffect(() => {

    getNurse();
  }, []);

  const getNurse = async () => {
    try {
      var id = localStorage.getItem('Id');
      const response = await fetch(`https://localhost:7275/api/Nurse/GetPatId?id=${id}`);
      const data = await response.json();
      setNurse(data);

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Nurse Table</h3>

      {/* <Table striped bordered responsive>
        <thead>
          <tr>
            <td>Sr No</td>
            <td>Name</td>
            <td>Gender</td>
            <td>Mobile</td>
            <td>Email</td>
            <td>Patient Name</td>
            <td>Device Name</td>
            <td>result</td>

          </tr>
        </thead>
        <tbody>

          <tr>
            <td>{nurse.id}</td>
            <td>{nurse.name}</td>
            <td>{nurse.gender}</td>
            <td>{nurse.mobile}</td>
            <td>{nurse.email}</td>
            <td>{nurse.patientName}</td>
            <td>{nurse.deviceName}</td>
            <td>{nurse.result}</td>
          </tr>

        </tbody>
      </Table> */}
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding:"10px"}}>
          <div className="col" key={nurse.id}>
            <MDBCard style={{border: "1px solid #ccc",boxShadow :"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
            <MDBCardHeader>
          <h5 className="my-0 font-weight-normal">Nurse NO: {nurse.id}</h5>
        </MDBCardHeader>
              <MDBCardBody style={{padding: "1rem"}}>
                <MDBCardTitle style={{fontWeight:"bold" ,fontSize: "1.2rem"}}>{nurse.name}</MDBCardTitle>
                <MDBCardText>
                  <b>Mobile</b>: {nurse.mobile} <br />
                  <b>Assigned Patient</b>: {nurse.patientName} <br />
                  <b>Assigned Device</b>: {nurse.deviceName} <br />
                  <b>Email</b>: {nurse.email} <br />
                  <b>Result</b>: {nurse.result} <br />
                  <b>Status</b>: {nurse.status} <br />
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </div>
      </div>
      <br></br><br></br>
    </div>
  )
}

export default UserNurse
