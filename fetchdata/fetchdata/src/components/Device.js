import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router';
import _ from "lodash";
import './Update.css'
import { ToastContainer, toast } from 'react-toastify';

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';
var c ="";
var a ="";
const pageSize = 6;


function Device(props) {
  const [device, setDevice] = useState([]);
  const [name, setname] = useState("");
  // const [patientId, setpatientId] = useState("");

  const[patientEmail,setpatientEmail] = useState("");
  const [patientinfo, setpatientinfo] = useState("");
  const[status,setStatus] = useState("");
  const [userId, setuserid] = useState(null);
  const [formOpen, setformopen] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState();
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [patients, setPatients] = useState([]);




 

  
  useEffect(() => {
    getDeviceList();
    fetchPatients();
  }, []);
  const pageCount = device ? Math.ceil(device.length / pageSize) : 0;
  a = currentPage;
  function getDeviceList() {
    try {
      fetch('https://localhost:7275/api/Device/GetDevice')
        .then((response) => response.json())
        .then((data) => {
          setDevice(data);
          c = data;
          setSearchApiData(_(c).slice((a-1)*pageSize).take(pageSize).value());
          setPaginatedPosts(_(data).slice(0).take(pageSize).value());
      })
        .catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  
  }
  function fetchPatients() {
    try {
      fetch('https://localhost:7275/api/Patient/GetPatient')
        .then((response) => response.json())
        .then((data) => {
          setPatients(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    catch (error) {
      console.log(error);
    }
  }
  const handleFilter = (e) => {
    if (e.target.value === '') {
    setSearchApiData(_(c).slice((currentPage-1)*pageSize).take(pageSize).value());
      setPaginatedPosts(searchApiData);
    }
    else {
      const filterResult = paginatedPosts.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
      // setDevice(filterResult);
      setPaginatedPosts(filterResult);
    }
    setFilterVal(e.target.value);
  }


  function deletePatient(id) {
    try {
      fetch(`https://localhost:7275/api/Device/Delete/${id}`, {
        method: 'DELETE'
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
        })
        getDeviceList()
      })
      Notify();
    }
    catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();
  const addDevice = () => {
    navigate('/adddevice');
  };
 
  function Update() {
    try {
      console.warn(name,patientEmail,  patientinfo, userId,status);
      let item = { name, patientEmail, patientinfo, userId ,status}
      fetch(`https://localhost:7275/api/Device/UpdateDevice/${userId}?name=${name}&patientEmail=${patientEmail}&result=${patientinfo}&status=${status}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then((result) => {
       getDeviceList()
       console.log(result);
        })
        Notify1();
    }
    catch (error) {
      console.log(error);

    }
    setformopen(false);
  }


  function Updateuser(id) {
    try {
      console.log(id);
      console.warn(device.find(t => t.id === id));
      setname((device.find(t => t.id === id)).name)
      setpatientEmail((device.find(t => t.id === id)).patientEmail)
      setpatientinfo((device.find(t => t.id === id)).patientinfo)
      setStatus((device.find(t=>t.id===id)).status)
      setuserid((device.find(t => t.id === id)).id)
      setformopen(true);
    }
    catch (error) {
      console.log(error);
    }
  }
  const pages = _.range(1, pageCount + 1);
  
  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    a = pageNo;
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(device).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  }

  const Notify1 = () => {
    toast.success('Update Successful');
  };

  const Notify = () => {
    toast.success('Delete Successful');
  };

  const closeForm =()=>{
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

  const renderPatientDropdown = () => {
    return (
      <select value={patientEmail} onChange={(e) => setpatientEmail(e.target.value)} style={{width:"97vw",height:"5vh"}}>
        <option value="">Select Patient</option>
        {patients.map((patient) => (
          <option key={patient.email} value={patient.email}>{patient.email}</option>
        ))}
      </select>
    );
  }
  return (
    <div>
      
      <h3 className="m-3 d-flex justify-content-center">Device Table</h3>
      <div>
        <input className='form-control me-2' type="search" placeholder='Search' value={filterVal} onInput={(e) => handleFilter(e)} />
      </div>
      {/* <Table striped bordered>
        <thead>
          <tr> 
            <td>Sr No</td>
            
            <td>Name</td>
           
           <td>Patient Email</td>
           <td>status</td>
            <td>Action</td>

          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((pat) => (
            <tr key={pat.id}>
              <td>{pat.id}</td>
             
              <td>{pat.name}</td>
             
              <td>{pat.patientEmail}</td>
              <td>{pat.status}</td>
              <td><button style={{ marginRight: "20px" }} className='btn btn-warning' onClick={() => deletePatient(pat.id)}>Delete</button>
              <button className='btn btn-warning' onClick={() => Updateuser(pat.id)}>Update</button>
                
              </td>

            </tr>
          ))}
        </tbody>
      </Table> */}
       <div className="row row-cols-1 row-cols-md-3 g-4" style={{padding:"10px"}}>
        {paginatedPosts.map((pat) => (
           <div className="col" key={pat.id}>
          <MDBCard key={pat.id} className="device-card" style={{border: "1px solid #ccc",boxShadow :"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}>
              <MDBCardHeader>

              <h5 className="my-0 font-weight-normal">Device NO: {pat.id}</h5>
              </MDBCardHeader>
         <button className='btn btn-secondary' onClick={()=>navigate(`/updateDevice?data=${JSON.stringify(pat)}`)} >
       
            <MDBCardBody style={{padding: "1rem"}}>
            <MDBCardTitle style={{fontWeight:"bold" ,fontSize: "1.2rem"}}>{pat.name}</MDBCardTitle>
              <MDBCardText>
                <strong>Patient Email:</strong> {pat.patientEmail}<br />
                <strong>Status:</strong> {pat.status}
              </MDBCardText>
              <MDBCardFooter>

              <button className='btn btn-warning'  style={{ backgroundColor: "#f44336", color: "white"}} onClick={() => deletePatient(pat.id)}>Delete</button> &nbsp; &nbsp; &nbsp;
                <button className='btn btn-warning' onClick={() => Updateuser(pat.id)}>Update</button>
              </MDBCardFooter>
              
             
              </MDBCardBody>
              </button>
          </MDBCard>
          </div>
        ))}
       
      </div>
      <br></br>

  
      <br></br>
      {formOpen && (
        <div className='formContainer'>
           {formOpen ? <i class="fa fa-window-close" aria-hidden="true" onClick={closeForm}style={{fontSize:"20px",marginLeft:"95vw",color:"red",position:"absolute",top:"72vh"}}></i> : ""}
          <input type="text" value={name} placeholder="name" onChange={(e) => setname(e.target.value)} /> <br /><br />
          {renderPatientDropdown()}
          <br></br><br></br>
          {/* <input type="text" value={patientEmail} placeholder="patientEmail" onChange={(e) => setpatientEmail(e.target.value)}></input><br /><br /> */}
          <input type="text" value={patientinfo} placeholder="patientInfo" onChange={(e) => setpatientinfo(e.target.value)}></input><br></br><br></br>
          {/* <input type="text" value={status} placeholder="Status" onChange={(e) => setStatus(e.target.value)}></input><br></br><br></br> */}
          {renderStatusDropdown()}
          <br></br><br></br>
    

          <button type="button" onClick={Update}>Update</button>
        </div>
      )}
   <nav className='d-flex justify-content-center'>
        <ul className='pagination'>
          {
            pages.map((page) =>
            (

              <li
                className=
                {
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <p className='page-link' onClick={() => pagination(page)}>{page}</p></li>

            ))
          }
        </ul>
      </nav>
      <button className="btn btn-info" onClick={() => addDevice()}>
        Add Device
      </button>
 <ToastContainer/>

    </div>
  );
}

export default Device;