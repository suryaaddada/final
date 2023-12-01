import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const GoogleOauthTest = () => {
    const navigate = useNavigate();

    // Separate function for registering the user
    const registerUser = async (user) => {
  const password = "pass#123";
      try {
        const response = await axios.post('https://localhost:7275/api/Signup', {
          name: user.name,
          email: user.email,
          password: password,
          mobile: 9090909090,
          confirmPassword: password
        });
     console.log(response.status);
        if (response.status === 201) {
          const Googlesignup = "Authorized";
          localStorage.setItem("GoogleSignup",Googlesignup);
          console.log('User registered successfully!');
          const notification = "New Signup Detected";
          localStorage.setItem("notification",notification);
          navigate('/home');
        } 
        else {
          console.error('Failed to register user.');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }

    // Separate function for handling successful authentication
    const handleSuccess = async (ResponseCredential) => {
       
            const user = jwt_decode(ResponseCredential.credential);
            console.log('Authenticated!', user);

            const email = user.email;
            localStorage.setItem("email", email);
            const GoogleName = user.name;
            localStorage.setItem("name", GoogleName);

            // Check if user details are in user table
            const response = await axios.post(`https://localhost:7275/api/Login/GetDetails?email=${email}`);
            if (response.data === "Authorized") {
              console.log(response.data);
                localStorage.setItem('resultGoogle', response.data);
                navigate('/home');
            }  if (response.data === "Not Authorized") {
                await registerUser(user);
            }
    };

    const handleFailure = (error) => {
        console.error('Authentication failed:', error);
    };

    return (
        <div>
            <GoogleOAuthProvider clientId="1010862499789-9v2al6mbhmvj158idvquochmj3s00hle.apps.googleusercontent.com">
                <GoogleLogin
                 text="continue_with"
                    onSuccess={credentialResponse => {
                        handleSuccess(credentialResponse);
                    }}
                    onError={() => {
                        handleFailure();
                    }}
                   
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default GoogleOauthTest;
