import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';


const PatientCard = ({ id, firstname, mobile, date, email, deletePatient, updatePatient }) => {
  const json={id,firstname,mobile,date,email,deletePatient,updatePatient};
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const navigate=useNavigate();

  return (
    <div className="col-md-4 mb-6" style={{display:"inline-block",padding:"10px"}}>
     
     <MDBCard style={{border: "1px solid #ccc",boxShadow :"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
        <MDBCardHeader>
        <h5 className="my-0 font-weight-normal">PATIENT NO: {id}</h5>
        </MDBCardHeader>
        <button className='btn btn-warning' onClick={()=>navigate(`/update?data=${JSON.stringify(json)}`)}>
       <MDBCardBody style={{padding: "1rem"}}>
          <MDBCardTitle style={{fontWeight:"bold" ,fontSize: "1.2rem"}}>{firstname}</MDBCardTitle>
          <ul className="list-unstyled mt-3 mb-4">
            <li><b>Mobile</b>: {mobile}</li>
            <li><b>Date</b>: {formatDate(date)}</li>
            <li><b>Email</b>: {email}</li>
          </ul>


</MDBCardBody>
</button>
</MDBCard>

        </div>
    
     
  );
}

export default PatientCard;
