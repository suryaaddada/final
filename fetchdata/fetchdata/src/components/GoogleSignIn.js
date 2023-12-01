// import React, { useEffect } from 'react';

// const GoogleSignIn = () => {
//   useEffect(() => {
//     // Load the Google API client
//     console.log('Loading Google API client...');
//     window.gapi.load('auth2', () => {
//       console.log('Google API client loaded');
//       window.gapi.auth2
//         .init({
//           client_id: "485947985520-2929tagfo657ogj3ghljgq3e51rle2em.apps.googleusercontent.com",
//         })
//         .then(
//           () => {
//             console.log('Google API initialized successfully');
//           })
//         .catch(error => {
//           console.error('Error initializing Google API:', error);
//         });
//     });
//   }, []);

//   const handleSignIn = async () => {
//     try {
//       console.log('Attempting Google Sign-In...');
//       const auth2 = await window.gapi.auth2.getAuthInstance();
//       const googleUser = await auth2.signIn();

//       // Access user details using googleUser.getBasicProfile()
//       console.log('Google user details:', googleUser.getBasicProfile());

//       // Access the Google authentication token
//       const googleToken = googleUser.getAuthResponse().id_token;
//       console.log('Google authentication token:', googleToken);

//       // Now you can send the token to your server for verification
//       // and perform the necessary actions (e.g., log the user in).
//     } catch (error) {
//       console.error('Error signing in with Google:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleSignIn}>Sign in with Google</button>
//     </div>
//   );
// };

// export default GoogleSignIn;






import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";



const GoogleSignIn = () => {
    const navigate = useNavigate();

    
   

    // Separate function for handling successful authentication
    const handleSuccess = async (ResponseCredential) => {
        try {
          const accessToken = ResponseCredential.credential;
          console.log('JWT Token',accessToken);
      
          // Use the access token to fetch the ID token from the Google API
        //  const idTokenResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`); 
          console.log('Access Verified');
         // const idTokenData = await idTokenResponse.json();
          const googleData=await jwt_decode(accessToken);
          console.log(googleData);
          
      
          
      
           const email = googleData.email;
          localStorage.setItem('email', email);
          const GoogleName = googleData.name;
          localStorage.setItem('name', GoogleName);
      
          // Check if user details are in the user table
      
          // Optionally, you can navigate to another page after successful authentication
          
        } catch (error) {
          console.error('Error handling authentication:', error);
        }
      };
      

    const handleFailure = (error) => {
        console.error('Authentication failed:', error);
    };

    return (
        <div>
            <GoogleOAuthProvider clientId="485947985520-2929tagfo657ogj3ghljgq3e51rle2em.apps.googleusercontent.com">
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

export default GoogleSignIn;

