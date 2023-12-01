import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';
import './AddDevice.css';

function AddDeviceDetails() {
  const [name, setname] = useState();
  const [patientId, setpatientId] = useState('');
  const [patientinfo, setpatientinfo] = useState();
  const[status,setStatus] = useState();
  const navigate = useNavigate();
  const[patientEmail,setPatientEmail ]=useState('surya@example.com');
  
  async function onSubmit() {
    try {
      console.log({ name, patientId, patientinfo,status });
      let item = { name, patientId, patientinfo,status,patientEmail }
      let result = await fetch("https://localhost:7275/api/Device", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
      result = await result.json()
      console.warn("result", result);
      navigate('/device')
      notify();
    }
    catch (error) {
      console.log(error);
    }

  }

  function handleBackClick() {
      navigate('/device');
    }

    const notify = () =>{
      toast.success("Device Added Successfully");
    }
  return (
    <div className="formContainer table">
      <ToastContainer/>
      <br></br>
      <i class="fa fa-chevron-circle-left" aria-hidden="true" onClick={handleBackClick} style ={{top:"5.7vw", position:"absolute",left:"0.5vw", fontSize:"20px",color:"grey"}}></i>
      <h2 style={{left:"2vw" , position:"absolute"}}>Device Details</h2>
      <br></br>
      <br></br>
      <br></br>
      <div className='row'>
        <div className='col md-3'>
          <label>Enter the device name: </label>
          <input type="text" name='name' value={name} onChange={(e) => setname(e.target.value)} />
        </div>
        <br></br>
        {/* <div className='col md-3'>
          <label>Enter the patient id: </label>
          <input type="number" name='patientId' value={patientId} onChange={(e) => setpatientId(e.target.value)} />
        </div> */}
        <br></br>
        <div className='col md-3'>
          <label>Enter the PatientInfo: </label>
          <input type="text" name='patientInfo' value={patientinfo} onChange={(e) => setpatientinfo(e.target.value)} />
        </div>
        <br></br>
        <div className='col md-3'>
          <label>Enter the Status: </label>
          {/* <input type="text" name='status' value={status} onChange={(e) => setStatus(e.target.value)} />  */}
          <select value={status} name={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="Select">Select the Status</option>
            <option value="Assigned">Assigned</option>
            <option value="Free">Free</option>

          </select>
        </div>
        <br></br>
        <br />
      </div>
      <br></br>
      <button onClick={onSubmit} className='btn btn-info' type='submit'>Add New Device</button>
    </div>
  )
}

export default AddDeviceDetails
