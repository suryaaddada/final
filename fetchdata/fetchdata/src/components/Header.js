import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import Tour from './Tour';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YourComponent from '../NotifyAdmin';
import { useState,useEffect } from 'react';





function Header(props) {
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password');
  const email1 = email;
  const password1 = password;
  var isAuthenticated = (email1 === "surya@gmail.com" && password1 === "surya@2023") || (email1 === "addadasurya@gmail.com");


  const[user,setUser] = useState(false)
  useEffect(() => {
    getUserNurse();
  });

  const getUserNurse = async () => {
    try {
      const email10 =email;
      const response = await fetch(`https://localhost:7275/api/Nurse/NurseOrNot?email=${email10}`);
      const data = await response.json();
      console.log(data);
      setUser(data);



    } catch (error) {
      console.log(error);
    }
  };

  

  const Notify = () => { 
    toast.success("Logout Successfull");
    localStorage.clear();
  }

  const location = useLocation();

  if (isAuthenticated) {
    return (
      <div>
        <ToastContainer />
               <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li className="nav-item" style={{ marginLeft: "30px" }}>
                  <NavLink to="/home" className="home" style={{ textDecoration: "none",fontWeight: location.pathname === '/home' ? 'bold' : 'normal', color:"black"}}  >Home</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/patient" className="patient" style={{textDecoration: "none",fontWeight: location.pathname === '/patient' ? 'bold' : 'normal',color:"black"}}>Patient List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/nurse" className="nurse" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/nurse' ? 'bold' : 'normal' }}>Nurse List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/device" className="device" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/device' ? 'bold' : 'normal' }}>Device List</NavLink>
                </li>


          <div style={{marginLeft:"30px"}}>

              <Tour/>
             
          </div>
       <YourComponent/>

              </ul>
              <ul className='navbar-nav'>
                <li className='nav-item' style={{ marginLeft: "800px" }}>
                  <h5> (Admin) Welcome {localStorage.getItem('name')}</h5>
                </li>

                <li className='nav-item' style={{ marginLeft: "50px" }}>
                  <NavLink to="/login" style={{ textDecoration: "none", color: "black" }}>
                    <Button startIcon={<LogoutIcon />} color="secondary" variant="contained" onClick={Notify}>
                      Logout
                    </Button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  } 
  else if(user)
  {
    return (
      <div>
        <ToastContainer />
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li className="nav-item" style={{ marginLeft: "50px" }}>
                  <NavLink to="/home" className="home" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/home' ? 'bold' : 'normal' }}>Home</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/nurseAssignedPatientDetail" className="patient" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/nurseAssignedPatientDetail' ? 'bold' : 'normal' }}>Patient List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/nurseDetail" className="nurse" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/nurseDetail' ? 'bold' : 'normal' }}>Nurse List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/nurseAssignedDevice" className="device" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/nurseAssignedDevice' ? 'bold' : 'normal' }}>Device List</NavLink>
                </li>
              </ul>
             <div style={{marginLeft:"30px"}}>
              <Tour/>
             </div>
              <ul className='navbar-nav'>
                <li className='nav-item' style={{ marginLeft: "730px" }}>
                  <h4> (Nurse) Welcome {localStorage.getItem('name')}</h4>
                </li>

                <li className='nav-item' style={{ marginLeft: "50px" }}>
                  <NavLink to="/login" style={{ textDecoration: "none", color: "black" }}>
                    <Button startIcon={<LogoutIcon />} color="secondary" variant="contained" onClick={Notify}>
                      Logout
                    </Button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  
  else {
    return (
      <div>
        <ToastContainer />
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li className="nav-item" style={{ marginLeft: "50px" }}>
                  <NavLink to="/home" className="home" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/home' ? 'bold' : 'normal' }}>Home</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/UserPatient" className="patient" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/UserPatient' ? 'bold' : 'normal' }}>Patient List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/UserNurse" className="nurse" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/UserNurse' ? 'bold' : 'normal' }}>Nurse List</NavLink>
                </li>
                <li className='nav-item' style={{ marginLeft: "60px" }}>
                  <NavLink to="/UserDevice" className="device" style={{ textDecoration: "none", color: "black",fontWeight: location.pathname === '/UserDevice' ? 'bold' : 'normal' }}>Device List</NavLink>
                </li>
              </ul>
             <div style={{marginLeft:"30px"}}>
              <Tour/>
             </div>
              <ul className='navbar-nav'>
                <li className='nav-item' style={{ marginLeft: "760px" }}>
                  <h4>Welcome {localStorage.getItem('name')}</h4>
                </li>

                <li className='nav-item' style={{ marginLeft: "50px" }}>
                  <NavLink to="/login" style={{ textDecoration: "none", color: "black" }}>
                    <Button startIcon={<LogoutIcon />} color="secondary" variant="contained" onClick={Notify}>
                      Logout
                    </Button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
