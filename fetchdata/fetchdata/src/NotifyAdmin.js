import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [showMessage, setShowMessage] = useState(true);
  const notify = localStorage.getItem("notification");

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage(prevShowMessage => !prevShowMessage);
    }, 500);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setShowMessage(false);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div style={{ marginLeft: '45vw', position: 'absolute',color:'green' }}>
      {showMessage && <h5>{notify}</h5>}
    </div>
  );
};

export default YourComponent;
