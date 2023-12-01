import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './components/Login';


const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    
    const userIsAuthorized = localStorage.getItem('result') === 'Authorized';
    const googleIsAuthorized = localStorage.getItem('resultGoogle') === 'Authorized';
    const googleSignup = localStorage.getItem('GoogleSignup') ==='Authorized'

    if (userIsAuthorized || googleIsAuthorized || googleSignup) {
      setIsAuthorized(true);
    } else {
   
      navigate('/login');
    }
  }, [navigate]);

  return isAuthorized ? children: <Login/>;
};

export default AuthWrapper;

