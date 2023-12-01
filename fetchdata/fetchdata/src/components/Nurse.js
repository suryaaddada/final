import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import _ from "lodash";
import EmailForm from './EmailForm';
import { ToastContainer, toast } from 'react-toastify';
import './Update.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
} from 'mdb-react-ui-kit';

const pageSize = 6;
var c =""; 



function Nurse(props) {
  const [Nurse, setNurse] = useState([]);
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [email, setemail] = useState("");
  const [patientId, setpatientId] = useState("");
  const [deviceId, setdeviceId] = useState("");
  const [result, setresult] = useState("");
  const[status,setStatus] = useState("");
  const [userId, setuserid] = useState(null);
  const [formOpen, setformopen] = useState(false);
  const[filterVal,setFilterVal] = useState("");
  const[searchApiData,setSearchApiData] = useState(''); 
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const[isFormOpen,setIsFormOpen] = useState(false);  

  const pageCount = Nurse ? Math.ceil(Nurse.length / pageSize) : 0; 

  const nav=useNavigate();

 useEffect(() => {
    getNurseList();
  }, []);


  const navigate = useNavigate();

  const Add = () => {
    navigate('/addnurse');
  }

  function getNurseList() {
    try {
      fetch('https://localhost:7275/api/Nurse/GetNurse')
        .then((response) => response.json())
        .then((data) => {
          setNurse(data);
          c = data;
          setSearchApiData(_(data).slice(0).value());
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
  const handleFilter = (e)=>
  {
     if(e.target.value==='')
     {
      setSearchApiData(_(c).slice((currentPage-1)*pageSize).take(pageSize).value());
      setPaginatedPosts(searchApiData);
     }
     else
     {
      const filterResult = searchApiData.filter(item=>item.name.toLowerCase().includes(e.target.value.toLowerCase()));
      setPaginatedPosts(filterResult);
     }
     setFilterVal(e.target.value);
  }


  function deleteNurse(id) {
    try {
      fetch(`https://localhost:7275/api/Nurse/Delete/${id}`, {
        method: 'DELETE'
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
        })
        getNurseList()
      })
      Notify();
    }
    catch (error) {
      console.log(error);
    }
  }

  function Updatenurse(id) {
    try {
      console.log(id);
      console.warn(Nurse.find(t => t.id === id));
      setname((Nurse.find(t => t.id === id)).name)
      setmobile((Nurse.find(t => t.id === id)).mobile)
      setpatientId((Nurse.find(t => t.id === id)).patientId)
      setdeviceId((Nurse.find(t => t.id === id)).deviceId)
      setemail((Nurse.find(t => t.id === id)).email)
     setresult((Nurse.find(t => t.id === id)).result)
     setStatus((Nurse.find(t=>t.id===id)).status)
      setuserid((Nurse.find(t => t.id === id)).id)
      setformopen(true);
    }
    catch (error) {
      console.log(error);
    }

  }

  function Update() {
    try {
      console.warn(name, mobile, email, patientId, deviceId, userId);
      let item = { name, mobile, patientId, deviceId, email,result}
      fetch(`https://localhost:7275/api/Nurse/UpdateNurse/${userId}?name=${name}&mobile=${mobile}&patientId=${patientId}&deviceId=${deviceId}&email=${email}&result=${result}&status=${status}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then((result) => {

          getNurseList()
        })
        Notify1();
    }
    catch (error) {
      console.log(error);
    }
    setformopen(false);
  }

  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(Nurse).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  }

  const openForm = () =>{
    setIsFormOpen(true);
  }
  
  const closeForm = () =>{
    setIsFormOpen(false);
    setformopen(false);
  }

  const Notify1 = () => {
    toast.success('Update Successful');
  };

  const Notify = () => {
    toast.success('Delete Successful');
  };


  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">NurseList</h3>
      <div>
      <input className='form-control me-2' type="search"  placeholder='Search' value={filterVal} onInput={(e)=>handleFilter(e)}/>
      </div>
     
      {/* <Table striped bordered>
        <thead>
          <tr> 
            <td>Sr No</td>
            <td>Name</td>
            <td>Mobile</td>
            <td>Assigned patient Name</td>
            <td>Assigned Device Name</td>

            <td>Email</td>
            <td>Result</td>
            <td>status</td>
            <td>Action</td>


          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((nur) => ( 
            <tr key={nur.id}>
              <td>{nur.id}</td>
              <td>{nur.name}</td>
              <td>{nur.mobile}</td>
              <td>{nur.patientName}</td>
              <td>{nur.deviceName}</td>
             
              <td>{nur.email}</td>
              <td>{nur.result}</td>
              <td>{nur.status}</td>
              <td><button style={{ marginRight: "20px" }} className='btn btn-warning' onClick={() => deleteNurse(nur.id)}>Delete</button>
              <button className='btn btn-warning' onClick={() => Updatenurse(nur.id)}>Update</button>

              </td>

            </tr>
          ))}
        </tbody>
      </Table>
     */}

<div className="row row-cols-1 row-cols-md-3 g-4" style={{padding:"10px"}}>
        {paginatedPosts.map((nur) => (
          <div className="col" key={nur.id}>
            <MDBCard style={{border: "1px solid #ccc",boxShadow :"0 4px 8px 0 rgba(0, 0, 0, 0.2)"}}> 
           
            <MDBCardHeader>
          <h5 className="my-0 font-weight-normal">Nurse NO: {nur.id}</h5>
        </MDBCardHeader>
        <button className='btn btn-primary' onClick={()=>navigate(`/updateNurse?data=${JSON.stringify(nur)}`)} >
              <MDBCardBody style={{padding: "1rem"}}>
                <MDBCardTitle style={{fontWeight:"bold" ,fontSize: "1.2rem"}}>{nur.name}</MDBCardTitle>
                <MDBCardText> 
                
                  <b>Mobile</b>: {nur.mobile} <br />
                  <b>Assigned Patient</b>: {nur.patientName} <br />
                  <b>Assigned Device</b>: {nur.deviceName} <br />
                  <b>Email</b>: {nur.email} <br />
                  <b>Result</b>: {nur.result} <br />
                  <b>Status</b>: <b>{nur.status}</b> <br />
                </MDBCardText>
              
              </MDBCardBody>
              
              </button>
            </MDBCard>
          </div>
        ))}
      </div>
     
      <br></br>
   
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
      <br></br>
      <button className='btn btn-info' onClick={() => Add()}>Add Nurse Details</button>
     
      {formOpen && (
        <div className='formContainer'>
            {formOpen ? <i class="fa fa-window-close" aria-hidden="true" onClick={closeForm}style={{fontSize:"20px",marginLeft:"95vw",color:"red",position:"absolute",top:"99vh"}}></i> : ""}
          <input type="text" value={name} placeholder="name" onChange={(e) => setname(e.target.value)}></input><br /><br />
          <input type="number" value={mobile} placeholder="mobile" onChange={(e) => setmobile(e.target.value)}></input><br /><br />
          <input type="number" value={patientId} placeholder="patientId" onChange={(e) => setpatientId(e.target.value)}></input><br /><br />
          <input type="number" value={deviceId} placeholder="deviceId" onChange={(e) => setdeviceId(e.target.value)}></input><br /><br />
          <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)}></input><br /><br />
            <input type="text" value={result} placeholder="result" onChange={(e) => setresult(e.target.value)}></input><br /><br />
            <input type="text" value={status} placeholder="status" onChange={(e)=>setStatus(e.target.value)}></input><br></br>
          <button type='submit' onClick={Update}>Update Data</button>
        </div>
      )}
 
      <div>
      <i class="fa fa-envelope" aria-hidden="true" onClick={openForm} style={{fontSize:"30px",margin:"10px",color:"red",top:"7vh",position:"absolute",left:"95vw"}}></i>
      
      {isFormOpen ? <i class="fa fa-window-close" aria-hidden="true" onClick={closeForm}style={{fontSize:"20px",marginLeft:"375px",color:"red"}}></i> : ""}
    
      {isFormOpen && <EmailForm/>}

      </div>
     <ToastContainer/>


    </div>
  );
}

export default Nurse;