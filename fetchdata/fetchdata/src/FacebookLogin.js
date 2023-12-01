// FacebookLogin.js
import React from 'react';
import FacebookLogin from 'react-facebook-login';
 

function FacebookLogin1() {
  return (
    <div>
      <FacebookLogin
        appId="966858274403844"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook =>{
            console.log(responseFacebook)
        }}
      />
    </div>
  );
}

export default FacebookLogin1;
