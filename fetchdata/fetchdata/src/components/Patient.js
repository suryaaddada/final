import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';
import _ from "lodash";
import './Update.css';
import EmailForm from './EmailForm';
import PatientCard from './PatientCard';

const pageSize = 6;
var c ="";

function Patient(props) {
  const [patient, setPatient] = useState([]);
  const [firstname, setfirstname] = useState("");
 
  const [mobile, setmobile] = useState("");
 
  const [email, setemail] = useState("");
  const [userId, setuserid] = useState(null);
  const [formOpen, setformopen] = useState(false);
  const[dob,setdob] = useState("");
  const[date,setdate] = useState("");
  const[filterVal,setFilterVal] = useState("");
  const[searchApiData,setSearchApiData] = useState('');  
  const [paginatedPosts, setPaginatedPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const[isFormOpen,setIsFormOpen] = useState(false);  







 

  const pageCount = patient? Math.ceil(patient.length /pageSize):0;
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  useEffect(() => {
    getPatientList();
  }, []);

  function getPatientList() {
    try {
      fetch('https://localhost:7275/api/Patient/GetPatient')
        .then((response) => response.json())
        .then((data) => {
          setPatient(data);
          c = data;
          setSearchApiData(_(data).slice(0).take(pageSize).value());
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

  const handleFilter=(e)=>
  {
    if(e.target.value === '')
    {
      setSearchApiData(_(c).slice((currentPage-1)*pageSize).take(pageSize).value());
      setPaginatedPosts(searchApiData);
    }
    else
    {
     const filterResult =  searchApiData.filter(item => item.firstname.toLowerCase().includes(e.target.value.toLowerCase()));
    setPaginatedPosts(filterResult)
    }
    setFilterVal(e.target.value);
  }


  


  function deletePatient(id) {
    try {
      fetch(`https://localhost:7275/api/Patient/Delete/${id}`, {
        method: 'DELETE'
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp);
        })
        getPatientList()
      })
      Notify();
    }
    catch (error) {
      console.log(error);
    }

  }


  function UpdatePatient(id) {
    try {
      let item = patient.find(t => t.id === id)
      console.log(id);
      console.warn(patient.find(t => t.id === id));
   
      setfirstname(item.firstname)
      setmobile(item.mobile)
      setemail(item.email)
      setdob(item.dob)
      setdate(item.date)
      setuserid(item.id)
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

          getPatientList()
        })
        Notify1();
    }
    catch (error) {
      console.log(error);
    }
    setformopen(false);
  
  }
  // if (pageCount === 1)
  // return null;

  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(patient).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
    
  }

  const Notify1 = () => {
    toast.success('Update Successful');
  };

  const Notify = () => {
    toast.success('Delete Successful');
  };

  const openForm = () =>{
    setIsFormOpen(true);
  }
  
  const closeForm = () =>{
    setIsFormOpen(false);
    setformopen(false);
  }


  return (
    <div>
      <h3 className="m-3 d-flex justify-content-center">Patient Table</h3>
     <div>
     <input className='form-control me-2' type="search"  placeholder='Search' value={filterVal} onInput={(e)=>handleFilter(e)}/>
     </div>
      {/* <Table striped bordered className='table'>
        <thead>
          <tr> 
            <td>Sr No</td>
           
            <td>Name</td>
           
           
           
            <td>Mobile</td>
            <td>Date</td>
            <td>Email</td>
            <td>Action</td>

          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((pat) => (
            <tr key={pat.id}>
              <td>{pat.id}</td>
              
              <td>{pat.firstname}</td>
             
             
              
            
              <td>{pat.mobile}</td>
              <td>{formatDate(pat.date)}</td>
            
              <td>{pat.email}</td>
              <td><button style={{ marginRight: "20px" }} className='btn btn-warning' onClick={() => deletePatient(pat.id)}>Delete</button>
              <button className='btn btn-warning' onClick={() => UpdatePatient(pat.id)}>Update</button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table> */}
       <div className="card-container">
        {paginatedPosts.map((pat) => (
          <PatientCard
            key={pat.id}
            id={pat.id}
            firstname={pat.firstname}
            mobile={pat.mobile}
            date={pat.date}
            email={pat.email}
            deletePatient={deletePatient}
            updatePatient={UpdatePatient}
          />
        ))}
      </div>
    
      <br /><br />
      <br /><br />

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
      {formOpen && (
        <div className='formContainer'>
           {formOpen ? <i class="fa fa-window-close" aria-hidden="true" onClick={closeForm}style={{fontSize:"20px",marginLeft:"96vw",color:"red",position:"absolute",top:"89vh"}}></i> : ""}
          <input type="text" value={firstname} placeholder="firstname" onChange={(e) => setfirstname(e.target.value)}></input><br /><br />
         
          <input type="text" value={dob} placeholder="dob" onChange={(e) => setdob(e.target.value)}></input><br /><br />
          
          <input type="number" value={mobile} placeholder="mobile" onChange={(e) => setmobile(e.target.value)}></input><br /><br />
          <input type="text" value={date} placeholder="date" onChange={(e) => setdate(e.target.value)}></input><br /><br />
         
          <input type="text" value={email} placeholder="email" onChange={(e) => setemail(e.target.value)}></input><br /><br />
          <button type="submit" onClick={Update} >Update Data</button>

        </div>
      )}
   <div>
      <i class="fa fa-envelope" aria-hidden="true" onClick={openForm} style={{fontSize:"30px",margin:"10px",color:"red",top:"7vh",position:"absolute",left:"95vw"}}></i>
      
      {isFormOpen ? <i class="fa fa-window-close" aria-hidden="true" onClick={closeForm}style={{fontSize:"20px",marginLeft:"370px",color:"red"}}></i> : ""}
    
      {isFormOpen && <EmailForm/>}

      </div>
 
      <ToastContainer />
    </div>
  );
}

export default Patient;