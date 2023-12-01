import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import { globalName } from './Login';

function userHeader() {
  return (
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
      
       <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
   
    <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
          <li className="nav-item" style={{marginLeft:"100px"}}>
            <NavLink to="/home" style={{textDecoration:"none",color:"black"}}>Home</NavLink>
          </li>
          <li className='nav-item' style={{marginLeft:"60px"}}>
            <NavLink to="/UserPatient"style={{textDecoration:"none",color:"black"}}>Patient List</NavLink>
          </li>
          <li className='nav-item' style={{marginLeft:"60px"}}>
            <NavLink to="/UserNurse" style={{textDecoration:"none",color:"black"}}>Nurse List</NavLink>
          </li>
          <li className='nav-item' style={{marginLeft:"60px"}}>
            <NavLink to="/UserDevice" style={{textDecoration:"none",color:"black"}}>Device List</NavLink>
          </li>
         </ul>
         <ul className='navbar-nav'>
         <li className='nav-item' style={{marginLeft:"900px"}}>
          <h4>Welcome {globalName}</h4>
          </li>

          <li className='nav-item' style={{marginLeft:"50px"}}>
            <NavLink to="/login" style={{textDecoration:"none",color:"black"}}>
            <Button startIcon={<LogoutIcon />} color="secondary" variant="contained">
            Logout
           </Button>
            </NavLink>
          </li>
         </ul>
        </div>
        </div>
      </nav>
    </div>
  )
}

export default userHeader
