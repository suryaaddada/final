import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';
import './AddNurse.css'

function AddNurseDetail() {
    const [name, setname] = useState();
    const [gender, setgender] = useState('');
    const [mobile, setmobile] = useState();
    const [email, setemail] = useState();
    const [patientId, setpatientId] = useState();
    const [deviceId, setdeviceId] = useState();
    const [patientName,setPatientName]=useState("");
    const[deviceName,setDeviceName]=useState("");
    const [result, setresult] = useState();
    const[status,setStatus] = useState();
    const navigate = useNavigate();

    async function onSubmit() {
        try {
            console.log({ name, gender, mobile, email, patientId, deviceId, result });
            let item = { name, gender, mobile, email, patientId, deviceId, result,status,deviceName,patientName }
            let res = await fetch("https://localhost:7275/api/Nurse", {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }

            })
            res = await res.json()
            console.warn("result", res);
            navigate('/nurse')
            notify();
        }
        catch (error) {
            console.log(error);
        }

      
    }
    function handleBackClick() {
        navigate('/nurse');
      }

      const notify = () =>{
        toast.success("Nurse Added Successfull");
      }
    return (
        <div className='formContainer table'>
            <ToastContainer/>
            <br></br>

            <i class="fa fa-chevron-circle-left" aria-hidden="true" onClick={handleBackClick} style ={{top:"5.4vw", position:"absolute",left:"0.5vw", fontSize:"20px",color:"grey"}}></i>
      <h2 style={{left:"2vw" , position:"absolute"}}>Nurse Details</h2>
            <br></br>
            <br></br>
            <br></br>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the Nurse name: </label>
                        <input type="text" name="nname" value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                </div>
                <div className='col md-3'>
                    <div className='form-group'>
                        <label>Enter the gender: </label> 
                        <br></br>
                        {/*<input type="text" name="ngender" value={gender} onChange={(e) => setgender(e.target.value)} />  */}
                        <select  name='ngender' value={gender} onChange={(e) => setgender(e.target.value)} >  
                            <option value="Select Gender">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                         </select>
                         <div>{gender}</div>
                    </div>
                </div>

                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the mobile: </label>
                        <input type="number" name="nmobile" value={mobile} onChange={(e) => setmobile(e.target.value)} />
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the Email: </label>
                        <input type="email" name="nemail" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                </div>
                <br></br><br></br><br></br>
                {/* <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the PatientId: </label>
                        <input type="number" name="npId" value={patientId} onChange={(e) => setpatientId(e.target.value)} />
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the deviceId: </label>
                        <input type="number" name="ndId" value={deviceId} onChange={(e) => setdeviceId(e.target.value)} />
                    </div>
                </div> */}
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the result: </label>
                        <br/>
                        {/*<input type="text" name="nresult" value={result} onChange={(e) => setresult(e.target.value)} />*/}
                        <select name="nresult" value={result} onChange={(e) => setresult(e.target.value)} >
                                <option value="Select Result">Select Result</option> 
                                <option value="Not Yet Assigned">Not Yet Assigned</option>
                                <option value="Positive">Positive</option>
                                <option value="Negative">Negative</option>
                         </select>
                    </div>
                </div>
                <div className='col-md-3'>
                    <div className='form-group'>
                        <label>Enter the  status: </label> 
                        <br/>
                       {/*} <input type="text" name="status" value={status} onChange={(e) => setStatus(e.target.value)} /> */}
                       <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} > 
                                <option value="Select Status">Select Status</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Free">Free</option>
                         </select>
                    </div>
                </div>
            </div>
            <br></br><br></br>
            <button type='submit' onClick={onSubmit} className='btn btn-info'>Add Nurse Details</button>


        </div>
    )
}

export default AddNurseDetail
