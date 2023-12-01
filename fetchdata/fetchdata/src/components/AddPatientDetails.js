import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import './AddPatientDetails.css';



function AddPatientDetails() {
  const [password, setpassword] = useState();
  const [firstname, setfirstname] = useState();
  const [lastname, setlastname] = useState();
  const [gender, setgender] = useState();
  const [dob, setdob] = useState();
  const [address, setaddress] = useState();
  const [mobile, setmobile] = useState();
  const [date, setdate] = useState();
  const [email, setemail] = useState();
  const navigate = useNavigate();
  


  async function onSubmitClick() {
    try {
      console.log({ password, firstname, lastname, gender, dob, address, mobile, date, email });
      let item = { password, firstname, lastname, gender, dob, address, mobile, date, email }
      let result = await fetch("https://localhost:44392/api/Patient", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }

      })
      result = await result.json()
      console.warn("result", result);
      navigate('/patient');
    }
    catch (error) {
      console.log(error);
    }
  }

  function handleBackClick() {
    navigate('/patient');
  }

  return (
    <div>
       <br></br>
       <i class="fa fa-chevron-circle-left" aria-hidden="true" onClick={handleBackClick} style ={{top:"4.7vw", position:"absolute",left:"0.5vw", fontSize:"20px",color:"grey"}}></i>
      <h2 style={{left:"2vw" , position:"absolute"}}>patient Details</h2>
      <br /><br />

      <div className='row'>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="password">Enter the password: </label>
            <input type="text" value={password} onChange={(e) => setpassword(e.target.value)} name="password" />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="firstname">Enter the Firstname: </label>
            <input type="text" value={firstname} onChange={(e) => setfirstname(e.target.value)} name="firstname" />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="lastname">Enter the lastname: </label>
            <input type="text" name="lastname" value={lastname} onChange={(e) => setlastname(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="gender">Enter the Gender: </label>
            <input type="text" name="gender" value={gender} onChange={(e) => setgender(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="dob">Enter the Date of birth: </label>
            <input type="date" name="dob" value={dob} onChange={(e) => setdob(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="address">Enter the Address: </label>
            <input type="text" name="address" value={address} onChange={(e) => setaddress(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="mobile">Enter the Mobile Number: </label>
            <input type="number" name="mobile" value={mobile} onChange={(e) => setmobile(e.target.value)} />
            <br />
            <br />
          </div></div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label name="date">Enter the date: </label>
            <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} />
            <br />
            <br />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <label name="email">Enter the Email: </label>
            <input type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
            <br />
            <br />
          </div>
        </div>

      </div>
      <button type='submit' className='btn btn-info' onClick={onSubmitClick} >Add New Patient</button>
     
     
    

    </div>
  )
}

export default AddPatientDetails
