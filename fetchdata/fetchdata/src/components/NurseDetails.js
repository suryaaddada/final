import React, { useState, useEffect } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import EmailForm from './EmailForm';
import './Update.css'
import { 
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';


const NurseDetail= () => {
  const [nurse, setNurse] = useState([]);
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [patientId, setpatientId] = useState("");
  const [deviceId, setdeviceId] = useState("");
  const [result, setresult] = useState("");
  const[status,setStatus] = useState("");
  const [userId, setuserid] = useState(null);
  const [formOpen, setformopen] = useState(false);
  const[isFormOpen,setIsFormOpen] = useState(false);  
  useEffect(() => {

    getNurse();
  }, []);

  const getNurse = async () => {
    try {
      var email = localStorage.getItem("email");
      const response = await fetch(`https://localhost:7275/api/Nurse/GetNurseByEmail?email=${email}`);
      const data = await response.json();
      setNurse(data);


    } catch (error) {
      console.log(error);
    }
  };

  function Updatenurse(id) {
    try {
      console.log(id);
      console.warn(nurse.id);
      setname(nurse.name);
      setmobile(nurse.mobile);
      setpatientId(nurse.patientId);
      setdeviceId(nurse.deviceId);
      setemail(nurse.email);
     setresult(nurse.result);
     setStatus(nurse.status);
     setuserid(nurse.id)
     setformopen(true);
    
    }
    catch (error) {
      console.log(error);
    }

  }

  function Update() {
    try {
      console.warn(name, mobile, email, patientId, deviceId);
      let item = { name, mobile, patientId, deviceId, email,result,status,userId}
      fetch(`https://localhost:7275/api/Nurse/UpdateNurse/${userId}?name=${name}&mobile=${mobile}&patientId=${patientId}&deviceId=${deviceId}&email=${email}&result=${result}&status=${status}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then((result) => {
           getNurse()
         
        })

      toast.success("Update Successfull");
    }
    catch (error) {
      console.log(error);
    }
    setformopen(false);
  }

  const openForm = () =>{
    setIsFormOpen(true);
  }
  
  const closeForm = () =>{
    setIsFormOpen(false);
    setformopen(false);
  }

  const renderStatusDropdown = () => {
    return (
      <select value={status} onChange={(e) => setStatus(e.target.value)} style={{width:"97vw", height:"5vh"}}> 
        <option value="Assigned">Assigned</option>
        <option value="Free">Free</option>
      </select>
    );
  }

  return (
    <div>
      <ToastContainer/>
      <h3 className="m-3 d-flex justify-content-center">Nurse Table</h3>

      {/* <Table striped bordered responsive>
        <thead>
          <tr>
            <td>Sr No</td>
            <td>Name</td>
            <td>Gender</td>
            <td>Mobile</td>
            <td>Email</td>
            <td>patient Name</td>
            <td>Device Name</td>
            <td>result</td>
            <td>status</td>
            <td>update</td>

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
            <td>{nurse.status}</td>
            <td>   <button className='btn btn-warning' onClick={() => Updatenurse(nurse.id)}>Update</button></td>
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
                <MDBCardFooter>
                <button className='btn btn-warning' onClick={() => Updatenurse(nurse.id)}>Update</button>
                </MDBCardFooter>
              </MDBCardBody>
            </MDBCard>
          </div>
      </div>
      <br></br><br></br>
      {formOpen && (
        <div className='formContainer'>
          {formOpen ? <i class="fa fa-window-close" aria-hidden="true" onClick={closeForm}style={{fontSize:"20px",marginLeft:"1820px",color:"red",position:"absolute",top:"47vh"}}></i> : ""}
          <input type="text" value={name} placeholder="name" onChange={(e) => setname(e.target.value)}></input><br /><br />
          <input type="number" value={mobile} placeholder="mobile" onChange={(e) => setmobile(e.target.value)}></input><br /><br />
          <input type="number" value={patientId} placeholder="patientId" onChange={(e) => setpatientId(e.target.value)}></input><br /><br />
          <input type="number" value={deviceId} placeholder="deviceId" onChange={(e) => setdeviceId(e.target.value)}></input><br /><br />
          <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)}></input><br /><br />
            <input type="text" value={result} placeholder="result" onChange={(e) => setresult(e.target.value)}></input><br /><br />
            {/* <input type="text" value={status} placeholder="status" onChange={(e)=>setStatus(e.target.value)}></input><br></br> */}
            {renderStatusDropdown()}
            <br></br>
            <br>
            </br>
          <button type='submit' onClick={Update}>Update Data</button>
        </div>
      )}
       <div>
      <i class="fa fa-envelope" aria-hidden="true" onClick={openForm} style={{fontSize:"30px",margin:"10px",color:"red",top:"7vh",position:"absolute",left:"95vw"}}></i>
      
      {isFormOpen ? <i class="fa fa-window-close" aria-hidden="true" onClick={closeForm}style={{fontSize:"20px",marginLeft:"370px",color:"red"}}></i> : ""}
    
      {isFormOpen && <EmailForm/>}

      </div>
    </div>
  )
}




export default NurseDetail;
