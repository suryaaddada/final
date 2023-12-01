import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import { FaEye, FaEyeSlash, FaSketch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import './Logincss.css';

function Login(props) {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setisLoggedIn] = useState(true);
  const [errorMsg, seterrorMsg] = useState('');
  const [errorMsg1, seterrorMsg1] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const encodedpassword = encodeURIComponent(password);

  async function login() {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    console.warn({ email, password });

    try {
      let item = { email, password };
      let result = await fetch(`https://localhost:7275/api/Login?email=${email}&password=${encodedpassword}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      result = await result.json();
      localStorage.setItem('result',result);
      console.log(result);
      localStorage.setItem('par', result);
      let item2 = { email, password };
      let result1 = await fetch(`https://localhost:7275/api/Login/GetName?email=${email}&password=${encodedpassword}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item2),
      });
      result1 = await result1.json();
      console.log(result1);
      localStorage.setItem('name', result1);
      console.log(`Global name is ${result1}`);
      console.log(localStorage.getItem('name').length);

      if (result === 'Authorized') {
        setisLoggedIn(true);
        navigate('/home');
        Notify1();
      } else {
        console.log('User not found');
        setisLoggedIn(false);
        Notify();
      }
    } catch (error) {
      console.log(error);
    }

    try {
      var pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === '') {
        setisLoggedIn(true);
        seterrorMsg('Please Enter An Email');
        
        return false;
      }
      if (!pattern.test(email))
        {
        setisLoggedIn(true);
        seterrorMsg('Email should be in correct format');
        return false;
        }
     
      seterrorMsg('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  function validate() {
    try {
      if (password === '') {
        setisLoggedIn(true);
        seterrorMsg1('Please Enter A Password');
        return false;
      }
     
      seterrorMsg1('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  const Notify = () => {
    toast.error('Login Unsuccessful');
  };
  const Notify1 = () => {
    toast.success('Login Successful');
  };

  const handleBoth = () => {
    login();
    validate();
  };

  return (
    <MDBContainer fluid style={{ backgroundColor: '#508bfc', minHeight: '100vh' }}>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol sm='12' md='6' lg='4'>
          <MDBCard className='bg-white my-5' style={{ borderRadius: '1rem', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <MDBCardBody className='p-5'>
              <h2 className='fw-bold mb-4 text-center'>Login</h2>
              <p className='text-white-50 mb-4 text-center'>Please enter your login and password!</p>
              <h5>Email Address</h5>
              <MDBInput wrapperClass='mb-4' value={email} onChange={(e) => setemail(e.target.value)} type='email' size='lg' />
              {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : ''}
              <h5>Password</h5>
              <div style={{ position: 'relative' }}>
                <MDBInput
                  wrapperClass='mb-4'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  size='lg'
                />
                <Button
                  type='Button'
                  onClick={toggleShowPassword}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </div>
              {errorMsg1 ? <p style={{ color: 'red' }}>{errorMsg1}</p> : ''}
              <Button
                startIcon={<LoginIcon />}
                onClick={handleBoth}
                color='primary'
                variant='contained'
                fullWidth
                style={{ marginTop: '1rem' }}
              >
                Login
              </Button>
              {isLoggedIn ? null : (
                <p style={{ fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                  Email or Password is Incorrect
                </p>
              )}
              <p className='text-center mt-4'>
                New User? <a href='/'>Create Account</a>
              </p>
              <ToastContainer />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
