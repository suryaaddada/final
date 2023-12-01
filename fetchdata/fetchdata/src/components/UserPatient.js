
import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';



const UserPatient = () => {
  const [patient, setPatient] = useState([]);
  const [firstname, setfirstname] = useState("");
 
  const [mobile, setmobile] = useState("");
 
  const [email, setemail] = useState("");
  const [userId, setuserid] = useState(null);
  const [formOpen, setformopen] = useState(false);
  const[dob,setdob] = useState("");
  const[date,setdate] = useState("");
  
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var email = localStorage.getItem('email');
    const response = await fetch(`https://localhost:7275/api/Patient/GetData?email=${email}`);
    const jsonData = await response.json();
    setPatient(jsonData);


  };
  console.log(patient.id);
  localStorage.setItem('Id', patient.id);

  
  function UpdatePatient(id) {
    try {
      
   
      setfirstname(patient.firstname)
      setmobile(patient.mobile)
      setemail(patient.email)
      setdob(patient.dob)
      setdate(patient.date)
      setuserid(patient.id)
      setformopen(true);
     
     
    }
    catch (error) {
      console.log(error);
    }

  }



  function Update() {
    try {
      console.log({firstname, dob,mobile,date, email})
      let item = {userId, firstname,dob,  mobile,date, email }
      fetch(`https://localhost:7275/api/Patient/UpdatePatient/${userId}?Firstname=${firstname}&dob =${dob}&mobile=${mobile}&date=${date}&email=${email}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then((result) => {

          fetchData();
        })
       
    }
    catch (error) {
      console.log(error);
    }
    setformopen(false);
  
  }
  const closeForm = () =>{
   
    setformopen(false);
  }
  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Patient Table</h3>

      {/* <Table striped bordered>
        <thead>
          <tr>
            <td>Sr No</td>
            <td>Password</td>
            <td>Name</td>
            <td>Mobile</td>
            <td>Date</td>
            <td>Email</td>
            <td>Action</td>


          </tr>
        </thead>
        <tbody>


          <td>{patient.id}</td>
          <td>{patient.password}</td>
          <td>{patient.firstname}</td>
          <td>{patient.mobile}</td>
         <td>{formatDate(patient.date)}</td>
          <td>{patient.email}</td>
          <td>
              <button className='btn btn-warning' onClick={() => UpdatePatient(patient.id)}>Update</button>
              </td>


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
                <MDBCardFooter>
                <button className='btn btn-warning' onClick={() => UpdatePatient(patient.id)}>Update</button>
                </MDBCardFooter>
              </MDBCardBody>
            </MDBCard>
          </div>
      </div>
      <br></br><br></br>

   {formOpen && (
        <div className='formContainer'>
           {formOpen ? <i class="fa fa-window-close" aria-hidden="true" onClick={closeForm}style={{fontSize:"20px",marginLeft:"96vw",color:"red",position:"absolute",top:"44vh"}}></i> : ""}
          <input type="text" value={firstname} placeholder="firstname" onChange={(e) => setfirstname(e.target.value)}></input><br /><br />
         
          <input type="text" value={dob} placeholder="dob" onChange={(e) => setdob(e.target.value)}></input><br /><br />
          
          <input type="number" value={mobile} placeholder="mobile" onChange={(e) => setmobile(e.target.value)}></input><br /><br />
          <input type="text" value={date} placeholder="date" onChange={(e) => setdate(e.target.value)}></input><br /><br />
         
          <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)}></input><br /><br />
          <button type="submit" onClick={Update} >Update Data</button>

        </div>
      )}

    </div>
  )
}

export default UserPatient
