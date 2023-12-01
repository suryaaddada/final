import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
} from 'mdb-react-ui-kit';



const UserPatients = () => {
  const [patient, setPatient] = useState([]);
  // const formatDate = (dateString) => {
  //   const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var email = localStorage.getItem('email');
  console.log(email);
    const response = await fetch(`https://localhost:7275/api/Nurse/GetPatientByEmail?email=${email}`);
    const jsonData = await response.json();
    setPatient(jsonData);


  };
  console.log(patient.id);
  localStorage.setItem('Id', patient.id);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Patient Table</h3>

      {/* <Table striped bordered>
        <thead>
          <tr>
            <td>Sr No</td>
    
            <td>Name</td>
            <td>Mobile</td>
            <td>Date</td>
            <td>Email</td>


          </tr>
        </thead>
        <tbody>


          <td>{patient.id}</td>
          <td>{patient.firstname}</td>
          <td>{patient.mobile}</td>
          <td>{formatDate(patient.date)}</td>
          <td>{patient.email}</td>


        </tbody>
      </Table> */}
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding:"10px"}}>
          <div className="col" key={patient.id}>
            <MDBCard style={{border: "1px solid #ccc",boxShadow :"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
            <MDBCardHeader>
          <h5 className="my-0 font-weight-normal">Patient NO: {patient.id}</h5>
        </MDBCardHeader>
              <MDBCardBody style={{padding: "1rem"}}>
                <MDBCardTitle style={{fontWeight:"bold" ,fontSize: "1.2rem"}}>{patient.firstname}</MDBCardTitle>
                <MDBCardText>
                  <b>Mobile</b>: {patient.mobile} <br />
                  <b>Date</b>:{formatDate(patient.date)}<br/>
                  <b>Email</b>: {patient.email} <br />
                 
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </div>
      </div>


      <br></br><br></br>


    </div>
  )
}

export default UserPatients
