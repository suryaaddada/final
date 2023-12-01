import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import './D.css';
import GoogleOauthTest from '../GoogleOAuth';
import { ToastContainer,toast } from 'react-toastify';

// import FacebookLogin1 from '../FacebookLogin';


 





function SignupForm() {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [emailExist, setEmailExist] = useState(false);
  const [check, setcheck] = useState(false);
  const [errorMsg, seterrorMsg] = useState('');
  const [errorMsg1, seterrorMsg1] = useState('');
  const [errorMsg2, seterrorMsg2] = useState('');
  const [errorMsg3, seterrorMsg3] = useState('');
  const [errorMsg4, seterrorMsg4] = useState('');
  const navigate = useNavigate();
  async function Signup() {
    try { 
      console.log({ name, email, password, mobile, confirmpassword });
      if (password === confirmpassword) {
       
        let item = { name, email, password, mobile, confirmpassword };
        let result = await fetch('https://localhost:7275/api/Signup', {
          method: 'POST',
          body: JSON.stringify(item),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        result = await result.json();
          toast.success("Signup Successfull");

        console.warn('result', result);
        
        const notification =  "New Signup Detected";
        localStorage.setItem("notification",notification);
      } else {
        setcheck(true);
      }
      if (name === '' || email === '' || password === '' || confirmpassword === '' || mobile === '') {
        alert('Please Fill all the input fields');
      }
    } catch (error) {
      console.log(error);
    }
  }



  async function Check() {
    try {
      if (password === confirmpassword) {
        let item1 = { email };
        let result1 = await fetch(`https://localhost:7275/api/Signup/CheckEmailExist?email=${email}`, {
          method: 'POST',
          body: JSON.stringify(item1),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        result1 = await result1.json();
        console.warn('result1', result1);
      

        if (result1 !== 1) {
          if (mobile.length === 10 && name.length > 0 && mobile !== '0000000000') {
            navigate('/login');
          }
        } else {
          console.log('User already Exist');
          setEmailExist(true);
        }
      } else {
        setcheck(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function Validate() {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        seterrorMsg('Please enter email in correct format');
        return false;
      }

      seterrorMsg('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  function Validate2() {
    try {
      const mobileregex = /^[0-9]{10}$/;

      if (!mobileregex.test(mobile)) {
        seterrorMsg1('Please enter a valid Mobile Number');
        return false;
      }
      seterrorMsg1('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  function Validate3() {
    try {
      if (name === '') {
        seterrorMsg2('Please Input a Name');
        return false;
      }
      seterrorMsg2('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  function Validate4() {
    try {
      if (password === '') {
        seterrorMsg3('Please Enter Password');
        return false;
      }
      seterrorMsg3('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  function Validate5() {
    try {
      if (mobile === '0000000000') {
        seterrorMsg4('Please Enter a valid Number');
        return false;
      }
      seterrorMsg4('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

 


  const handleBoth = () => {
    Signup();
    Check();
    Validate();
    Validate2();
    Validate3();
    Validate4();
    Validate5();
  }

  return (
    
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ minHeight: '100vh' }}>
      <ToastContainer/>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h3 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Covid 19 Test<br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>Result Management System</span>
          </h3>
          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
            A COVID-19 test result management system is a digital platform that is designed to track, manage, and report COVID-19 test results. The system is designed to help healthcare providers and public health officials track the spread of the virus and provide timely information to those who need it.
            The system typically includes several components, such as a data entry portal for healthcare providers to enter test results, a database to store and manage the test results, and a reporting tool to generate reports on the spread of the virus.
            Overall, a COVID-19 test result management system is a critical tool in the fight against the pandemic, providing healthcare providers and public health officials with the information they need to identify and respond to outbreaks and reduce the spread of the virus.
          </p>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute rounded-circle shadow-5-strong" style={{ marginBottom: '-100px' }}></div>
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label="Name" value={name} onChange={(e) => setname(e.target.value)} required type="text" />
                  {errorMsg2 ? <p style={{ color: 'red' }}>{errorMsg2}</p> : ''}
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Email' value={email} onChange={(e) => setemail(e.target.value)} required type='text' />
                  {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : ''}

                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Password' type='password' value={password} onChange={(e) => setpassword(e.target.value)} required />
                  {errorMsg3 ? <p style={{ color: 'red' }}>{errorMsg3}</p> : ''}
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Confirm Password' type='password' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} required />
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Mobile' type='number' value={mobile} onChange={(e) => setmobile(e.target.value)} required />
              {errorMsg1 ? <p style={{ color: 'red' }}>{errorMsg1}</p> : ''}
              {errorMsg4 ? <p style={{ color: 'red' }}>{errorMsg4}</p> : ''}
              <Button startIcon={<LoginIcon />} onClick={handleBoth} color="primary" variant="contained">
                Signup
              </Button>
              {emailExist ? <p style={{ color: "red" }}> Email Already Exists. Login to Continue.</p> : ''}
              {check ? 'Password Mismatch' : ''}
              <p>Already have an account? <a href="/login"> Login </a></p>

              <GoogleOauthTest/>
              {/* <FacebookLogin1/> */}
              <button onClick={()=>navigate('/google')}>Google</button>
            

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default SignupForm;
